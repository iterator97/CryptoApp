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
        },
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        content: {
          type: String,
        },
        date: {
          type: Date | null,
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

channelSchema.methods.addMessage = function (content) {
  var channel = this;
  channel.messages.push(content);
};

module.exports = mongoose.model("Channel", channelSchema);
