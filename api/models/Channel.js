var mongoose = require("mongoose");
const Creator = require("./Creator");
const Schema = mongoose.Schema;

const channelSchema = Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Creator",
    required: true,
  },
  messages: {
    type: [
      {
        userId: {
          type: String,
          required: true,
        },
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],

    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Channel", channelSchema);
