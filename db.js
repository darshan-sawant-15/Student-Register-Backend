const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const conn = mongoose.connection;

conn.once("open", ()=>{
    console.log("Connection Successful !");
});

conn.on("errpr", (error)=>{
    console.log("Error occured" );
})