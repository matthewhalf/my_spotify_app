import { useRouter } from 'next/router';
import useSpotify from '../../hooks/useSpotify';
import { useEffect, useState } from 'react';
import BottomNavbar from '../../components/BottomNavbar';

const AlbumDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    
    const spotifyApi = useSpotify();
    const [albumDetails, setAlbumDetails] = useState([]);

    useEffect(() => {
        if(id) {
            // Qui puoi fare la tua chiamata API per ottenere i dettagli dell'artista
            spotifyApi.getAlbum(id)
            .then(function(data) {
                setAlbumDetails(data.body);
            }, function(err) {
                console.error(err);
            });
        }
    }, [id]);
    

    return (
        <>
        <div className="bg-gradient-to-b from-orange-400 to-black h-[35vh]">
            <div className='w-[60%] text-center m-auto pt-8'>
                {
                    // Controlla se profile.images esiste e ha almeno due elementi
                    albumDetails.images && albumDetails.images.length > 1 ? 
                    <img src={albumDetails.images[0].url} alt="" className="object-contain w-[100%]"/> : 
                    null // puoi mostrare un'immagine di fallback o null se non vuoi mostrare nulla
                }
                </div>

            <div className='mx-3 mb-5'>
                <h2 className="text-white text-3xl mt-5 left-3 font-bold">{albumDetails.name}</h2>
                <div className='flex gap-3 items-center'>
                    <p className='text-sm'>{albumDetails?.artists?.[0]?.name || 'Artist Name Not Available'} -</p>
                    <p className='text-gray-600 text-xs'>{albumDetails.release_date}</p>
                </div>
            </div>
            <ul className='mx-3 pb-28'>
            {albumDetails && albumDetails.tracks && albumDetails.tracks.items.map((track) =>(
                <li key={track.id} className='py-2'>
                    <img src="" alt="" />
                    <p>{track.name}</p>
                    <p className='text-xs text-gray-600'>{track.artists[0].name}</p>
                </li>
            ))}
            </ul>

        </div>

        <BottomNavbar />
        </>
    );
}

export default AlbumDetail;
