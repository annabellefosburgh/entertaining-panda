//Requiring express as a dependency
const router = require("express").Router();

//Requiring our user and thought route pages
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

//Using the routes we just required above
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;