const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("savedBooks");
    },
    user: async (_, { id }) => {
      return User.findById({ id }).populate("savedBooks");
    },
    me: async (_, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (_, args, context) => {
      if (context.user) {
        const updatedReader = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.input } },
          { new: true, runValidators: true }
        );
        return updatedReader;
      }
      throw new AuthenticationError("You must be logged in!");
    },

    removeBook: async (_, { bookId }, context) => {
      const updatedReader = await User.findByIdAndUpdate(
        {
          _id: context.user._id,
        },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        return console.log("user not found");
      }
      return updatedReader;
    },
  },
};

module.exports = resolvers;
