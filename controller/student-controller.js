//importing express
const express = require("express");

//importing model
const { Student } = require("../model/student");

//importing router
var studentRouter = express.Router();

//importing validation-middleware
const {
  validateFname,
  validateLname,
  validateEmail,
  validateDob,
  validateCourse,
  validateId,
} = require("../middleware/validation-middleware");

//import mongoose and ObjectId
const mongoose = require("mongoose");
const e = require("express");
const { ObjectId } = mongoose.Types;

//return count of total number of students
studentRouter.get("/countPages", async (req, resp) => {
  try {
    const count = await Student.countDocuments({}).exec();
    const pages = Math.ceil(count / 10);
    resp.status(200).send({ pages });
  } catch (err) {
    console.log(err);
    resp.status(500).json("Internal server error");
  }
});

//get all students
studentRouter.get("/:page", async (req, resp) => {
  try {
    const page = req.params.page;
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;
    const data = await Student.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(itemsPerPage)
      .exec();
    if (data.length == 0) {
      resp.status(404).json("Students not found");
      return;
    }
    resp.status(200).send(data);
  } catch (err) {
    console.log(err);
    resp.status(500).json("Internal server error");
  }
});

//get one student details
studentRouter.get("/single/:id", validateId, async (req, resp) => {
  try {
    const studentId = new ObjectId(req.params.id);
    const data = await Student.findOne({ _id: studentId }).exec();
    if (data) {
      resp.status(200).send(data);
    } else {
      resp.status(400).json("Student details not found");
    }
  } catch (err) {
    console.log(err);
    resp.status(500).json("Internal server error");
  }
});

//create a student
studentRouter.post(
  "/",
  validateFname,
  validateLname,
  validateDob,
  validateCourse,
  validateEmail,
  async (req, resp) => {
    try {
      const student = new Student({
        fname: req.body.fname,
        lname: req.body.lname,
        dob: req.body.dob,
        course: req.body.course,
        email: req.body.email,
      });

      const data = await student.save();
      resp.status(201).send(data);
    } catch (err) {
      console.log(err);
      resp.status(500).json("Internal server error");
    }
  }
);

//update a student
studentRouter.put(
  "/:id",
  validateId,
  validateFname,
  validateLname,
  validateDob,
  validateCourse,
  validateEmail,
  async (req, resp) => {
    try {
      const studentId = new ObjectId(req.params.id);
      const studentWithId = await Student.findOne({ _id: studentId }).exec();
      if (!studentWithId) {
        resp.status(404).json("Student not found");
        return;
      }

      const student = new Student({
        _id: studentId,
        fname: req.body.fname,
        lname: req.body.lname,
        dob: req.body.dob,
        course: req.body.course,
        email: req.body.email,
      });

      const data = await Student.findByIdAndUpdate(
        studentId,
        {
          $set: student,
        },
        { new: true }
      ).exec();
      resp.status(200).send(data);
    } catch (err) {
      console.log(err);
      resp.status(500).json("Internal server error");
    }
  }
);

//delete a student
studentRouter.delete("/:id", validateId, async (req, resp) => {
  try {
    const studentId = new ObjectId(req.params.id);
    const studentWithId = await Student.findOne({ _id: studentId }).exec();
    if (!studentWithId) {
      resp.status(404).json("Student not found");
      return;
    }

    await Student.findByIdAndDelete(studentId);
    resp.status(204).send("Deleted");
  } catch (err) {
    console.log(err);
    resp.status(500).json("Internal server error");
  }
});

module.exports = { studentRouter };
