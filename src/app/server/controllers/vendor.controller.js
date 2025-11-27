const knex = require("../config/dbConnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};


exports.createVendor = async (req, res) => {
  const trx = await knex.transaction();

  try {
    const form = req.body;
    const files = req.files || {}; // Handle uploaded files from multer

    // Parse nested fields from flat keys (e.g. 'businessInfo.storeName')
    const parseSection = (sectionName) => {
      const sectionData = {};
      for (const key in form) {
        if (key.startsWith(`${sectionName}.`)) {
          const field = key.replace(`${sectionName}.`, "");
          sectionData[field] = form[key];
        }
      }
      return sectionData;
    };

    const businessInfo = parseSection('businessInfo');
    const contactPerson = parseSection('contactPerson');
    const businessAddress = parseSection('businessAddress');
    const bankDetails = parseSection('bankDetails');

    // Handle category array
    const businessCategory = Object.keys(form)
      .filter(key => key.startsWith('businessInfo.businessCategory['))
      .map(key => form[key]);

    // Handle documents from multer
    const documents = {
  license: files['license']?.[0]?.filename || '',
  taxCertificate: files['taxCertificate']?.[0]?.filename || '',
  idDocument: files['idDocument']?.[0]?.filename || '',
  logo: files['logo']?.[0]?.filename || '',
};

    const u_id = form.u_id || null;

    // 1⃣ Insert into user_vendor
    const [vendorId] = await trx('user_vendor').insert({
      u_id,
      uv_company_name: businessInfo.storeName,
      uv_business_email: businessInfo.companyEmail,
      uv_business_type: businessInfo.businessType,
      uv_business_category: JSON.stringify(businessCategory),
      uv_registration_number: businessInfo.registrationNumber,
      uv_tax_id: businessInfo.taxId,
      uv_year_established: businessInfo.yearEstablished,
      uv_contact_person_name: contactPerson.name,
      uv_contact_email: contactPerson.email,
      uv_phone: contactPerson.phone,
      uv_alternate_phone: contactPerson.alternatePhone,
      uv_position: contactPerson.position,
      uv_nid_number: contactPerson.idNumber,
      uv_address: businessAddress.address,
      uv_city: businessAddress.city,
      uv_postal_code: businessAddress.postalCode,
      uv_district: businessAddress.district,
      uv_country: businessAddress.country,
      uv_logo_url: documents.logo,
      uv_trade_license: documents.license,
      uv_website: businessInfo.website || '',
      uv_type: 1
    });

    // 2⃣ Insert into user_vendor_bank_details
    await trx('user_vendor_bank_details').insert({
      uv_vendor_id: vendorId,
      uv_bank_name: bankDetails.bankName,
      uvbd_account_holder: bankDetails.accountHolder,
      uvbd_account_number: bankDetails.accountNumber,
      uvbd_swift_code: bankDetails.swiftCode,
      uvbd_mobile_wallet: bankDetails.mobileWallet || null
    });

    // 3⃣ Insert into user_vendor_documents
    await trx('user_vendor_documents').insert({
      uv_vendor_id: vendorId,
      uvd_license_path: documents.license,
      uvd_tax_certificate_path: documents.taxCertificate,
      uvd_id_document_path: documents.idDocument,
      uvd_logo_path: documents.logo
    });

    await trx.commit();
    return res.status(201).json({ success: true, message: 'Vendor registered successfully' });

  } catch (err) {
    await trx.rollback();
    console.error('Error inserting vendor:', err);
    return res.status(500).json({ success: false, message: 'Server Error', error: err.message });
  }
};



// controller for admin ussage
module.exports.getAllVendors = async (req, res) => {
  try {
const vendors = await knex("user").where({ u_role: 2 });
    res.status(200).json({
      status: 200,
      message: "All vendors fetched successfully",
      vendors: vendors,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error while all vendors fetching" });
  }
};

module.exports.getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await knex("user").where({ id, u_role: 2 }).first();
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }
    res.status(200).json({
      status: 200,
      message: "Vendor fetched successfully.",
      vendor,
    });
  } catch (error) {
    console.error("Fetch Vendor Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching vendor." });
  }
};
