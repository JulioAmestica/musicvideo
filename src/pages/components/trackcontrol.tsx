import { useState } from "react";
import Image from "next/image";
import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";

export default function TrackControl({ track, id, index }: trackControlProps) {
  const [ytLoading, setYtLoading] = useState(false);
  const [ytUrl, setYtUrl] = useState<string | undefined>();

  if (!track) return <></>;

  const imageUrl = track.album?.images?.[0]?.url;
  const artistNames = track.artists?.map((a) => a.name).join(', ') || 'Desconocido';
  const spotifyUrl = track.external_urls?.spotify;

  const formatDuration = (ms?: number) => {
    if (!ms) return '0:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const openPopup = (url: string) => {
    const features = 'width=960,height=540,resizable=yes,scrollbars=yes';
    window.open(url, 'yt-player', features);
  };

  const openYouTube = async () => {
    try {
      if (ytUrl) {
        openPopup(ytUrl);
        return;
      }
      setYtLoading(true);
      const query = `${track.name} ${artistNames}`;
      const res = await fetch(`/api/youtube?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (res.ok && data.url) {
        setYtUrl(data.url);
        openPopup(data.url);
      } else {
        console.error('No se encontró video en YouTube');
      }
    } catch (error) {
      console.error('YouTube search error', error);
    } finally {
      setYtLoading(false);
    }
  };

  return (
    <div className="track-card">
      <div className="track-cover">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={track.name}
            fill
            sizes="64px"
            className="cover-img"
            priority={index !== undefined && index < 5}
          />
        ) : (
          <div className="placeholder" />
        )}
        <div className="track-index">{index ?? ''}</div>
      </div>
      <div className="track-meta">
        <div className="track-title">{track.name}</div>
        <div className="track-artist">{artistNames}</div>
        <div className="track-album">{track.album?.name}</div>
      </div>
      <div className="track-actions">
        <span className="track-duration">{formatDuration(track.duration_ms)}</span>
        {spotifyUrl && (
          <a className="btn-icon btn-spotify" href={spotifyUrl} target="_blank" rel="noreferrer" title="Abrir en Spotify">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
              <path d="M12 1.6a10.4 10.4 0 1 0 0 20.8 10.4 10.4 0 0 0 0-20.8Zm4.78 14.9a.65.65 0 0 1-.9.2c-2.5-1.5-5.7-1.8-9.4-.9a.65.65 0 1 1-.3-1.25c4-.95 7.5-.6 10.3 1.1.3.18.4.57.2.85Zm1.26-2.78a.81.81 0 0 1-1.1.26c-2.8-1.7-7-2.2-10.2-1.1a.81.81 0 0 1-.5-1.55c3.7-1.2 8.4-.7 11.7 1.3.37.23.49.73.2 1.08Zm.1-2.92c-3.3-2-8.7-2.3-11.8-1.1a.97.97 0 0 1-.69-1.81c3.7-1.4 9.8-1.1 13.6 1.2a.97.97 0 1 1-1 1.7Z" />
            </svg>
          </a>
        )}
        <button className="btn-yt btn-icon" onClick={openYouTube} disabled={ytLoading} title="Ver en YouTube">
          {ytLoading ? (
            <span className="fa fa-spinner fa-spin"></span>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
              <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.9-1.7-.9-2.1-.9C15.6 4 12 4 12 4h-.1s-3.6 0-6.7.2c-.4 0-1.3 0-2.1.9-.6.6-.8 2.1-.8 2.1S2 8.9 2 10.6v1.7c0 1.7.3 3.4.3 3.4s.2 1.5.8 2.1c.8.9 1.9.9 2.4 1 1.7.2 7.2.2 7.2.2s3.6 0 6.7-.2c.4 0 1.3 0 2.1-.9.6-.6.8-2.1.8-2.1s.3-1.7.3-3.4v-1.7c0-1.7-.3-3.4-.3-3.4ZM9.9 13.9V8.7l4.7 2.6-4.7 2.6Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

interface trackControlProps {
  track?: Track;
  id: string;
  index?: number;
}
