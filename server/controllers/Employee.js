const Employee = require("../models/Employee");
const Lead = require("../models/Leads");


// Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const { company, email, phone, position, status, noOfLeads } = req.body;

    if (!company || !email || !phone || !position || !status || !noOfLeads) {
      return res.status(403).json({ success: false, message: "All fields are required" });
    }

    const numericContact = Number(phone);

    const employee = await Employee.create({
      company,
      email,
      phone: numericContact,
      position,
      status,
      noOfLeads,
    });

    return res.status(200).json({
      success: true,
      data: employee, // ✅ FIXED: was "provider" mistakenly
      message: "Employee created successfully",
    });

  } catch (error) {
    console.error("EMPLOYEE CREATION ERROR:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get All Employees
exports.getAllEmployee = async (req, res) => {
  try {
    const allEmployees = await Employee.find({});
    return res.status(200).json({
      success: true,
      data: allEmployees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id, company, email, phone, position, status, noOfLeads } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Employee ID is required" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { company, email, phone, position, status, noOfLeads },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("EMPLOYEE UPDATE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedEmployee = await Employee.findByIdAndDelete(id); // ✅ FIXED

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: deletedEmployee,
    });
  } catch (error) {
    console.error("EMPLOYEE DELETE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEmployeeCount = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    return res.status(200).json({
      success: true,
      totalEmployees: count,
    });
  } catch (error) {
    console.error("ERROR in getEmployeeCount:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get employee count",
    });
  }
};


exports.getLeadCountByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required in the request body",
      });
    }

    const count = await Lead.countDocuments({ employee: employeeId });

    return res.status(200).json({
      success: true,
      employeeId,
      assignedLeads: count,
    });
  } catch (error) {
    console.error("ERROR in getLeadCountByEmployee:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get lead count for employee",
    });
  }
};
