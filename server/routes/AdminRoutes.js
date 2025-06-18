const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/Auth");
const {auth} = require("../middlewares/auth");


// Login route
router.post("/login", login);

// Logout route (requires auth middleware)
router.post("/logout",auth, logout);

module.exports = router;
