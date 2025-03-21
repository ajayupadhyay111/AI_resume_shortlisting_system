const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Candidate = require("../models/candidate");
const Attempt = require("../models/attempt");

const userController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hashedPassword });

      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate refresh token
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.refreshToken = refreshToken;
    user.refreshTokenExpiryDate = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // generate access token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // set token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 24*60 * 60 * 1000,
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
  },
  refreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }

    const isRefreshTokenValid = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (!isRefreshTokenValid) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    if (user.refreshTokenExpiryDate < Date.now()) {
      return res.status(400).json({ message: "Refresh token expired" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ accessToken });
  },
  
  getProfile: async (req, res) => {
    const user = await User.findById(req.userId);
    res.json({user:{
      _id:user._id,
      name:user.name,
      email:user.email,
      attempts:user.attemptCount,
    }});
  },

  logout: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(400).json({ message: "Invalid refresh token" });
    }
    user.refreshToken = null;
    user.refreshTokenExpiryDate = null;
    await user.save();
    res.clearCookie("refreshToken");
    res.json({ message: "Logout successful" });
  },

  rejectCandidate: async (req, res) => {
    const { id } = req.params;
    const { attemptId } = req.body;
    const attempt = await Attempt.findById(attemptId);
    if(!attempt){
      return res.status(400).json({ message: "Attempt not found" });
    }
    if(attempt.uploaderId == req.userId){
      if(attempt.candidateId.some(candidate => candidate._id == id)){
        const candidate = await Candidate.findById(id);
        candidate.status = "Rejected";
        await candidate.save();
        res.json({ message: "Candidate rejected" });
      }
      else{
        return res.status(400).json({ message: "Candidate not found" });
      }
    }
    else{
      return res.status(400).json({ message: "You are not allowed to reject candidate" });
    }
  },

  shortlistCandidate: async (req, res) => {
    const { id } = req.params;
    const { attemptId } = req.body;
    const attempt = await Attempt.findById(attemptId);
    if(!attempt){
      return res.status(400).json({ message: "Attempt not found" });
    }
    if(attempt.uploaderId == req.userId){
      if(attempt.candidateId.some(candidate => candidate._id == id)){
        const candidate = await Candidate.findById(id);
        candidate.status = "Shortlisted";
        await candidate.save();
        res.json({ message: "Candidate shortlisted" });
      }
      else{
        return res.status(400).json({ message: "Candidate not found" });
      }
    }
    else{
      return res.status(400).json({ message: "You are not allowed to shortlist candidate" });
    }
  },
};

module.exports = userController;
