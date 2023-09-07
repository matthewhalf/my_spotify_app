import dbConnect from './db';
import User from './model';


export async function addAlbumToUser(username, album) {
  await dbConnect();

 let user = await User.findOne({ username });

  if (!user) {
    user = new User({ username, albums: [] });
  }

  user.albums.push(album);
  await user.save();

  console.log(album)
}


