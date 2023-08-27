const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")

// Controllers

// @ Get all Bootcamps
//
exports.getBootcamps = asyncHandler(async (req,res,next) => {
      
        const bootcamp = await Bootcamp.find();
        
        res.status(200).json({success:true, count:bootcamp.length,data:bootcamp})
          
});

// @ Create a Bootcamp
//
exports.addBootcamps = asyncHandler(async (req,res,next) => {
  
    
        const bootcamp = await Bootcamp.create(req.body)

        res.status(201).json({
            success:true,
            data:bootcamp
        })
   

});

// @ Edit a Bootcamp
//
exports.editBootcamps = asyncHandler(async (req,res,next) => {

    

  
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
       }) 
    
       res.status(200).json({success:true, data:bootcamp})

        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404))
       }

     

   
});

//@ Delete a bootcamp
//
exports.deleteBootcamps = asyncHandler(async(req,res,next) => {

    
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id) 
    
       res.status(200).json({success:true, data:{}})

        if(!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404))
       }


        
   
});

// @ Get a single Bootcamp by ID
//
exports.getBootcamp = asyncHandler(async (req,res,next) => {

      
   
        const bootcamp = await Bootcamp.findById(req.params.id)
        res.status(200).json({success:true, data:bootcamp})

        if(!bootcamp) {
           return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404))
        }
 

   
});

