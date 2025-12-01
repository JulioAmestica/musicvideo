import { SpotifyWebApi } from 'spotify-web-api-ts';
import { PlaylistItem, SimplifiedPlaylist } from 'spotify-web-api-ts/types/types/SpotifyObjects';
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

const spotify = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID!,
  clientSecret: SPOTIFY_CLIENT_SECRET!,
});

export const getUsersPlaylists = async (refresh_token: string): Promise<SimplifiedPlaylist[]> => {
  try {
    const { access_token } = await spotify.getRefreshedAccessToken(refresh_token);
    spotify.setAccessToken(access_token);
    const { items } = await spotify.playlists.getMyPlaylists({ limit: 50 });
    return items;
  } catch (error: any) {
    console.error(error);
    const description = error?.response?.data?.error_description || error?.message || 'unknown error';
    throw new Error('Error al obtener las playlists del usuario: ' + description);
  }
};

export const getPlaylistTracks = async (refresh_token: string, idlist: string): Promise<PlaylistItem[]> => {
  try {
    const { access_token } = await spotify.getRefreshedAccessToken(refresh_token);
    spotify.setAccessToken(access_token);
    const { items } = await spotify.playlists.getPlaylistItems(idlist);
    return items;
  } catch (error: any) {
    console.error(error);
    throw new Error('Error al obtener las canciones de la playlist:==>' + error);
  }
};
