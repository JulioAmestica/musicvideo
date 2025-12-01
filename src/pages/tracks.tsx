import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Loading from './components/loading';
import { Track } from 'spotify-web-api-ts/types/types/SpotifyObjects';
import TrackControl from './components/trackcontrol';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

export default function Tracks() {
  const { data: session } = useSession();
  const [tracks, setTracks] = useState<Track[]>();
  const [isLoading, setLoading] = useState(false);
  const [playlistName, setPlaylistName] = useState<string | undefined>();
  const pageTitle = playlistName ? `${playlistName} | MusicVideo` : 'Canciones destacadas | MusicVideo';
  const pageDescription = playlistName
    ? `Explora las canciones de la playlist ${playlistName} en MusicVideo.`
    : 'Explora las canciones de tus playlists de Spotify en MusicVideo.';

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const searchParams = new URLSearchParams(document.location.search)
        const Listid = searchParams.get('Listid');
        const listName = searchParams.get('name');
        if (listName) {
          setPlaylistName(decodeURIComponent(listName));
        }
        setLoading(true);
        if (Listid === null) {
          setLoading(false);
          return;
        }
        const res = await fetch(`${apiUrl}/idlist/${Listid}`);
        const { tracks } = await res.json();
        if (tracks !== undefined) {
          setTracks(tracks);
          if (!listName) {
            setPlaylistName(tracks[0]?.album?.name);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);


  const home = () => {
    document.location.href = '/';
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  };

  const goForward = () => {
    window.history.forward();
  };

  const drawButton = () => {
    if (session == null) {
      return (<button type="button" onClick={() => signIn()}>LogIn</button>);
    } else {
      return (<button type="button" onClick={() => signOut()}>LogOut</button>);
    }
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://mymusicvideo.netlify.app/tracks" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="sidebar">
        <div className="logo">
          <Link href="/">
            <Image src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="Logo" width={130} height={39} priority />
          </Link>
        </div>
        <div className="navigation">
          <ul>
            <li>
              <button type="button" onClick={home} className="nav-button">
                <span className="fa fa-home"></span>
                <span>Home</span>
              </button>
            </li>
            <li>
              <button type="button" onClick={home} className="nav-button">
                <span className="fa fas fa-book"></span>
                <span>Your Library</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="policies">
          <ul>
            <li>
              <button type="button" className="nav-button muted">Cookies</button>
            </li>
            <li>
              <button type="button" className="nav-button muted">Privacy</button>
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
          <div className="tracks-header">
            <div>
              <p className="eyebrow">Playlist</p>
              <h2>{playlistName || 'Spotify Tracks'}</h2>
            </div>
          </div>
          {isLoading && <Loading />}
          {!isLoading && tracks && (
            <div className="track-grid">
              {tracks.map((track: Track, index: number) => (
                <TrackControl key={track.id} track={track} id={track.id} index={index + 1}></TrackControl>
              ))}
            </div>
          )}
        </div>
      </div >
    </>
  );
}
