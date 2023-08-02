//Bringing in express to use the router
const router = require("express").Router();

//Requiring all the requests we wrote in our controller
const {
  getThoughts,
  getOneThought,
  newThought,
  updateThought,
  deleteThought,
  newReaction,
  removeReaction,
} = require("../../Controllers/thoughtController");

//Allows all thoughts through our get request in the controller
//Also allows a new thought using the create request in the controller
router.route("/").get(getThoughts).post(newThought);

//Get a single thought by id, we have the options to update or delete this thought
router
  .route("/:thoughtId")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

//Allows us to access the reations of a thought by id and post a new reaction to the thought
router.route("/:thoughtId/reactions").post(newReaction);

//Allows us to access a specific reaction by id of a specific post and remove it.
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
