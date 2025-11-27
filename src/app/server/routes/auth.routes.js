const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller');
const { upload } = require('../config/prev_multer');

router.post("/sign-up",upload.single('profilePhoto'), authController.signupUser);
router.post("/sign-in", authController.signinUser);
router.post("/set-token", authController.authHandler)
router.get("/verify-token-get-profile", authController.profileHandler)

module.exports = router