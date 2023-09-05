import { getProviders, signIn } from "next-auth/react"

const login = ({providers}) => {
  return (
    <div className="flex justify-center min-h-screen items-center">
        {Object.values(providers).map((provider) => (
            <div key={provider.name}>
                <button className="bg-green-400 text-black rounded-full font-bold  p-4"
                onClick={() => signIn(provider.id, {callbackUrl:"/"})}>
                    Login with {provider.name}
                </button>
            </div>
        ))}
    </div>
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