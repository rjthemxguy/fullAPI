const Bootcamp = require("../models/Bootcamp");


// Controlers

// @ Get all Bootcamps
//
exports.getBootcamps = async (req,res) => {
    
    try {
        const bootcamp = await Bootcamp.find();
        
        res.status(200).json({success:true, data:bootcamp})
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
exports.editBootcamps = (req,res) => {
    res.send(`Bootcamp id = ${req.params.id}`)
}

//@ Delete a bootcamp
//
exports.deleteBootcamps = (req,res) => {
    res.send(`Bootcamp id to delete = ${req.params.id}`)
}

// @ Get a Bootcamp by ID
//
exports.getBootcamp = (req,res) => {
    res.send(`Get Bootcamp id  = ${req.params.id}`)
}

