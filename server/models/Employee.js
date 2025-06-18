const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: Number,
            required: true,
            trim: true,
        },
        position: {
            type: Number,
            required: false,
        },
        status: {
            type: String,
            enum: ["Active", "Inactive"],
            required: true,
        },
        noOfLeads: {
            type: Number,
            default : 0,
        },

    }
);

module.exports = mongoose.model("Employee", employeeSchema);