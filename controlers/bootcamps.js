const Bootcamp = require("../models/Bootcamp");


// Controlers

exports.getBootcamps = (req,res) => {
    res.send("All Bootcamps")
}

exports.addBootcamps = async (req,res,next) => {
   

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

exports.editBootcamps = (req,res) => {
    res.send(`Bootcamp id = ${req.params.id}`)
}

exports.deleteBootcamps = (req,res) => {
    res.send(`Bootcamp id to delete = ${req.params.id}`)
}

exports.getBootcamp = (req,res) => {
    res.send(`Get Bootcamp id  = ${req.params.id}`)
}

