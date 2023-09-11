import dbConnect from '../../lib/db';
import User from '../../lib/model';

export default async (req, res) => {
  if (req.method === 'DELETE') {
    const { username } = req.body;

    if (!username) {
      return res.status(400).send({ error: 'Username is required.' });
    }

    try {
      await dbConnect();

      const result = await User.deleteOne({ username: username });
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: 'User not found.' });
      }

      return res.status(200).send({ success: true });

    } catch (error) {
      return res.status(500).send({ error: 'Internal server error.' });
    }

  } else {
    return res.status(405).send({ error: 'Method not allowed.' });
  }
};
