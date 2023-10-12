const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
    maxlength: 30
  },
  lname: {
    type: String,
    required: true,
    maxlength: 30
  },
  dob: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
