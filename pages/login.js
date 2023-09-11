import { getProviders, signIn } from "next-auth/react"

const login = ({providers}) => {
  return (
    <>
      <div className="relative min-h-screen">
        <img src="https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80" alt="" className="absolute h-[100vh] object-cover" />

        <div className="absolute inset-0 bg-black opacity-50 z-15 w-full"></div>

        <div className="absolute text-center top-[30%] w-[80%]  left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <h3 className="mb-3 w-full text-xl">Esplora i tuoi artisti preferiti, scopri le tue canzoni più amate e personalizza il tuo profilo.</h3>
        </div>

        <div className="absolute z-20 top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="px-3 py-3 bg-green-500 text-black rounded-xl font-bold"
                onClick={() => signIn(provider.id, {callbackUrl:"/"})}>
                Login with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute text-center bottom-0 bg-black p-2 opacity-50">
          <p className="mb-3 w-full text-xs">This application is independently developed and is not officially affiliated with, endorsed, or supported by Spotify. All trademarks and copyrights belong to their respective owners.</p>
      </div>
    </>
  );
}

export default login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
          providers  
        }
    }
}