const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,

    default: Date.now,
  },
});

const Posts = mongoose.model('Posts', PostSchema);
module.exports = Posts;
