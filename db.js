const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/studentdb");

const conn = mongoose.connection;

conn.once("open", ()=>{
    console.log("Connection Successful !");
});

conn.on("errpr", (error)=>{
    console.log("Error occured" );
})