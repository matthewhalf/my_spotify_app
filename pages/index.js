import { getSession,useSession } from 'next-auth/react'
import TopArtists from '../components/TopArtists';
import TopTracks from '../components/TopTracks';
import BottomNavbar from '../components/BottomNavbar';
import Recommended from '../components/Recommended';

export default function Home() {

  const {data: session, status} = useSession();

  return (
    <main>
  
      <Recommended />
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
