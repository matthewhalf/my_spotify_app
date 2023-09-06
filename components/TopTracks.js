import { useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react";


const TopTracks = () => {
    
    const {data: session, status} = useSession();
    const spotifyApi = useSpotify();
    const [topTracks, setTopTracks] = useState([]);


    useEffect(() =>{
        spotifyApi.getMyTopTracks()
        .then(function(data) {
            setTopTracks(data.body.items);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    }, [session, spotifyApi ])

  return (
    <>
    <h3 className="text-2xl mt-5 mx-3">Top Tracks</h3>

    <div className="flex flex-nowrap overflow-x-auto mx-3 mt-3">
    {topTracks.map(topTrack => (
    <div className="flex-none w-1/3 pr-4" key={topTrack.id}>
        <img 
            src={topTrack.album.images[0].url} 
            alt={`Album cover for ${topTrack.name}`} 
            className="w-full rounded" 
        />
        <p className="text-center cursor-pointer text-white truncate my-3">
            {topTrack.name}
        </p>
    </div>
    ))}
    </div>

    </>
  )
}

export default TopTracks