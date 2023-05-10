import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
export default function TrackControl(props: trackControlProps) {
  if (props.track == null) {
    return (
      <></>
    )
  }
  else {
    try {
      return (
        <>
          <div className="spotify-playlist">
            <div id={props.id} >
              <img src={props.track.album.images[1].url}  alt={props.track.name} />
              <p>{props.track.name}</p>
              <p>{props.track.popularity}</p>
              <div>{props.track.artists[0].name}</div>
            </div>
          </div>

        </>
      )
    }
    catch (error) {
      console.log("TrackControl==> " + error)
      return (
        <></>
      )
    }
  }
}

interface trackControlProps {
  track?: Track;
  id: string;
}