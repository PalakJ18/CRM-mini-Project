const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");

const {
  createLeads,
  getAllLeads,
  updateLeads,
  deleteLeads,
} = require("../controllers/Leads");

// Create
router.post("/createLeads",auth, createLeads);

// Read
router.get("/getAllLeads",auth, getAllLeads);

// Update
router.put("/updateLeads",auth, updateLeads);

// Delete
router.delete("/deleteLeads",auth, deleteLeads);

module.exports = router;

const { getLeadCount } = require("../controllers/Leads");

router.get("/count", auth, getLeadCount);