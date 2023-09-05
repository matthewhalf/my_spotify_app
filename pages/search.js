import BottomNavbar from "../components/BottomNavbar"


const search = () => {
  return (
    <>
    <div className="flex flex-col justify-start bg-gradient-to-b from-orange-400 to-black min-h-[30vh] px-3">
        <div>
            <h2 className="text-3xl mt-10 mb-3">Cerca</h2>
            <input className="px-2 py-4 text-black rounded-xl outline-none w-full"
            type="text" 
            placeholder="Cerca album, canzone..." ></input>
        </div>
        <div className="mt-[40vh]">
            <h3 className="text-center text-xl">Cerca le tue canzoni, album preferiti e aggiungile al tuo profilo</h3>
        </div>
    </div>

    <BottomNavbar />
    </>
  )
}

export default search