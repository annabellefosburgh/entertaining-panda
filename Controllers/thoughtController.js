//Dependencies from the model folder
const { Thought, User } = require('../Models');

//Wrapping all functions to export
const thoughtPath = {
    //Grabs all thoughts
    getThoughts(req, res) {
        Thought.find({})
        .then((thoughtData) => {
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //Grabs one thought by id
    getOneThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thoughtData) => {
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //Make a new thought
    newThought(req, res) {
      Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: {thoughts: thought._id} },
            { new: true}
        );
      })
      .then((thought) => {
        !thought
        ? res.status(404).json({ message: "No User find with this ID!" })
        : res.json(thought);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })  
    },

    //Update one thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thoughtData) => {
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //Delete one thought by id
    deleteThought(req, res) {
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId }
            
        )
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })

        //Removing thought from user it belongs to
        return User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        )
        .then((userData) => {
            res.json({ message: "Thought deleted!" })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //Creating reaction to add to specific thought
    newReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true }
        )
        .then(thoughtData => {
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //Remove reaction from specific thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
        .then((thoughtData) => {
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },


};

module.exports = thoughtPath