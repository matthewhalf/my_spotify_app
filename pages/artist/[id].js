import { useRouter } from 'next/router';
import useSpotify from '../../hooks/useSpotify';
import { useEffect, useState } from 'react';
import BottomNavbar from '../../components/BottomNavbar';

const ArtistDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    
    const spotifyApi = useSpotify();
    const [artistDetails, setArtistDetails] = useState([]);
    const [myArtistTopTracks, setMyArtistTopTracks] = useState([]);


    useEffect(() => {
        if(id) {
            // Qui puoi fare la tua chiamata API per ottenere i dettagli dell'artista
            spotifyApi.getArtist(id)
            .then(function(data) {
                setArtistDetails(data.body);
            }, function(err) {
                console.error(err);
            });
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            spotifyApi.getMyTopTracks()
            .then(function(data) {
                console.log("Top Tracks:", data.body.items);  // Stampa tutti i brani per vedere la struttura
    
                // Filtra i brani per mostrare solo quelli dell'artista in questione
                const filteredTracks = data.body.items.filter(track => {
                    return track.artists.some(artist => {
                        return artist.id === id; // dovrebbe corrispondere all'ID dell'artista
                    });
                });
                console.log("Filtered Tracks:", filteredTracks);
                setMyArtistTopTracks(filteredTracks);
            }, function(err) {
                console.log('Something went wrong!', err);
            });
        }
    }, [id, spotifyApi]);
    


    return (
        <>
        <div className="bg-gradient-to-b from-orange-400 to-black min-h-[45vh]">

            <div className="text-center flex flex-col relative">
            {
                // Controlla se profile.images esiste e ha almeno due elementi
                artistDetails.images && artistDetails.images.length > 1 ? 
                <img src={artistDetails.images[0].url} alt="" className="h-[37vh] object-cover"/> : 
                null // puoi mostrare un'immagine di fallback o null se non vuoi mostrare nulla
            }
                <h2 className="text-white text-5xl mt-5 absolute bottom-3 left-3 font-bold">{artistDetails.name}</h2><br />
            </div>

        </div>

        <div className='mx-3'>
            <h3 className='mb-5'>Le tue canzoni più ascoltate dell'artista</h3>
            {myArtistTopTracks.map((track, order) =>(
                <div className="text-xs flex gap-3 mb-5" key={track.id}>
                    <p>{order + 1}</p>
                    <img 
                        src={track.album.images[0].url} 
                        alt={`Album cover for ${track.name}`} 
                        className="w-10 rounded" 
                    />
                    <p>{track.name}</p>
                </div>
            ))}
        </div>

        <BottomNavbar />
        </>
    );
}

export default ArtistDetail;
