import { useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react";


const TopArtists = () => {
    
    const {data: session, status} = useSession();
    const spotifyApi = useSpotify();
    const [topArtists, setTopArtists] = useState([]);


    useEffect(() =>{
        spotifyApi.getMyTopArtists({ time_range: 'short_term' })
        .then(function(data) {
            setTopArtists(data.body.items);
        }, function(err) {
          console.log('Something went wrong!', err);
        });
    }, [session, spotifyApi ])

  return (
    <>
    <h3 className="text-2xl mt-5 mx-3">Artisti più ascoltati</h3>

    <div className="flex flex-nowrap overflow-x-auto no-scrollbar mx-3 mt-3 relative">
        {topArtists.map((topArtist, order) => (
        <div className="flex-none w-1/3 pr-4 relative" key={topArtist.id}>
            <div 
                className="absolute bottom-[35%] ml-2 text-2xl font-bold z-10 text-green-500" 
            >
                {order + 1}° 
            </div>
            <img src={topArtist.images[0]?.url} alt="" className="w-full h-36 object-cover rounded-xl" />
            <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-transparent to-black rounded-xl"></div>
        
            <p className="text-center cursor-pointer text-gray-600 my-3">
              {topArtist.name}
            </p>
        </div>
        ))}
    </div>

    </>
  )
}

export default TopArtists