const ErrorResponse = require("../utils/errorResponse")
const errorHandler = (err,req,res,next)=> {

let error = {...err};
error.message = err.message;

   

    // Mongoose bad ID error
   if (err.name === "CastError") {
        const message = `Resource not found with ID of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoose duplicate ID
    if(err.code===11000) {
        const message = "Duplicate ID in Mongo";
        error = new ErrorResponse(message, 400);
    }

    //Mongoose validation error
    if(err.code==="ValidationError") {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || "Server Error"
    })
    
} 

module.exports = errorHandler;
