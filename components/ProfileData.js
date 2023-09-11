import { useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Link from "next/link";

const ProfileData = () => {

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
    <div className="bg-gradient-to-b from-green-500 to-black min-h-[26vh] relative">

        <Link href="/admin">
            <div className="absolute top-5 right-5 cursor-pointer"><MoreHorizIcon fontSize="large" /></div>
        </Link>

        <div className="text-center flex flex-col pt-10">
            {
                // Controlla se profile.images esiste e ha almeno due elementi
                profile.images && profile.images.length > 1 ? 
                <img src={profile.images[1].url} alt="" className="rounded-full w-24 h-24 m-auto p-1 bg-gradient-to-l from-green-300 to-green-800 shadow-lg"/> : 
                null // puoi mostrare un'immagine di fallback o null se non vuoi mostrare nulla
            }
            <h2 className="text-white text-3xl mt-5">{profile.display_name}</h2><br />
        </div>


    </div>
    </>  
  )
}

export default ProfileData