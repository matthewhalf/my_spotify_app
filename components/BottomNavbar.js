import Link from "next/link";
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const BottomNavbar = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <>
      <div className="flex gap-3 bg-[#191919] fixed bottom-0 p-4 mb-4 w-[90%] h-[60px] justify-between text-center left-[5%] rounded-3xl">
        <Link href="/search">
          <SearchIcon className={`cursor-pointer text-2xl ${currentPath === '/search' ? 'text-green-500' : ''}`} />
        </Link>
        <Link href="/">
          <HomeIcon className={`cursor-pointer text-2xl ${currentPath === '/' ? 'text-green-500' : ''}`} />
        </Link>
        <Link href="/profile">
          <AccountCircleIcon className={`cursor-pointer text-2xl ${currentPath === '/profile' ? 'text-green-500' : ''}`} />
        </Link>
      </div>
    </>
  )
}

export default BottomNavbar;
