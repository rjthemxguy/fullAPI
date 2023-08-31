const express = require("express")
const router = express.Router()
const {getBootcamps,
      addBootcamps,
      editBootcamps,
      deleteBootcamps,
      getBootcampsInRadius,
      getBootcamp,
      bootcampPhotoUpload} = require("../controlers/bootcamps");

      const advancedResults = require("../middleware/advancedResults");
      const Bootcamp = require("../models/Bootcamp")


      

    // Include other resource routers

    const courseRouter = require("./courses")

    // Re-route into othr resourse routers
    router.use("/:bootcampId/courses", courseRouter);

    router.route("/:id/photo").put(bootcampPhotoUpload)

      // Routes

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/')
.get(advancedResults(Bootcamp,"courses"),getBootcamps)
.post(addBootcamps)

router.route('/:id')
.delete(deleteBootcamps)
.get(getBootcamp)
.put(editBootcamps)

module.exports = router;