import { playlistState } from "../atoms/playlistAtom"
import { useRecoilValue } from "recoil"


const Songs = () => {
  
 const playlist = useRecoilValue(playlistState);

  return (
    <div className="text-white cursor-pointer">
        {playlist?.tracks.items.map((track) => (
            <div>{track.track.name}</div>
        ))};
    </div>
  )
}

export default Songs;