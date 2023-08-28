const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const geocoder = require('../utils/geocoder');

// Controllers

// @ Get all Bootcamps
//
exports.getBootcamps = asyncHandler(async (req,res,next) => {
      
        let query;

        let queryStr = JSON.stringify(req.query);


        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        query = Bootcamp.find(JSON.parse(queryStr))

        const bootcamp = await query;
        
        console.log(queryStr)
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

// @desc      Get bootcamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
        const { zipcode, distance } = req.params;
      
        // Get lat/lng from geocoder
        const loc = await geocoder.geocode(zipcode);
        const lat = loc[0].latitude;
        const lng = loc[0].longitude;
      
        // Calc radius using radians
        // Divide dist by radius of Earth
        // Earth Radius = 3,963 mi / 6,378 km
        const radius = distance / 3963;
        const bootcamps = await Bootcamp.find({
          location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
        });
      
        res.status(200).json({
          success: true,
          count: bootcamps.length,
          data: bootcamps,
        });
      });