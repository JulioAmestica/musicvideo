import { ReactElement } from "react";
import Image from "next/image";
import TracksControl from './trackscontrol'

// Crear una instancia de la clase SpotifyApi
export default function PlayListsControl(props: playListsControlProps) {
  const list = (id: any, name: string) => {
    const encodedName = encodeURIComponent(name || '');
    document.location.href = `/tracks?Listid=${id}&name=${encodedName}`;
  }

  if (!Array.isArray(props.lists) || props.lists.length === 0) {
    return null;
  }
  else {
    try {
      return (
        <div className="playlist-grid">
          {props.lists.map((item) => {
            const imageUrl = item?.images?.[0]?.url;
            return (
              <div className="list" key={item.id} onClick={() => list(item.id, item.name)}>
                <div className="item" >
                  <div className="playlist-thumb">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item?.name || 'Playlist'}
                        fill
                        sizes="200px"
                        className="playlist-img"
                      />
                    ) : (
                      <div style={{ width: 120, height: 120, background: '#222' }} />
                    )}
                  </div>
                  <div className="play">
                    <span className="fa fa-play"></span>
                  </div>
                  <h4>{item?.name ? item.name : String.fromCharCode(160)}</h4>
                </div>
              </div>
            );
          })}
        </div>
      )
    }
    catch (err) {
      console.error(err);
      return null;
    }
  }
}

interface playListsControlProps {
  lists?: any;
  onChange?: () => void;
}
