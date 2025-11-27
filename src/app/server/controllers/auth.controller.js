const knex = require("../config/dbConnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
module.exports.signupUser = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword, role } = req.body;
    if (!name || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }
    const existingEmail = await knex('user').where({ u_email: email }).first();
    if (existingEmail) {
      return res.status(409).json({ message: "Email is already registered." });
    }
    const existingPhone = await knex('user').where({ u_phone: phone }).first();
    if (existingPhone) {
      return res.status(409).json({ message: "Phone number is already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] = await knex('user')
      .insert({
        u_name: name,
        u_email: email,
        u_phone: phone,
        u_password: hashedPassword,
        u_role: role
      })
      .returning(['id', 'u_name', 'u_email', 'u_phone', 'u_role']);
    const token = generateToken(newUser.id, newUser.u_role);
    res.status(201).json({
      status: 201,
      message: "User registered successfully.",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error during signup.", errorInfo: error });
  }
};

module.exports.signinUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ message: "Email/Phone and password are required." });
    }
    let user;
    if (identifier.includes("@")) {
      user = await knex('user').where({ u_email: identifier }).first();
    } else {
      user = await knex('user').where({ u_phone: identifier }).first();
    }
    if (!user) {
      return res.status(404).json({ message: "You are not a registered user" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.u_password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = generateToken(user.id, user.u_role);
    res.status(200).json({
      status: 200,
      message: "User signed in successfully.",
      user: {
        id: user.id,
        name: user.u_name,
        email: user.u_email,
        phone: user.u_phone,
        role: user.u_role,
        isVerified: user.u_is_verified,
      },
      token,
    });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ message: "Internal server error during signin.",  errorLog: error });
  }
};
module.exports.signinWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const user = await knex('user').where({ u_email: email }).first();
    if (!user) return res.status(404).json({ message: "User not found." });
    const isPasswordValid = await bcrypt.compare(password, user.u_password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials." });
    const token = generateToken(user.id, user.u_role);
    res.status(200).json({
      status: 200,
      message: "User signed in successfully.",
      user,
      token,
    });
  } catch (error) {
    console.error("SigninWithEmail Error:", error);
    res.status(500).json({ message: "Internal server error during email signin." });
  }
};
module.exports.signinWithPhone = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ message: "Phone number and password are required." });
    }
    const user = await knex('user').where({ u_phone: phone }).first();
    if (!user) return res.status(404).json({ message: "User not found." });
    const isPasswordValid = await bcrypt.compare(password, user.u_password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials." });
    const token = generateToken(user.id, user.u_role);
    res.status(200).json({
      status: 200,
      message: "User signed in successfully.",
      user,
      token,
    });
  } catch (error) {
    console.error("SigninWithPhone Error:", error);
    res.status(500).json({ message: "Internal server error during phone signin." });
  }
};
module.exports.authHandler = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "No token provided" });
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 3600 * 1000,
    sameSite: 'None',
    secure: false
  });
  res.status(200).json({ message: "Token set in cookie" });
};
module.exports.profileHandler = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await knex('user')
      .where({ id: decoded.id })
      .first();
    if (!user) return res.status(404).json({ message: "User not found" });
    const { u_password, ...safeUser } = user;
    res.status(200).json({ user: safeUser });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};