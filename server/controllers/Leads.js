const Leads = require("../models/Leads");
const Employee = require("../models/Employee");

// Create Lead
exports.createLeads = async (req, res) => {
  try {
    const { company, email, phone, tag, status, employee } = req.body;

    // Convert tag string to array, supporting both single & comma-separated input
    const tagsArray = typeof tag === "string"
      ? tag.split(",").map(t => t.trim()).filter(Boolean)
      : [];

    // Create new lead with correct fields
    const newLead = await Leads.create({
      company,
      email,
      phone,
      tags: tagsArray,
      status,
      employeeAssigned: employee,
    });

    // Increment noOfLeads for the assigned employee
    if (employee) {
      await Employee.findByIdAndUpdate(employee, {
        $inc: { noOfLeads: 1 },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead: newLead,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return res.status(500).json({
      success: false,
      message: "Lead creation failed",
    });
  }
};

//get all leads 
exports.getAllLeads = async (req, res) => {
  try {
    const allLeads = await Leads.find({})
      .populate("employeeAssigned", "company") // 🔥 THIS POPULATES the employee company
    console.log("all leads at get is ", allLeads);

    return res.status(200).json({
      success: true,
      data: allLeads,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateLeads = async (req, res) => {
  try {
    const { leadId, company, email, phone, status, employee } = req.body;
    const tags = req.body.tags || [];
    const image = req.file ? req.file.path : undefined;

    const existingLead = await Leads.findById(leadId);
    if (!existingLead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    // 🔥 FIXED: use employeeAssigned instead of employee
    if (existingLead.employeeAssigned?.toString() !== employee) {
      if (existingLead.employeeAssigned) {
        await Employee.findByIdAndUpdate(existingLead.employeeAssigned, {
          $inc: { noOfLeads: -1 },
        });
      }
      await Employee.findByIdAndUpdate(employee, {
        $inc: { noOfLeads: 1 },
      });
    }

    const updateFields = {
      company,
      email,
      phone,
      status,
      employeeAssigned: employee, // 🔥 FIXED: match field name in schema
      tags: Array.isArray(tags) ? tags : [tags],
    };
    if (image) updateFields.image = image;

    const updatedLead = await Leads.findByIdAndUpdate(leadId, updateFields, { new: true });

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead: updatedLead,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update lead",
    });
  }
};

exports.deleteLeads = async (req, res) => {
  try {
    const { leadId } = req.body;

    const leadToDelete = await Leads.findById(leadId);
    if (!leadToDelete) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Decrease the lead count for the assigned employee
    await Employee.findByIdAndUpdate(leadToDelete.employee, {
      $inc: { noOfLeads: -1 },
    });

    await Leads.findByIdAndDelete(leadId);

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete lead",
    });
  }
};

exports.getLeadCount = async (req, res) => {
  try {
    const count = await Leads.countDocuments();
    return res.status(200).json({
      success: true,
      totalLeads: count,
    });
  } catch (error) {
    console.error("ERROR in getLeadCount:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get lead count",
    });
  }
};
