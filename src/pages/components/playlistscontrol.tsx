import { ReactElement } from "react";

// Crear una instancia de la clase SpotifyApi
export default function PlayListsControl(props: playListsControlProps) {
  if (props.lists == null) {
    return (
      <></>
    )
  }
  else {
    try {
      return (
        <>
          {props.lists.map((item) => (
            <div className="list" key={item.id} >
              <div className="item">
                <img src={item.images[0].url} />
                <div className="play">
                  <span className="fa fa-play"></span>
                </div>
                <h4>{item.name ? item.name : String.fromCharCode(160)}</h4>
              </div>
            </div>
          ))}
        </>
      )
    }
    catch (err) {
      console.error(err);
    }
  }
}

interface playListsControlProps {
  lists?: any;
  onChange?: () => void;
}