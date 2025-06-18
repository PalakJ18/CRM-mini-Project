const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");

const {
  createEmployee,
  getAllEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/Employee");

// Create
router.post("/createEmployee",auth, createEmployee);

// Read
router.get("/getAllEmployees",auth, getAllEmployee);

// Update
router.put("/updateEmployee",auth, updateEmployee);

// Delete
router.delete("/deleteEmployee",auth, deleteEmployee);

module.exports = router;


const { getEmployeeCount, getLeadCountByEmployee } = require("../controllers/Employee");

router.get("/count", auth, getEmployeeCount);
router.get("/noOfLeads", auth, getLeadCountByEmployee);



