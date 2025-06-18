const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // 2. Check if admin exists
    const foundAdmin = await Admin.findOne({ email });
    if (!foundAdmin) {
      return res.status(401).json({
        success: false,
        message: "No admin found with this email",
      });
    }

    // 3. Check password (plaintext for now)
    if (password !== foundAdmin.password) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // 4. Create JWT token
    const token = jwt.sign(
      { id: foundAdmin._id, email: foundAdmin.email, name: foundAdmin.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // 5. Optionally mark admin as active
    await Admin.findByIdAndUpdate(foundAdmin._id, { active: true });

    // 6. Return token in JSON (no cookie)
    return res.status(200).json({
      success: true,
      token,
      user: {
        id: foundAdmin._id,
        email: foundAdmin.email,
        name: foundAdmin.name,
      },
      message: "Admin login successful",
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
};


// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill in all required fields",
//       });
//     }

//     // Find admin by email
//     const admin = await Admin.findOne({ email });

//     if (!admin) {
//       return res.status(401).json({
//         success: false,
//         message: "No admin found with this email",
//       });
//     }

//     // Simple password check (you can replace with bcrypt for better security)
//     if (admin.password !== password) {
//       return res.status(403).json({
//         success: false,
//         message: "Incorrect password",
//       });
//     }

//     // Create JWT token
//     const token = jwt.sign(
//       { email: admin.email, id: admin._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     // Optional: mark as active
//     await Admin.findByIdAndUpdate(admin._id, { active: true });

//     // Send token in cookie
//     res.cookie("token", token, {
//       success: true,
//         token,
//         user,
//         message: `User Login Success`,
//     });

//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Login failed. Please try again.",
//     });
//   }
// };

// LOGOUT
exports.logout = async (req, res) => {
  try {
    const userId = req.user.id; // should be set via auth middleware

    // Optional: mark as inactive
    await Admin.findByIdAndUpdate(userId, { active: false });

    // Clear cookie
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed. Please try again.",
    });
  }
};

