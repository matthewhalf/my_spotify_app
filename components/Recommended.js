import { useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react";


const Recommended = () => {
    
    const {data: session, status} = useSession();
    const spotifyApi = useSpotify();
    const [followedArtists, setfollowedArtists] = useState({});

    useEffect(() => {
        spotifyApi.getFollowedArtists()
        .then(function(data) {
            setfollowedArtists(data.body.artists);
        }, function(err) {
          console.log('Something went wrong!', err);
        });
    }, [session, spotifyApi]);

    console.log(followedArtists)
  return (
    <>
        <h2 className="text-3xl mx-3 pt-5 ">{ new Date().getHours() < 12 ? "Buongiorno" : "Buonasera" }</h2>
        <h3 className="text-l mt-2 mx-3 text-gray-200">Consigliati per te della settimana</h3>

        <div className="grid grid-cols-2 mt-3">
        {followedArtists.map(followedArtist => (
        <div className="mx-3 my-1 flex bg-[#191919] gap-4 items-center rounded-lg p-1" key={followedArtist.id}>
            <img 
                src={followedArtist.album.images[0].url} 
                alt={`Album cover for ${followedArtist.name}`} 
                className="h-[50px] rounded" 
            />
            <p className="text-center text-white my-3 text-[14px] truncate">
                {followedArtist.name}
            </p> 
        </div>
        ))}
        </div>
    </>
  )
}

export default Recommended