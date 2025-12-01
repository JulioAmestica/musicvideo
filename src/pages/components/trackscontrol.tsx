import React, { useEffect, useState } from 'react';
import TrackControl from "./trackcontrol";
import Loading from "./loading";
import { Track } from 'spotify-web-api-ts/types/types/SpotifyObjects';

export default function TracksControl(props: tracksControlProps) {
  
  const [isLoading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<Track[]>();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        if (!props.ListId) {
          setLoading(false);
          return;
        }
        const res = await fetch(`${apiUrl}/idlist/${props.ListId}`);
        const { tracks } = await res.json();
        setTracks(tracks);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [apiUrl, props.ListId]);

  if (isLoading) {
    return <Loading />;
  }

  if (tracks == null) {
    return (
      <></>
    )
  }
  else {
    try {
      return (

        <>
          {tracks.map((track: Track) => (
            <TrackControl key={track.id} track={track} id={track.id}></TrackControl>)

          )
          }
        </>

      )
    }
    catch (err) {
      console.error("trackscontrol ==>" + err);
    }
  }
}

interface tracksControlProps {
  ListId?: any,
}
