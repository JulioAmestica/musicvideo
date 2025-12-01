import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import PlayListsControl from './components/playlistscontrol';
import Loading from './components/loading';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

export default function Home() {
  const { data: session } = useSession();
  const [list, setList] = useState<any[]>();
  const [isLoading, setLoading] = useState(false);

  const getMyPlaylists = useCallback(async () => {
    if (!session) {
      setList(undefined);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/playlists`);
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const { playlists } = await res.json();
      setList(playlists ?? []);
    } catch (error) {
      console.error(error);
      setList(undefined);
    } finally {
      setLoading(false);
    }
  }, [session]);

  const drawButton = () => {
    if (session == null) {
      return (<button type="button" onClick={() => signIn()}>LogIn</button>);
    } else {
      return (<button type="button" onClick={() => signOut()}>LogOut</button>);
    }
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  const goForward = () => {
    window.history.forward();
  };

  useEffect(() => {
    getMyPlaylists();
  }, [getMyPlaylists, session]);

  return (
    <>
      <div className="sidebar">
        <div className="logo">
          <Link href="/">
            <Image src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="Logo" width={130} height={39} priority />
          </Link>
        </div>
        <div className="navigation">
          <ul>
            <li>
              <button type="button" onClick={getMyPlaylists} className="nav-button">
                <span className="fa fa-home"></span>
                <span>Home</span>
              </button>
            </li>

            <li>
              <button type="button" onClick={getMyPlaylists} className="nav-button">
                <span className="fa fas fa-book"></span>
                <span>Your Library</span>
              </button>
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
            <button type="button" className="fa fas fa-chevron-left" onClick={goBack} aria-label="Atrás"></button>
            <button type="button" className="fa fas fa-chevron-right" onClick={goForward} aria-label="Adelante"></button>
          </div>

          <div className="navbar">
            <ul>
              <li>
                {drawButton()}
              </li>
            </ul>


          </div>
        </div >
        <div className="spotify-playlists">
          <h2>Spotify Playlists</h2>
          {isLoading && <Loading />}
          {!isLoading && list && list.length > 0 && (
            <PlayListsControl lists={list}></PlayListsControl>
          )}
          {!isLoading && session && (!list || list.length === 0) && (
            <p>No hay playlists para mostrar.</p>
          )}
          {!isLoading && !session && (
            <p>Inicia sesion para ver tus playlists.</p>
          )}
        </div>
       
      </div >


    </>
  );
}
