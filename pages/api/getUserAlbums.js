import dbConnect from '../../lib/db';
import User from '../../lib/model';

export default async (req, res) => {
  await dbConnect();

  const { username } = req.query;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }

  res.status(200).send(user.albums);
}

