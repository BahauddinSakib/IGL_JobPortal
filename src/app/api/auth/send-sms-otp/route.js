// app/api/auth/send-sms-otp/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET;

// SMS API Configuration
const SMS_API_KEY = '4451750009611151750009611';
const SMS_SENDER_ID = '01844532630';
const SMS_API_URL = 'http://sms.iglweb.com/api/v1/send';

async function sendSMS(phoneNumber, otp) {
  try {
    console.log('Sending SMS to:', phoneNumber);
    
    // Format phone number to 01 format (11 digits)
    let formattedPhone = phoneNumber;
    if (phoneNumber.startsWith('88') && phoneNumber.length === 13) {
      formattedPhone = '0' + phoneNumber.substring(2);
    } else if (phoneNumber.startsWith('+88')) {
      formattedPhone = '0' + phoneNumber.substring(3);
    }

    const params = new URLSearchParams({
      api_key: SMS_API_KEY,
      contacts: formattedPhone,
      senderid: SMS_SENDER_ID,
      msg: `Your IGL Web Ltd. OTP: ${otp}. Valid for 5 min.Please don't share your OTP.`
    });

    const url = `${SMS_API_URL}?${params}`;
    console.log('SMS API Call:', { contacts: formattedPhone });

    const response = await fetch(url, { method: 'GET' });
    const result = await response.json();
    console.log('SMS API Response:', result);

    if (result.code === '445000' || result.status === 'success') {
      console.log('SMS sent successfully!');
      return true;
    } else {
      console.log('SMS failed:', result);
      return false;
    }
  } catch (error) {
    console.error('SMS error:', error);
    return false;
  }
}

export async function POST(request) {
  let connection;
  try {
    const { phoneNumber, purpose = 'password_reset' } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Clean phone number
    const cleanPhone = phoneNumber.replace(/[\s\-]/g, '');
    
    const phoneRegex = /^(?:\+88|01)?(?:\d{11}|\d{13})$/;
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json({ 
        error: 'Please enter a valid Bangladeshi phone number' 
      }, { status: 400 });
    }

    connection = await pool.getConnection();

    // DIFFERENT LOGIC BASED ON PURPOSE
    if (purpose === 'signup_verification') {
      // For regular user signup: Check if phone number is NOT already registered
      const [existingUsers] = await connection.execute(
        'SELECT au_id FROM admin_user WHERE au_phone = ?',
        [cleanPhone]
      );

      if (existingUsers.length > 0) {
        return NextResponse.json({ 
          success: false,
          error: 'Phone number already registered. Please use a different number or login.' 
        }, { status: 400 });
      }

      // For signup, we don't need an existing user, just generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      const token = jwt.sign({ 
        phoneNumber: cleanPhone, 
        otp: otp,
        purpose: 'signup_verification',
        type: 'sms_otp',
        expires: Date.now() + 5 * 60 * 1000
      }, JWT_SECRET, { expiresIn: '5m' });

      console.log('SMS OTP for USER SIGNUP:');
      console.log('Phone:', cleanPhone);
      console.log('OTP:', otp);

      // Send SMS
      const smsSent = await sendSMS(cleanPhone, otp);

      if (!smsSent) {
        return NextResponse.json({ 
          success: false,
          error: 'Failed to send SMS. Please try again later.' 
        }, { status: 500 });
      }

      console.log('SMS sent successfully for user signup verification');
      return NextResponse.json({ 
        success: true,
        message: `OTP sent successfully to your phone number`,
        token: token
      });

    } else if (purpose === 'admin_signup_verification') {
      // For admin signup: Check if phone number is NOT already registered
      const [existingUsers] = await connection.execute(
        'SELECT au_id FROM admin_user WHERE au_phone = ?',
        [cleanPhone]
      );

      if (existingUsers.length > 0) {
        return NextResponse.json({ 
          success: false,
          error: 'Phone number already registered. Please use a different number.' 
        }, { status: 400 });
      }

      // For admin signup, generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      const token = jwt.sign({ 
        phoneNumber: cleanPhone, 
        otp: otp,
        purpose: 'admin_signup_verification',
        type: 'sms_otp',
        expires: Date.now() + 5 * 60 * 1000
      }, JWT_SECRET, { expiresIn: '5m' });

      console.log('SMS OTP for ADMIN SIGNUP:');
      console.log('Phone:', cleanPhone);
      console.log('OTP:', otp);

      // Send SMS
      const smsSent = await sendSMS(cleanPhone, otp);

      if (!smsSent) {
        return NextResponse.json({ 
          success: false,
          error: 'Failed to send SMS. Please try again later.' 
        }, { status: 500 });
      }

      console.log('SMS sent successfully for admin signup verification');
      return NextResponse.json({ 
        success: true,
        message: `OTP sent successfully to your phone number`,
        token: token
      });

    } else if (purpose === 'recruiter_signup_verification') {
      // For recruiter signup: Check if phone number is NOT already registered
      const [existingUsers] = await connection.execute(
        'SELECT au_id FROM admin_user WHERE au_phone = ?',
        [cleanPhone]
      );

      if (existingUsers.length > 0) {
        return NextResponse.json({ 
          success: false,
          error: 'Phone number already registered. Please use a different number.' 
        }, { status: 400 });
      }

      // Generate OTP for recruiter signup
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      const token = jwt.sign({ 
        phoneNumber: cleanPhone, 
        otp: otp,
        purpose: 'recruiter_signup_verification',
        type: 'sms_otp',
        expires: Date.now() + 5 * 60 * 1000
      }, JWT_SECRET, { expiresIn: '5m' });

      console.log('SMS OTP for RECRUITER SIGNUP:');
      console.log('Phone:', cleanPhone);
      console.log('OTP:', otp);

      // Send SMS
      const smsSent = await sendSMS(cleanPhone, otp);

      if (!smsSent) {
        return NextResponse.json({ 
          success: false,
          error: 'Failed to send SMS. Please try again later.' 
        }, { status: 500 });
      }

      console.log('SMS sent successfully for recruiter signup verification');
      return NextResponse.json({ 
        success: true,
        message: `OTP sent successfully to your phone number`,
        token: token
      });

    } else {
      // For password reset: Check for existing user
      const [users] = await connection.execute(
        'SELECT au_id, au_first_name, au_phone, au_type FROM admin_user WHERE au_phone = ? AND (au_type = "1" OR au_type = "2" OR au_type = "3")',
        [cleanPhone]
      );

      if (users.length === 0) {
        return NextResponse.json({ 
          success: false,
          error: 'No account found with this phone number' 
        }, { status: 404 });
      }

      const user = users[0];
      
      // Set user type name for logging
      let userTypeName = '';
      switch(user.au_type) {
        case '1':
          userTypeName = 'Superadmin';
          break;
        case '2':
          userTypeName = 'Jobseeker';
          break;
        case '3':
          userTypeName = 'Recruiter';
          break;
        default:
          userTypeName = 'User';
      }
      
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      const token = jwt.sign({ 
        phoneNumber: cleanPhone, 
        otp: otp,
        userId: user.au_id,
        userType: user.au_type,
        purpose: 'password_reset',
        type: 'sms_otp',
        expires: Date.now() + 5 * 60 * 1000
      }, JWT_SECRET, { expiresIn: '5m' });

      console.log('SMS OTP for PASSWORD RESET:');
      console.log('User:', user.au_first_name);
      console.log('User Type:', userTypeName);
      console.log('Phone:', cleanPhone);
      console.log('OTP:', otp);

      // Send SMS
      const smsSent = await sendSMS(cleanPhone, otp);

      if (!smsSent) {
        return NextResponse.json({ 
          success: false,
          error: 'Failed to send SMS. Please try again later.' 
        }, { status: 500 });
      }

      console.log('SMS sent successfully to', userTypeName);
      return NextResponse.json({ 
        success: true,
        message: `OTP sent successfully to your phone number`,
        token: token
      });
    }

  } catch (error) {
    console.error('Send SMS OTP error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to process OTP request' 
    }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}