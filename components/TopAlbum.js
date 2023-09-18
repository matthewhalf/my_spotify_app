import { useEffect, useState } from 'react';

const TopAlbum = ({ username }) => {
  const [favoriteAlbums, setFavoriteAlbums] = useState([]);

  useEffect(() => {
    async function fetchFavoriteAlbums() {
      try {
        const response = await fetch(`/api/getUserAlbums?username=${username}`);
        const data = await response.json();
        // Filtra solo gli album marcati come preferiti
        const favoriteAlbums = data.filter(album => album.isFavorite).slice(0,3);
        setFavoriteAlbums(favoriteAlbums);
      } catch (error) {
        console.error('Failed to fetch favorite albums:', error);
      }
    }

    fetchFavoriteAlbums();
  }, [username]);

  
  return (
    <>
      <div className='mx-3 mt-5'>
        <h3 className='text-2xl'>La tua top 3 album</h3>
      </div>
      {favoriteAlbums.length === 0 ? (
        <p className="mx-3 pb-5 pt-2 text-gray-600">Non ci sono album salvati nella tua top 3, aggiungi i tuoi preferiti dalla lista degli album ascoltati</p>
      ) : (
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar mx-3 mt-2 relative gap-3">
          {favoriteAlbums.map((album) => (
            <div key={album.spotifyId}>
              <img src={album.images} alt="" className={`rounded-xl object-cover h-36`} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TopAlbum;

