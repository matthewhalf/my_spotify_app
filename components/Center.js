import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const Center = () => {

const {data: session, status} = useSession();
const spotifyApi = useSpotify();


const playlistId = useRecoilValue(playlistIdState);
const [playlist, setPlaylist] = useRecoilState(playlistState);

useEffect(() =>{
    spotifyApi.getPlaylist(playlistId).then((data) =>{
        setPlaylist(data.body);
    }).catch((err) => console.log(err));
}, [spotifyApi, playlistId])

console.log(playlist)


  return (
    <>
    <div className="flex flex-col">
        <div className="flex gap-3">
            <img src={playlist?.images?.[0].url} alt="" className="w-44 h-44 shadow-xl" />

            <div>
                <p>PLAYLIST</p>
                <h2 className="text-2xl font-bold ">{playlist?.name}</h2>
            </div>
        </div>
        <div className="mt-10">
            <Songs />
        </div>
    </div>
    </>
  )
}

export default Center