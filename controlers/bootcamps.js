const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middleware/async")
const geocoder = require('../utils/geocoder');

// Controllers

// @ Get all Bootcamps
//
exports.getBootcamps = asyncHandler(async (req,res,next) => {
      
        // Initialize query var
        let query;
        
        // Use spread operator to copy array
        reqQuery = {...req.query};
        

        // Fields to exclude from result
        const removeFields = ["select", "sort", "page","limit"]

        // Loop through and remove fields to exclude
        removeFields.forEach(param => delete reqQuery[param])



        // JSON object to string
        let queryStr = JSON.stringify(reqQuery);

        
        // Insert $ into code
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        console.log(queryStr)
        // String back to JSON object
        query = Bootcamp.find(JSON.parse(queryStr))

        // If SELECT is part of the query
        if(req.query.select) {
        const fields = req.query.select.split(",").join(" ");
        query = query.select(fields)
        
        }

        // Sort
        if(req.query.sort) {
                const sortBy = req.query.sort.spit(",").join(" ");
                query = query.sort(sortBy);
        }else
        {
                query = query.sort("-createdAt")
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 100;
        const startIndex = (page-1) * limit;
        const endIndex = page * limit; 
        const total = await Bootcamp.countDocuments();

        query = query.skip(startIndex).limit(limit);


        // Execute query
        const bootcamp = await query;

        // Pagination result

        const pagination = {};

        if(endIndex < total) {
                pagination.next = {
                        page: page + 1,
                        limit
                }
        }

        if(endIndex > 0) {
                pagination.prev = {
                        page: page - 1,
                        limit
                }
        }
        
        // Success
        res.status(200).json({success:true, count:bootcamp.length,pagination,data:bootcamp})
          
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