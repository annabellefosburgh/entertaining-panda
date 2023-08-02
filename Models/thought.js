//Requiring mongoose, our reaction model, and our helper as dependencies
const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");
const dateFormat = require("../utils/date.js");

//A skeleton collection that requires a thought to have a body, timestamp, associated user, and reaction count
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Message must not be left blank.",
            minlength: 1,
            maxlength: 300,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true,
        },
        reaction: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

//Returning length of reactions on a thought to get the count
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions;
});

const Thought = model("Thought", thoughtSchema);
module.exports = Thought;
