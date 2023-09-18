import { useEffect, useState } from 'react';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';

const AlbumListened = ({ username }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const response = await fetch(`/api/getUserAlbums?username=${username}`);
        const data = await response.json();
        setAlbums(data.reverse());
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    }

    fetchAlbums();
  }, [username]);

  return (
    <div>
      <div className='flex justify-between mx-3 mt-3 items-center'>
        <h3 className='text-2xl'>Album ascoltati</h3>
        <Link href="/albums">
            <p className="cursor-pointer text-xs text-gray-600">Guarda tutti</p>
        </Link>
      </div>

      {albums.length === 0 ? (
        <div className="mx-3 mt-2 grid grid-cols-3 gap-3">
          <div className='h-36 bg-[#191919] rounded-xl text-center flex flex-col justify-center items-center'><AddIcon fontSize='large'/></div>
          <div className='h-36 bg-[#191919] rounded-xl text-center flex flex-col justify-center items-center'><AddIcon fontSize='large'/></div>
          <div className='h-36 bg-[#191919] rounded-xl text-center flex flex-col justify-center items-center'><AddIcon fontSize='large'/></div>
        </div>
      ) : (
        <div className='flex flex-nowrap overflow-x-auto no-scrollbar mx-3 mt-2 relative gap-3'>
          {albums.slice(0,8).map(album => (
            <Link key={album.spotifyId}  href={`/album/${album.spotifyId}`}>
              <a className='flex-none w-1/3'>
                  <img src={album.images} alt="" className='rounded-xl h-36 object-cover' />
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumListened;

