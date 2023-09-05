import Link from "next/link"
import { signOut } from "next-auth/react"

const BottomNavbar = () => {
  return (
    <div className="flex gap-3 bg-[#191414] fixed bottom-0 p-5 w-full m-auto justify-between text-center">
        <Link href="/search">
            <p className="cursor-pointer">Ricerca</p>
        </Link>
        <Link href="/">
            <p className="cursor-pointer">Home</p>
        </Link>
        <div>
            <button className=''  
            onClick={() => signOut()}
            >Logout</button>
        </div>
    </div>
  )
}

export default BottomNavbar