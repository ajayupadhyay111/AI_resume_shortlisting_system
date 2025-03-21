const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticateRoute = require("../middleware/authenticateRoute");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", authenticateRoute, userController.getProfile);
router.post("/refresh-token", userController.refreshToken);
module.exports = router;
