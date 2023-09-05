import { useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react";
import Link from "next/link";


const TopArtists = () => {
    
    const {data: session, status} = useSession();
    const spotifyApi = useSpotify();
    const [topArtists, setTopArtists] = useState([]);


    useEffect(() =>{
        spotifyApi.getMyTopArtists()
        .then(function(data) {
            setTopArtists(data.body.items);
          console.log(topArtists);
        }, function(err) {
          console.log('Something went wrong!', err);
        });
    }, [session, spotifyApi ])

    console.log(topArtists)

  return (
    <>
    <h3 className="text-2xl mt-5 mx-3">Top Artists</h3>

    <div className="flex flex-nowrap overflow-x-auto mx-3 mt-3 relative">
        {topArtists.map((topArtist, order) => (
        <div className="flex-none w-1/3 pr-4" key={topArtist.id}>
          <Link href={`/artist/${topArtist.id}`}>
            <a>
              <p className="absolute bottom-[35%] ml-2 text-xl font-bold">{order + 1}</p>
              <img src={topArtist.images[0]?.url} alt="" className="w-full h-32 object-cover" />
              <p className="text-center cursor-pointer text-gray-700 my-3 rounded-full">
              {topArtist.name}
              </p>
            </a>
          </Link>
        </div>
        ))}
    </div>

    </>
  )
}

export default TopArtists