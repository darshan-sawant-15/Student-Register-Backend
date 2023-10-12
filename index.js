const express = require('express');
const app = express();
const {studentRouter} = require("./controller/student-controller");
const mongoose = require("./db");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/", studentRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server running on port 3000");
})