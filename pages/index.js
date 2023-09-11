import { getSession,useSession } from 'next-auth/react'
import TopArtists from '../components/TopArtists';
import TopTracks from '../components/TopTracks';
import BottomNavbar from '../components/BottomNavbar';
import Recommended from '../components/Recommended';

export default function Home() {

  const {data: session, status} = useSession();

  return (
    <main className='bg-gradient-to-b from-green-500 to-black h-[20vh] pb-24'>
  
      <Recommended />
      <TopArtists />
      <TopTracks />

      <div className="h-10"></div>

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
