const express = require("express");
const router = express.Router();

const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// Email handling - Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});


// ==========================
// REGISTER
// ==========================

router.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Empty field
    if (!name || !email || !password) {
      return res.json({
        message: "All fields are required"
      });
    }

    // Clean email
    const cleanemail = email.toLowerCase().trim();

    // Check existing user
    const olduser = await User.findOne({
      email: cleanemail
    });

    if (olduser) {
      return res.json({
        message: "Email already registered"
      });
    }

    // Password hash
    const hashedpassword = await bcrypt.hash(password, 10);

    // Create user
    const newuser = await User.create({
      name: name.trim(),
      email: cleanemail,
      password: hashedpassword
    });

    // Verification JWT
    const verification = jwt.sign(
      {
        id: newuser._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    // Verification link
    const verificationLink =
      `http://localhost:5900/api/auth/verify/${verification}`;

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: newuser.email,
      subject: "Verify your FoodNest Email",
      html: `
        <h2>Welcome to FoodNest!</h2>

        <p>Hello ${newuser.name},</p>

        <p>Please click the button below to verify your email:</p>

        <a href="${verificationLink}"
           style="
           display:inline-block;
           padding:12px 20px;
           background:#f97316;
           color:white;
           text-decoration:none;
           border-radius:8px;
           ">
           Verify Email
        </a>

        <p>This verification link will expire in 10 minutes.</p>
      `
    });

    res.json({
      message: "Registration successful. Please verify your email."
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Registration failed"
    });
  }
});


// ==========================
// VERIFY EMAIL
// ==========================

router.get("/verify/:token", async (req, res) => {

  try {

    const token = req.params.token;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.send("<h2>User not found</h2>");
    }

    // Already verified
    if (user.isverified) {
      return res.send("<h2>Email already verified</h2>");
    }

    // Verify user
    user.isverified = true;

    await user.save();

    res.send(`
      <h2>Email verified successfully ✅</h2>
      <p>You can now login to FoodNest.</p>
    `);

  } catch (err) {

    console.error(err);

    res.status(400).send(`
      <h2>Verification link is invalid or expired ❌</h2>
    `);
  }
});


// ==========================
// LOGIN
// ==========================

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Empty field
    if (!email || !password) {
      return res.json({
        message: "Email and password required"
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.json({
        message: "User not found"
      });
    }

    // Verification check
    if (!user.isverified) {
      return res.json({
        message: "Please verify your email first"
      });
    }

    // Password check
    const ismatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!ismatch) {
      return res.json({
        message: "Wrong password"
      });
    }

    // Login JWT
    const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);

    res.json({
      message: "Login successful",

      token,
      user: {
      id: user._id,
      name: user.name,
     email: user.email,
     isverified: user.isverified,
     role: user.role
}
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Login failed"
    });
  }
});
//test
const authmiddleware = require("../middleware/authmiddleware");

router.get("/protected-test", authmiddleware, (req, res) => {
  res.json({
    message: "Protected route access successful",
    user: req.user
  });
});

module.exports = router;



