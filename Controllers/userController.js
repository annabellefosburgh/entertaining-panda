const { Thought, User } = require('../Models');

//Wrapping all functions to export
const userPath = {
    //Grabbing all users
    getUsers(req, res) {
        User.find()
        .select("-__v")
        .then((userData) => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //Grab one user by id
    getOneUser(req, res) {
        User.findOne(
            { _id: req.params.userId }
        )
        .select("-__v")
        .populate("friends")
        .populate("thoughts")
        .then((userData) => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //Creating new user
    newUser(req, res) {
        User.create(req.body)
        .then((userData) => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //Update an exisiting user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((userData) => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //Delete existing user by id
    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId }
        )
        .then((userData) => {
            res.json( { message: "User deleted!" })
            //BONUS: return thoughts associated with user id and deleteMany
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //Add user to friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: req.params.friendId }},
            { new: true }
        )
        .then((userData) => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //Remove user from friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true },
        )
        .then((userData) => {
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }

};

module.exports = userPath;