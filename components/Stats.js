import { useEffect, useState } from 'react';

const Stats = ({ username }) => {

  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const response = await fetch(`/api/getUserAlbums?username=${username}`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      }
    }

    fetchAlbums();
  }, [username]);

  return (
    <div className='mt-2 mx-3'>
      <h3 className='text-2xl mb-3 '>Statistiche</h3>
      <div className='flex justify-between'>
        <div className='bg-[#191919] p-3 rounded-lg text-center'>
          <h3 className='text-sm mb-2 '>Durata totale album</h3>
          <p className='text-lg font-bold text-green-500'>
            {Array.isArray(stats) ? (stats.reduce((sum, stat) => sum + stat.durationMs, 0) / 3600000).toFixed(2) : "0.00"} ore
          </p>
        </div>
        <div className='bg-[#191919] p-3 rounded-lg text-center'>
          <h3 className='text-sm mb-2 '>Totale album ascoltati</h3>
          <p className='text-lg font-bold text-green-500'>{stats.length} album</p>   
        </div>
      </div>
    </div>
  )
}

export default Stats