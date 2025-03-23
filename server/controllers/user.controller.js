const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Candidate = require("../models/candidate");
const Attempt = require("../models/attempt");
const jwt = require("jsonwebtoken");
const generateOTP = require("../helper/generateOTP");
const sendVerificationEmail = require("../services/sendVerificationEmial");
const sendPasswordResetEmail = require("../services/sendPasswordResetEmail");
const { auth2Client } = require("../config/google");
const axios = require("axios")

const userController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      // Validate input fields
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Generate OTP
      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        attemptCount: 0,
        otp,
        otpExpiry,
        isVerified: false,
      });

      // Save user to database
      await newUser.save();

      // Send verification email
      await sendVerificationEmail(email, otp);

      res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  },
  verifyEmail: async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user.isVerified) {
        return res.status(400).json({ message: "Email already verified" });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      if (user.otpExpiry < Date.now()) {
        return res.status(400).json({ message: "OTP expired" });
      }

      user.isVerified = true;
      await user.save();

      res
        .status(200)
        .json({ success: true, message: "Email verified successfully" });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate refresh token
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      user.refreshToken = refreshToken;
      user.refreshTokenExpiryDate = Date.now() + 24 * 60 * 60 * 1000;
      await user.save();

      // Generate access token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          attempts: user.attemptCount,
        },
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const forgotPasswordToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "10m",
        }
      );
      const forgotPasswordTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);

      user.forgotPasswordToken = forgotPasswordToken;
      user.forgotPasswordTokenExpiry = forgotPasswordTokenExpiry;
      await user.save();
      await sendPasswordResetEmail(email, forgotPasswordToken);

      res
        .status(200)
        .json({ success: true, message: "Password reset email sent" });
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { forgotToken } = req.params;
      const { newPassword } = req.body;
      if (!forgotToken || !newPassword) {
        return res
          .status(400)
          .json({ message: "Missing required parameters, Try again" });
      }

      const user = await User.findOne({ forgotPasswordToken: forgotToken });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.forgotPasswordTokenExpiry < Date.now()) {
        return res.status(400).json({ message: "Link Expired, Try again" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
      user.forgotPasswordToken = null;
      user.forgotPasswordTokenExpiry = null;
      await user.save();

      res
        .status(200)
        .json({ success: true, message: "Password reset successful" });
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
      }

      const user = await User.findOne({ refreshToken });
      if (!user) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      try {
        jwt.verify(refreshToken, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      if (user.refreshTokenExpiryDate < Date.now()) {
        return res.status(401).json({ message: "Refresh token expired" });
      }

      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  },

  getProfile: async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          attempts: user.attemptCount,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const { name, email } = req.body;
      const userId = req.userId;
      if (!name || !email) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.name = name;
      user.email = email;
      await user.save();

      res
        .status(200)
        .json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(400).json({ message: "No refresh token provided" });
      }

      const user = await User.findOne({ refreshToken });
      if (!user) {
        res.clearCookie("refreshToken");
        return res.status(200).json({ message: "Logged out successfully" });
      }

      user.refreshToken = null;
      user.refreshTokenExpiryDate = null;
      await user.save();

      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  },

  rejectCandidate: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { attemptId } = req.body;

      if (!id || !attemptId) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      const attempt = await Attempt.findById(attemptId);
      if (!attempt) {
        return res.status(404).json({ message: "Attempt not found" });
      }

      if (attempt.uploaderId.toString() !== req.userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to reject this candidate" });
      }

      if (
        !attempt.candidateId.some(
          (candidate) => candidate._id.toString() === id
        )
      ) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      const candidate = await Candidate.findById(id);
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      candidate.status = "Rejected";
      await candidate.save();

      res.status(200).json({ message: "Candidate rejected successfully" });
    } catch (error) {
      next(error);
    }
  },

  shortlistCandidate: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { attemptId } = req.body;

      if (!id || !attemptId) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      const attempt = await Attempt.findById(attemptId);
      if (!attempt) {
        return res.status(404).json({ message: "Attempt not found" });
      }

      if (attempt.uploaderId.toString() !== req.userId) {
        return res.status(403).json({
          message: "You are not authorized to shortlist this candidate",
        });
      }

      if (
        !attempt.candidateId.some(
          (candidate) => candidate._id.toString() === id
        )
      ) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      const candidate = await Candidate.findById(id);
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      candidate.status = "Shortlisted";
      await candidate.save();

      res.status(200).json({ message: "Candidate shortlisted successfully" });
    } catch (error) {
      next(error);
    }
  },

  // Social logins controllers
  googleLogin: async (req, res, next) => {
    try {
      const { code } = req.query;
      const googleRes = await auth2Client.getToken(code);
      auth2Client.setCredentials(googleRes.tokens);
      const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
      );

      const { email, name, picture } = userRes.data;

      let user = new User({
        name,
        email,
        image: picture,
        password: null,
        attemptCount: 0,
      });
      await user.save();

      // Generate refresh token
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      user.refreshToken = refreshToken;
      user.refreshTokenExpiryDate = Date.now() + 24 * 60 * 60 * 1000;
      await user.save();

      // Generate access token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image ? user.image : null,
          attempts: user.attemptCount,
        },
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
