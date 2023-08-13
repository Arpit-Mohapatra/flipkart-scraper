const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flipkartUrl: { type: String, unique: true },
  title: String,
  price: Number,
  description: String,
  numReviews: Number,
  ratings: Number,
  mediaCount: Number,
});

module.exports = mongoose.model('Post', postSchema);
