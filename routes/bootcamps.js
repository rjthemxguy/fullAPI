const express = require("express")
const router = express.Router()
const {getBootcamps,
      addBootcamps,
      editBootcamps,
      deleteBootcamps,
      getBootcamp} = require("../controlers/bootcamps")

router.route('/')
.get(getBootcamps)
.post(addBootcamps)

router.route('/:id')
.put(editBootcamps)
.delete(deleteBootcamps)
.get(getBootcamp)

module.exports = router;