import dbConnect from '../../lib/db';
import User from '../../lib/model';

export default async (req, res) => {
  if (req.method === 'GET') {
    const { username, albumId } = req.query;

    if (!username || !albumId) {
      return res.status(400).send({ error: 'Username and albumId are required.' });
    }

    try {
      await dbConnect();

      // Trova l'utente con l'username fornito
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).send({ error: 'User not found.' });
      }

      // Controlla se l'album è già presente nella lista degli album dell'utente
      const isSaved = user.albums.some(album => album.spotifyId === albumId);

      return res.status(200).send({ isSaved });

    } catch (error) {
      return res.status(500).send({ error: 'Internal server error.' });
    }

  } else {
    return res.status(405).send({ error: 'Method not allowed.' });
  }
};
