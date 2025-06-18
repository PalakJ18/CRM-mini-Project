// Import 
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        active: {
            type: Boolean,
            default: true,
        },

    },
);

module.exports = mongoose.model("Admin", adminSchema);