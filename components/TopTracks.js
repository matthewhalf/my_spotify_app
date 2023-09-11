import { useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react";


const TopTracks = () => {
    
    const {data: session, status} = useSession();
    const spotifyApi = useSpotify();
    const [topTracks, setTopTracks] = useState([]);


    useEffect(() => {
        spotifyApi.getMyTopTracks({ time_range: 'short_term' })
        .then(function(data) {
            setTopTracks(data.body.items);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    }, [session, spotifyApi])

  return (
    <>
    <h3 className="text-2xl mx-3">Canzoni più ascoltate</h3>

        <div className="flex flex-nowrap overflow-x-auto no-scrollbar mx-3 mt-3 relative mb-5">
        {topTracks.map((topTrack, order) => (
        <div className="flex-none w-1/3 pr-4 relative" key={topTrack.id}>
            <p className="absolute bottom-[30%] ml-2 text-xl font-bold z-10 text-green-500">{order + 1}° </p>

            <img 
                src={topTrack.album.images[0].url} 
                alt={`Album cover for ${topTrack.name}`} 
                className="w-full h-36 object-cover rounded-xl" 
            />
            <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-transparent to-black rounded-xl"></div>

            <p className="text-center cursor-pointer text-white truncate my-3 z-10">
                {topTrack.name} <br /> <span className="text-gray-600 text-xs">{topTrack.artists[0].name}</span> 
            </p>
            </div>
            ))}
        </div>
    </>
  )
}

export default TopTracks