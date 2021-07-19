const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = mongoose.Schema({
  fullurl: {
    type: String,
    required: true,
  },
  shorturl: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
