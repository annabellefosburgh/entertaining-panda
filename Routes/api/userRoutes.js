//Bringing in express to use the router
const router = require("express").Router();

//Requiring all of the requests written in the user controller
const {
  getUsers,
  getOneUser,
  newUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../Controllers/userController");

//Gets all users and posts a new user
router.route("/").get(getUsers).post(newUser);

//Gets a single user by id, updates user by id, and deletes user by id
router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

//Gets a single user by id, accesses their friend list, gets specific friend by id.
//Adds friend by id to friends list, deletes friend by id from friends list
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;