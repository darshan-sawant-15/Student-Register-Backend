const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/studentdb");
mongoose.connect("mongodb+srv://darshansawant285:5Zg6S7O1PrnJ5U9u@cluster0.9ssvc5m.mongodb.net/studentdb");

const conn = mongoose.connection;

conn.once("open", ()=>{
    console.log("Connection Successful !");
});

conn.on("errpr", (error)=>{
    console.log("Error occured" );
})