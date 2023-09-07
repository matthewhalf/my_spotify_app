import mongoose from 'mongoose';


const AlbumSchema = new mongoose.Schema({
  name: String,
  artist: String,
  spotifyId: String,
  images: String,
  durationMs: Number,
  // Aggiungi altri campi se necessario
});

const UserSchema = new mongoose.Schema({
  username: String,
  albums: [AlbumSchema],
  // Altri campi dell'utente...
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;