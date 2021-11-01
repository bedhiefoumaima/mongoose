const express=require ("express");
const connectDB = require("./config/connectDB");

const app=express();
require('dotenv').config();
connectDB();
app.use(express.json());
app.use("/x", require("./router/Person"));

// const PORT=process.env.PORT;
const PORT= 5000;

app.listen(PORT, (error)=>
error? console.log(error): console.log("seerver is runing",PORT ) );