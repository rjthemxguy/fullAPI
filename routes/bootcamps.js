const express = require("express")
const router = express.Router()
const {getBootcamps,
      addBootcamps,
      editBootcamps,
      deleteBootcamps,
      getBootcamp} = require("../controlers/bootcamps")

      // Routes
router.route('/')
.get(getBootcamps)
.post(addBootcamps)

router.route('/:id')

.delete(deleteBootcamps)
.get(getBootcamp)

module.exports = router;