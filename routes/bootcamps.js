const express = require("express")
const router = express.Router()
const {getBootcamps,
      addBootcamps,
      editBootcamps,
      deleteBootcamps,
      getBootcampsInRadius,
      getBootcamp} = require("../controlers/bootcamps")

    // Include other resource routers

    const courseRouter = require("./courses")

    // Re-route into othr resourse routers
    router.use("/:bootcampId/courses", courseRouter);


      // Routes

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/')
.get(getBootcamps)
.post(addBootcamps)

router.route('/:id')

.delete(deleteBootcamps)
.get(getBootcamp)
.put(editBootcamps)

module.exports = router;