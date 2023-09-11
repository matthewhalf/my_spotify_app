import dbConnect from '../../lib/db';
import User from '../../lib/model';

export default async (req, res) => {
  if (req.method === 'DELETE') {
    const { username, spotifyId } = req.body;  // Estrai dal corpo della richiesta

    if (!spotifyId || !username) {
      return res.status(400).send({ error: 'Both username and spotifyId are required.' });
    }

    try {
      await dbConnect();

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).send({ error: 'User not found.' });
      }

      user.albums = user.albums.filter(album => album.spotifyId !== spotifyId);
      await user.save();

      return res.status(200).send({ success: true });

    } catch (error) {
      return res.status(500).send({ error: 'Internal server error.' });
    }

  } else {
    return res.status(405).send({ error: 'Method not allowed.' });
  }
};
