import { useSession } from "next-auth/react"
import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from "react";


const Recommended = () => {
    
    const {data: session, status} = useSession();
    const spotifyApi = useSpotify();
    const [recommended, setRecommended] = useState({});


    useEffect(() => {
        const lastGenerated = localStorage.getItem('lastGenerated');
        const storedRecommendations = localStorage.getItem('recommendations');
    
        if (storedRecommendations && lastGenerated && Date.now() - new Date(lastGenerated).getTime() < 7 * 24 * 60 * 60 * 1000) {
            setRecommended(JSON.parse(storedRecommendations));
        } else {
            spotifyApi.getRecommendations({
                min_energy: 0.4,
                seed_artists: ['1AgAVqo74e2q4FVvg0xpT7', '1MRiIeZbc0cRuxOafDUCtH'],
                min_popularity: 50
            })
            .then(function(data) {
                setRecommended(data.body);
                localStorage.setItem('recommendations', JSON.stringify(data.body));
                localStorage.setItem('lastGenerated', new Date().toISOString());
            }, function(err) {
                console.log("Something went wrong!", err);
            });
        }
    }, [session, spotifyApi]);
    


  return (
    <>
        <h2 className="text-3xl mx-3 pt-5 ">Buonasera</h2>
        <h3 className="text-l mt-2 mx-3">Consigliati per te della settimana</h3>

        <div className="grid grid-cols-2 mt-3">
        {recommended.tracks && recommended.tracks.slice(0, 6).map(recommend => (
        <div className="mx-3 my-1 flex bg-[#191414] gap-4 items-center" key={recommend.id}>
            <img 
                src={recommend.album.images[0].url} 
                alt={`Album cover for ${recommend.name}`} 
                className="h-[50px] rounded" 
            />
            <p className="text-center cursor-pointer text-white my-3 text-[14px] truncate">
                {recommend.name}
            </p> 
        </div>
        ))}
        </div>
    </>
  )
}

export default Recommended