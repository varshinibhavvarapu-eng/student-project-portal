const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    studentName: {
      type: String,
      required: true
    },

    department: {
      type: String,
      default: "BCA"
    },

    technology: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    // 🔥 NEW PROFESSIONAL FIELDS
    githubLink: {
      type: String,
      default: ""
    },

    demoLink: {
      type: String,
      default: ""
    },

    category: {
      type: String,
      default: "Web Development"
    },

    status: {
      type: String,
      enum: ["Completed", "Ongoing", "Planned"],
      default: "Completed"
    },

    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", ProjectSchema);