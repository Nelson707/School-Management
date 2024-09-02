const express = require('express')
const cors = require('cors')
const {connectDB} = require("./config/db.js")


// app config
const app = express()
const port = 4000;

// middleware
app.use(express.json())
app.use(cors())

// connect db
connectDB();

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
})