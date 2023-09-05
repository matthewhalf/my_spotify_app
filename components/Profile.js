import { signOut, useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react";

const Profile = () => {

    const {data: session, status} = useSession();
    const spotifyApi = useSpotify();
    const [profile, setProfile] = useState({});

    useEffect(() =>{
        spotifyApi.getMe()
        .then(function(data) {
            setProfile(data.body);
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    }, [session, spotifyApi ])

  return (
    <>

    <div className="bg-gradient-to-b from-orange-400 to-black min-h-[30vh] ">
        
        <div className='text-right'>
            <button className='text-white font-light bg-[#191414] m-2 px-2 py-2 rounded-full text-s'  
        onClick={() => signOut()}
        >Log out</button>
        </div>

        <div className="text-center flex flex-col">
            {
                // Controlla se profile.images esiste e ha almeno due elementi
                profile.images && profile.images.length > 1 ? 
                <img src={profile.images[1].url} alt="" className="rounded-full w-24 h-24 m-auto"/> : 
                null // puoi mostrare un'immagine di fallback o null se non vuoi mostrare nulla
            }
            <h2 className="text-white text-3xl mt-5">{profile.display_name}</h2><br />
        </div>


    </div>

    </>  
  )
}

export default Profile