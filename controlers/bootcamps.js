exports.getBootcamps = (req,res) => {
    res.send("All Bootcamps")
}

exports.addBootcamps = (req,res) => {
    res.send("Add Bootcamp")
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

