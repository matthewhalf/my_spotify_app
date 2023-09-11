import AllAlbumListened from "../components/AllAlbumsListened"
import { useSession } from "next-auth/react";
import BottomNavbar from "../components/BottomNavbar";


const albums = () => {
const { data: session } = useSession();

if (!session || !session.user) {
    return <div>Caricamento...</div>; // Mostra un loader o un messaggio mentre attendi che la sessione venga caricata
  }

  return (
    <>
    <div className="bg-gradient-to-b from-green-500 to-black h-[20vh]">
      
        <AllAlbumListened  username={session.user.username} />

        <div className="h-28"></div>

        <BottomNavbar />
    </div>
    </>
  )
}

export default albums