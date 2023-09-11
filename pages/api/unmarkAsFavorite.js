import dbConnect from '../../lib/db';
import User from '../../lib/model';


export default async (req, res) => {
    if (req.method === 'PUT') {
      const { spotifyId, username } = req.body;

      if (!spotifyId || !username) {
        return res.status(400).send({ error: 'Both spotifyId and username are required.' });
      }
  
      await dbConnect();
      const user = await User.findOne({ username });
     
      if (!user) {
        return res.status(404).send({ error: 'User not found.' });
      }
  
      const albumToUnmark = user.albums.find(album => album.spotifyId === spotifyId);
      if (!albumToUnmark) {
          return res.status(404).send({ error: 'Album not found for this user.' });
      }
      albumToUnmark.isFavorite = false;
  
      await user.save();
      return res.status(200).send({ success: true });
    }
  };
  