//Bringing in mongoose as a dependency
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ], 
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

//Something here to return friend count of user

const User = model("User", userSchema);

module.exports = User;