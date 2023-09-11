import dbConnect from '../../lib/db';
import User from '../../lib/model';

export default async (req, res) => {
  if (req.method === 'PUT') {
    const { spotifyId, username } = req.body;

    if (!spotifyId || !username) {
      return res.status(400).send({ error: 'Both spotifyId and username are required.' });
    }

    try {
      await dbConnect();

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).send({ error: 'User not found.' });
      }

      // Conta quanti album sono segnati come preferiti
      const favoriteCount = user.albums.filter(album => album.isFavorite).length;
      
      if (favoriteCount >= 3) {
        return res.status(400).send({ error: 'You can only mark up to 3 albums as favorites.' });
      }

      // Trova l'album e segnalo come preferito
      const indexToUpdate = user.albums.findIndex(album => album.spotifyId === spotifyId);
      if (indexToUpdate === -1) {
          return res.status(404).send({ error: 'Album not found for this user.' });
      }
      user.albums[indexToUpdate].isFavorite = true;

      await user.markModified('albums');  // Questa linea dice a Mongoose che l'array albums è stato modificato
      await user.save();


      return res.status(200).send({ success: true });

    } catch (error) {
      return res.status(500).send({ error: 'Internal server error.' });
    }

  } else {
    return res.status(405).send({ error: 'Method not allowed.' });
  }
};
