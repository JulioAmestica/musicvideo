import { SpotifyWebApi } from 'spotify-web-api-ts';
import { GetMyPlaylistsResponse, GetPlaylistItemsResponse } from 'spotify-web-api-ts/types/types/SpotifyResponses';
import { PlaylistItem, SimplifiedPlaylist } from 'spotify-web-api-ts/types/types/SpotifyObjects';
import { errorMonitor } from 'events';
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

const spotify = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID!,
  clientSecret: SPOTIFY_CLIENT_SECRET!,
});

export const getUsersPlaylists = async (refresh_token: string,name:string): Promise<SimplifiedPlaylist[]> => {
  try {
    const { access_token } = await spotify.getRefreshedAccessToken(refresh_token);
    spotify.setAccessToken(access_token);
    const { items } = await spotify.playlists.getUserPlaylists(name,{limit:50,});
    return items;
  } catch (error: any) {
    console.error(error);
    throw new Error('Error al obtener las playlists del usuario:=> ' + error.response.data.error_description);
  }
};

export const getPlaylistTracks = async (refresh_token: string, idlist: string): Promise<PlaylistItem[]> => {
  try {
    const { access_token } = await spotify.getRefreshedAccessToken(refresh_token);
    spotify.setAccessToken(access_token);
    const { items } = await spotify.playlists.getPlaylistItems(idlist);
    return items;
  } catch (error:any) {
    console.error(error);
    throw new Error('Error al obtener las canciones de la playlist:==>' + error.response.error_description);
  }
};
