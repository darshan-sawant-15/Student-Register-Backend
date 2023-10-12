const validator = require("validator");

const { isValidObjectId } = require("mongoose");

function validateFname(req, resp, next) {
  const { fname } = req.body;
  if (!fname) {
    resp.status(400).json("Please add a first name");
    return;
  }
  if (fname.length > 30) {
    resp.status(400).json("First name should not exceed 30 characters");
    return;
  }
  next();
}

function validateLname(req, resp, next) {
  const { lname } = req.body;
  if (!lname) {
    resp.status(400).json("Please add a last name");
    return;
  }
  if (lname.length > 30) {
    resp.status(400).json("Last name should not exceed 30 characters");
    return;
  }
  next();
}

function validateDob(req, resp, next) {
  const { dob } = req.body;

  if (!dob) {
    resp.status(400).json("Please enter date of birth");
    return;
  }

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 16);
  const selectedDate = new Date(dob);

  if (selectedDate > maxDate) {
    resp.status(400).json("Student needs to be minimum 16 years old");
    return;
  }

  next();
}

function validateCourse(req, resp, next) {
  const { course } = req.body;
  if (!course) {
    resp.status(400).json("Please select a course");
    return;
  }

  if (course != "Full Stack Developer" && course != "Data Science") {
    resp.status(400).json("Please select a valid course");
    return;
  }
  next();
}

function validateEmail(req, resp, next) {
  const { email } = req.body;
  if (!email) {
    resp.status(400).json("Please add an email address");
    return;
  }

  if (!validator.isEmail(email)) {
    resp.status(400).json("Invalid email format");
    return;
  }

  next();
}

function validateId(req, resp, next) {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    resp.status(400).json("Invalid resource id");
    return;
  }
  next();
}

module.exports = {
  validateFname,
  validateLname,
  validateEmail,
  validateDob,
  validateCourse,
  validateId,
};
