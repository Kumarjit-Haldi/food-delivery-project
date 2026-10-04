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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

     newuser.verificationotp = otp;
     newuser.verificationotpexpires = new Date(Date.now() + 10 * 60 * 1000);

     await newuser.save();

    // Send email
   await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: newuser.email,
  subject: "Your FoodNest Verification OTP",
  html: `
    <h2>Welcome to FoodNest!</h2>

    <p>Hello ${newuser.name},</p>

    <p>Your FoodNest verification OTP is:</p>

    <h1 style="color:#f97316; letter-spacing:8px;">
      ${otp}
    </h1>

    <p>This OTP will expire in 10 minutes.</p>
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
// VERIFY OTP
// ==========================

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.json({
        message: "Email and OTP are required"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (!user) {
      return res.json({
        message: "User not found"
      });
    }

    if (user.isverified) {
      return res.json({
        message: "Email already verified"
      });
    }

    if (
      !user.verificationotp ||
      user.verificationotp !== otp
    ) {
      return res.json({
        message: "Invalid OTP"
      });
    }

    if (
      !user.verificationotpexpires ||
      user.verificationotpexpires < new Date()
    ) {
      return res.json({
        message: "OTP expired"
      });
    }

    user.isverified = true;
    user.verificationotp = undefined;
    user.verificationotpexpires = undefined;

    await user.save();

    res.json({
      message: "Email verified successfully"
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "OTP verification failed"
    });
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



