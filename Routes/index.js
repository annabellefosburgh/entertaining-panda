//Adding express as a dependency, requiring our api routes in the embedded folder
const router = require("express").Router();
const apiRoutes = require("./api");

//Using the routes written
router.use("/api", apiRoutes);

//Error message for the wrong path
router.use((req, res) => {
  return res.send("Error!");
});

module.exports = router;
