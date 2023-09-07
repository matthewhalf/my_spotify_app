import { useEffect, useState } from 'react';

const AlbumListened = ({ username }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const response = await fetch(`/api/getUserAlbums?username=${username}`);
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    }

    fetchAlbums();
  }, [username]);

  return (
    <div>
      <h2 className='text-2xl mb-5 mx-3'>Album ascoltati</h2>
      <div className='flex flex-nowrap overflow-x-auto no-scrollbar mx-3 mt-3 relative'>
        {albums.map(album => (
          <div key={album.spotifyId} className='flex-none w-1/3 pr-4'>
            <img src={album.images} alt="" className='rounded-xl h-32 object-cover' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumListened;
