import { useSession } from "next-auth/react";
import ProfileData from "../components/ProfileData";
import BottomNavbar from "../components/BottomNavbar";
import { signOut } from "next-auth/react";

const admin = () => {
  const { data: session } = useSession();

  const handleDeleteData = async () => {
    if (!session || !session.user || !session.user.username) {
      console.error("No username found in session");
      return;
    }

    try {
      const response = await fetch('/api/deleteUserData', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: session.user.username }),
      });
  
      if (response.ok) {
        signOut();
      } else {
        const data = await response.json();
        console.error('Failed to delete user data:', data.error);
      }
    } catch (error) {
      console.error('Error while deleting user data:', error);
    }
  };

  return (
    <>
    <ProfileData />

    <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <button className="px-3 py-3 bg-green-500 text-black w-[60%] rounded-xl" onClick={() =>signOut()}>Log out</button>
        <button className="text-green-500" onClick={handleDeleteData}>Cancella i tuoi dati</button>
    </div>

    <div className="fixed bottom-20">
      <p className="text-gray-600 text-xs text-center">This application is independently developed and is not officially affiliated with, endorsed, or supported by Spotify. All trademarks and copyrights belong to their respective owners.</p>
    </div>

    <BottomNavbar />
    </>
  )
}

export default admin