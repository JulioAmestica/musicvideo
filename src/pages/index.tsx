import { Inter } from 'next/font/google'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import PlayListsControl from './components/playlistscontrol';
import Loading from './components/loading';
import TracksControl from './components/trackscontrol'
import { sign } from 'crypto';
const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  const [list, setList] = useState();
  const [tracks, setTracks] = useState();
  const [selected, setSelected] = useState();
  const [isLoading, setLoading] = useState(false);

  const getMyPlaylists = async () => {
    try {
      // Indica que se está cargando la lista de reproducción
      setLoading(true);

      const res = await fetch(`${apiUrl}/playlists`);
      const { playlists } = await res.json();
      setList(playlists);

      // Indica que se ha terminado de cargar la lista de reproducción
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      // Manejo de errores
    }
  };

  const handleChange = (event: any) => {
    setSelected(event.target.value);
    console.log(selected);
    getTracksFromPlayList();
  }

  const getTracksFromPlayList = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/idlist/${selected}`);
      const tracks = await res.json();
      setTracks(tracks);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const drawButton = () => {
    if (session == null) {
      return (<button type="button" onClick={() => signIn()}>LogIn</button>);
    } else {
      return (<button type="button" onClick={() => signOut()}>LogOut</button>);
    }
  };

  useEffect(() => {
    getMyPlaylists();
  }, []);


  return (
    <>
      <div className="sidebar">
        <div className="logo">
          <a href="#">
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="Logo" />
          </a>
        </div>
        <div className="navigation">
          <ul>
            <li>
              <a href="#">
                <span className="fa fa-home"></span>
                <span>Home</span>
              </a>
            </li>

            {/* <li>
              <a href="#">
                <span className="fa fa-search"></span>
                <span>Search</span>
              </a>
            </li> */}

            <li>
              <a href="#">
                <span className="fa fas fa-book"></span>
                <span>Your Library</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="policies">
          <ul>
            <li>
              <a href="#">Cookies</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="main-container">
        <div className="topbar">
          <div className="prev-next-buttons">
            <button type="button" className="fa fas fa-chevron-left"></button>
            <button type="button" className="fa fas fa-chevron-right"></button>
          </div>

          <div className="navbar">
            <ul>
              <li>
                <button onClick={getMyPlaylists}>Playlists</button>
              </li>
              <li>
                &nbsp;
              </li>
              <li className="divider">|</li>
              <li>
                &nbsp;
              </li>
              <li>
                {drawButton()}
              </li>
              <li>
                &nbsp;
              </li>
              <li className="divider">|</li>
            </ul>


          </div>
        </div >
        <div className="spotify-playlists">
          <h2>Spotify Playlists</h2>
          {(list === undefined) ?
            ('')
            : (<PlayListsControl lists={list} onChange={handleChange}></PlayListsControl>)
          }
        </div>
      </div >


    </>
  );
}
