const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticateRoute = require("../middleware/authenticateRoute");

router.post("/register", userController.register);
router.post("/verifyEmail", userController.verifyEmail);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.put("/reset-password/:forgotToken", userController.resetPassword);
router.get("/profile", authenticateRoute, userController.getProfile);
router.put("/updateUser", authenticateRoute, userController.updateProfile);
router.post("/refresh-token", userController.refreshToken);
router.post("/reject/:id", authenticateRoute, userController.rejectCandidate);
router.post("/shortlist/:id", authenticateRoute, userController.shortlistCandidate);
router.post("/logout", authenticateRoute, userController.logout);

// social logins
router.get("/google", userController.googleLogin);
module.exports = router;
