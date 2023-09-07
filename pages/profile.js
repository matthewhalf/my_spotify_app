import ProfileData from "../components/ProfileData"
import BottomNavbar from "../components/BottomNavbar"
import { signOut } from "next-auth/react"
import AlbumListened from '../components/AlbumListened';
import { useSession } from "next-auth/react";

const profile = () => {
  const { data: session } = useSession();

  if (!session || !session.user) {
    return <div>Caricamento...</div>; // Mostra un loader o un messaggio mentre attendi che la sessione venga caricata
  }
  return (
    <div>
        <ProfileData />

        <AlbumListened username={session.user.username} />

        <BottomNavbar />
    </div>
  )
}

export default profile