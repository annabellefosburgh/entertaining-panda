//Bringing in mongoose as a dependency
const { Schema, model } = require("mongoose");

//A Skeleton collection that requires a user to have a username, email, and will pull thoughts and friends from our other schemas
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

//Returning the length of the friends for a user to get a friends count
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  

const User = model("User", userSchema);

module.exports = User;