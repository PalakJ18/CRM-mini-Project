const mongoose = require("mongoose");

const leadsSchema = new mongoose.Schema(
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
		tags: [{
			type: String,
		},],
		status: {
			type: String,
			enum: ["contacted", "pending"],
			required: true,
		},
		employeeAssigned: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employee", // 🔥 Important: This name should match your Employee model name
			required: true,
		},

		image: {
			type: String,
			required: false,
		},

	},
	{ timestamps: true }
);

module.exports = mongoose.model("Leads", leadsSchema);