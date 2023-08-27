const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse")


// Controllers

// @ Get all Bootcamps
//
exports.getBootcamps = async (req,res) => {
    
    try {
        const bootcamp = await Bootcamp.find();
        
        res.status(200).json({success:true, count:bootcamp.length,data:bootcamp})
    } catch  {

        res.status(400).json({success:false})
        
    }
}

// @ Create a Bootcamp
//
exports.addBootcamps = async (req,res,next) => {
  
    //Try to create

    try {
        const bootcamp = await Bootcamp.create(req.body)

        res.status(201).json({
            success:true,
            data:bootcamp
        })
        
    } catch (error) {
        res.status(400).json({success:false})
    }

}

// @ Edit a Bootcamp
//
exports.editBootcamps = async (req,res,next) => {

    

    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
       }) 
    
       res.status(200).json({success:true, data:bootcamp})

        if(!bootcamp) {
            return res.status(400).json({success:false})
       }


        
    } catch (error) {
        res.status(400).json({success:false})
    }

  

   
}

//@ Delete a bootcamp
//
exports.deleteBootcamps = async(req,res) => {

    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id) 
    
       res.status(200).json({success:true, data:{}})

        if(!bootcamp) {
            return res.status(400).json({success:false})
       }


        
    } catch (error) {
        res.status(400).json({success:false})
    }
   
}

// @ Get a single Bootcamp by ID
//
exports.getBootcamp = async (req,res,next) => {

      
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        res.status(200).json({success:true, data:bootcamp})

        if(!bootcamp) {
           return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404))
        }

    } catch (err) {
     
       next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`,404))
    }

   

   // 
}

