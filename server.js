const express = require("express");
const dotenv = require("dotenv");
const bootcamps = require("./routes/bootcamps")
const connectDB = require("./config/db")

dotenv.config({path: "./config/config.env"})



const app = express()

const PORT = process.env.PORT || 5000

connectDB();

// Bootcamps routes
app.use('/api/v1/bootcamps', bootcamps)


// Start server
const server = app.listen(PORT, console.log(`Server running on port on ${PORT}`))

// Handle promise rejections

process.on("unhandledRejection",(err, promise) => {
    console.log(`Error - ${err.message}`)

    // Close server with error message
    server.close(()=> process.exit(1));
})