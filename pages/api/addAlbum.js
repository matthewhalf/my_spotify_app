import { addAlbumToUser } from '../../lib/userActions';

export default async (req, res) => {
  console.log("Richiesta ricevuta all'endpoint /api/addAlbum"); // Aggiunto per verificare se l'endpoint viene raggiunto

  if (req.method === 'POST') {
    try {
      const { username, album } = req.body;

      // Controllo per vedere se abbiamo i dati necessari nel corpo della richiesta
      if (!username || !album) {
        console.error('Dati mancanti nella richiesta:', req.body); 
        return res.status(400).send({ error: 'Dati mancanti' });
      }
      await addAlbumToUser(username, album);

      return res.status(200).send({ success: true });

    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  } else {
    return res.status(405).send({ error: 'Method not allowed' });
  }
}

