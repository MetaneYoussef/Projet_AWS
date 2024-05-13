const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mediaId: { type: String, required: true },
  mediaType: { type: String, required: true },
  status: { type: String, default: 'Prévu' },
  episodesWatched: { type: Number, default: 0 },
  rating: { type: Number }
});

module.exports = mongoose.model('Watchlist', watchlistSchema);