import { getSession,useSession } from 'next-auth/react'
import Profile from '../components/Profile';
import TopArtists from '../components/TopArtists';
import TopTracks from '../components/TopTracks';
import BottomNavbar from '../components/BottomNavbar';

export default function Home() {

  const {data: session, status} = useSession();

  return (
    <main>
  
      <Profile />
      <TopArtists />
      <TopTracks />

      <BottomNavbar />
        
    </main>
  )
}


export async function getServerSideProps(context){
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
