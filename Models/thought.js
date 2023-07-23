//Requiring mongoose, our reaction model, and our helper as dependencies
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

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

//Something to return the length of the reaction count

module.exports = thoughtSchema;
