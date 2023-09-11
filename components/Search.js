import { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import CheckIcon from '@mui/icons-material/Check';

const Search = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    try {
      const data = await spotifyApi.searchAlbums(query);
      const initialResults = data.body.albums.items;
      setResults(initialResults);

      // Verifica se gli album sono già stati salvati
      if (session && session.user) {
        const updatedResults = await Promise.all(
          initialResults.map(async album => {
            const res = await fetch(`/api/isAlbumSaved?username=${session.user.username}&albumId=${album.id}`);
            const data = await res.json();
            return { ...album, isSaved: data.isSaved };
          })
        );
        setResults(updatedResults);
      }
      
      setError(null);
    } catch (err) {
      setError(err);
      setResults([]);
    }
  };

  const handleSaveAlbum = async (album) => {
    if (!session || !session.user || !session.user.username) {
      alert('Devi effettuare l\'accesso per salvare un album.');
      return;
    }

    try {
      // Prima ottieni i dettagli completi dell'album per avere le tracce
      const albumDetails = await spotifyApi.getAlbum(album.id);
      const tracks = albumDetails.body.tracks.items;

      // Calcola la durata totale dell'album sommando la durata di tutte le tracce.
      const totalDurationMs = tracks.reduce((sum, track) => sum + track.duration_ms, 0);

      const albumData = {
        name: album.name,
        artist: album.artists[0].name,
        spotifyId: album.id,
        images: album.images[0].url,
        durationMs: totalDurationMs
      };

      // Qui la logica per salvare l'album nel database...
      const response = await fetch('/api/addAlbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: session.user.username,
          album: albumData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Album salvato con successo!');
      } else {
        alert(`Errore: ${data.error}`);
      }

    } catch (error) {
      console.error("Errore nel salvare l'album:", error.message);
      alert('Si è verificato un errore durante il salvataggio dell’album. Riprova.');
    }
  };
  
  

  return (
    <div className="flex flex-col justify-start bg-gradient-to-b from-green-500 to-black h-[25vh] px-3">
      <div>
        <h2 className="text-3xl mt-10 mb-3">Cerca</h2>
        <input
          className="px-2 py-4 text-black rounded-xl outline-none w-full"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Cerca album..."
        ></input>
      </div>
      {results.length > 0 && (
      <div className="mt-5">
        <h3 className="text-center text-xl mb-3">Risultati</h3>
        <ul>
          {results.slice(0,6).map((album, index) => (
            <li key={index} className="flex gap-3 items-center mb-5 bg-[#191919] p-3 justify-between rounded-lg" style={{ background: album.isSaved ? '#157A3A' : '#191919' }}>
              <div className="flex items-center gap-3 w-[75%]">
                <img src={album.images[0].url} alt="" className="w-10 h-10 rounded-lg" />
                <p className="text-base truncate">
                  {album.name} 
                  <br />
                  <span className="text-sm text-gray-600" style={{ color: album.isSaved ? '#fff' : 'currentColor'}}>{album.artists[0].name}</span>
                </p>
              </div>
              <button onClick={() => handleSaveAlbum(album)} className="border-[3px] border-solid" style={{ backgroundColor: album.isSaved ? '#379C63' : '#000'}}>
                <CheckIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
      )}
      {error && <p className="text-black">Nessun risultato, prova a ricercare</p>}
      <div className="mt-[40vh]">
        <h3 className="text-center text-xl">
          Cerca gli album che hai ascoltato e aggiungili al tuo profilo
        </h3>
      </div>
    </div>
  );
};

export default Search;
