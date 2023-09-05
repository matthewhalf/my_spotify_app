import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";


const Center = () => {
    const {data: session, status} = useSession();
    const spotifyApi = useSpotify();

    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);


  

  useEffect(() => {
    if (spotifyApi.getAccessToken) {

        spotifyApi.getUserPlaylists().then(function(data) {
          setPlaylists(data.body.items)
        }, function(err) {
        console.log('Something went wrong!', err);
        });
      }
  }, [session, spotifyApi]); 



  return (
    <>
    <div className="w-[40%]">
      <div className="flex justify-start gap-3 items-center bg-red-300 opacity-90 hover:opacity-80 p-1 pr-2 cursor-pointer rounded-full w-[50%]">
          <img src={session?.user.image} alt="" className="rounded-full"/>
          <h2 className="text-black font-bold">{session?.user.name}</h2><br />
      </div>

      <div>
          <h3 className="font-bold text-xl mb-5">Le tue playlists</h3>
             {playlists.map(playlist => (
                <p className="cursor-pointer text-gray-700 my-3 rounded-full hover:text-gray-400" key={playlist.id}
                onClick={() => setPlaylistId(playlist.id)}>
                  {playlist.name}
                </p>
           ))}
      </div>
    
    </div>
        
    </>
  )
}

export default Center