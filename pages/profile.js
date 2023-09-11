import ProfileData from "../components/ProfileData"
import BottomNavbar from "../components/BottomNavbar"
import AlbumListened from '../components/AlbumListened';
import { useSession } from "next-auth/react";
import Stats from "../components/Stats";
import TopAlbum from "../components/TopAlbum";

const profile = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return <div>Caricamento...</div>; // Mostra un loader o un messaggio mentre attendi che la sessione venga caricata
  }
  return (
    <div className="pb-24">
        <ProfileData />

        <Stats  username={session.user.username} />

        <TopAlbum username={session.user.username} />

        <AlbumListened username={session.user.username} />


        <BottomNavbar />
    </div>
  )
}

export default profile