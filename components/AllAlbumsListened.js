import { useEffect, useState } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Link from 'next/link';

const AllAlbumListened = ({ username }) => {
  const [allAlbums, setAllAlbums] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const response = await fetch(`/api/getUserAlbums?username=${username}`);
        const data = await response.json();
        const favorites = data.filter(album => album.isFavorite).length;
        setFavoriteCount(favorites);
        setAllAlbums(data.reverse());
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    }

    fetchAlbums();
  }, [username]);

  const handleRemove = async (spotifyId) => {
    try {
      const response = await fetch('/api/removeAlbum', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,   // Assicurati che `username` sia disponibile in questo componente
          spotifyId: spotifyId,
        }),
      });

      if (response.ok) {
        setAllAlbums(prevAlbums => prevAlbums.filter(album => album.spotifyId !== spotifyId));
      } else {
        console.error('Failed to remove album');
      }
    } catch (error) {
      console.error('Error while removing album:', error);
    }
  };

  const handleFavorite = async (spotifyId) => {
    const album = allAlbums.find(album => album.spotifyId === spotifyId);

    // URL dell'endpoint e nuovo stato in base all'attuale stato di "preferito"
    const endpointURL = album.isFavorite ? '/api/unmarkAsFavorite' : '/api/markAsFavorite';
    const newFavoriteState = !album.isFavorite;

    if (!album.isFavorite && favoriteCount >= 3) {
      alert('Puoi selezionare solo 3 album come preferiti!');
      return;
    }

    try {
      const response = await fetch(endpointURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          spotifyId: spotifyId,
        }),
      });

      if (response.ok) {
        setAllAlbums(prevAlbums => prevAlbums.map(album => {
          if (album.spotifyId === spotifyId) return { ...album, isFavorite: newFavoriteState };
          return album;
        }));
        setFavoriteCount(prevCount => newFavoriteState ? prevCount + 1 : prevCount - 1);
      } else {
        console.error('Failed to update favorite status');
      }
    } catch (error) {
      console.error('Error while updating favorite status:', error);
    }
  };
  

  return (
    <div>
      <div className='flex justify-between mx-3 pt-10'>
        <h3 className='text-2xl mb-5 '>Tutti gli album ascoltati</h3>
        <button className='text-xs text-gray-200' onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Fatto' : 'Modifica'}</button>
      </div>
      <div className='grid grid-cols-3 gap-2 mx-3'>
        {allAlbums.map(allAlbum => (
          isEditing ? (
            <div key={allAlbum.spotifyId} className='relative'>
              <img src={allAlbum.images} alt="" className='rounded-xl h-36 object-cover' />
              <div className='flex gap-3'>
                <button 
                  className="absolute top-1 right-0 bg-red-600 rounded-full p-[1px]" 
                  onClick={() => handleRemove(allAlbum.spotifyId)}>
                  <RemoveCircleIcon />
                </button>
                <button 
                  className="absolute top-1 left-0 bg-yellow-500 rounded-full p-[1px]" 
                  onClick={() => handleFavorite(allAlbum.spotifyId)}
                  disabled={favoriteCount >= 3 && !allAlbum.isFavorite}>
                  {allAlbum.isFavorite ? <StarIcon /> : <StarBorderIcon />}
                </button>
              </div>
            </div>
          ) : (
            <Link key={allAlbum.spotifyId}  href={`/album/${allAlbum.spotifyId}`}>
              <a className='relative'>
                <img src={allAlbum.images} alt="" className='rounded-xl h-36 object-cover' />
              </a>
            </Link>
          )
        ))}
      </div>
    </div>
  );
  }

export default AllAlbumListened
