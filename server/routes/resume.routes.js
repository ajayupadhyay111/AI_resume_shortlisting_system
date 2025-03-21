const express = require("express");
const resumeController = require("../controllers/resume.controller");
const upload = require("../config/multer");
const authenticateRoute = require("../middleware/authenticateRoute");
const CheckUserIsEligible = require("../middleware/checkUserIsEligible");

const router = express.Router();

router.post(
  "/match",
  authenticateRoute,
  CheckUserIsEligible,
  upload.array("resumes", 15),
  resumeController.matchResumeWithJobDescription
);

router.get(
  "/attempts",
  authenticateRoute,
  resumeController.getAttempts
);

router.get(
  "/attempt/:id",
  authenticateRoute,
  resumeController.getCandidatesByAttemptId
);

router.get(
  "/",
  authenticateRoute,
  (req, res, next) => {
    const userId = req.userId;
     console.log("first controller " + userId);
    next();
  },
  (req, res, next) => {
    const userId = req.userId;
    console.log("second controller " + userId);
    res.send("second controller " + userId);
  }
);
module.exports = router;
