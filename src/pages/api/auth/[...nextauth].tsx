import NextAuth, { Session } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWTOptions } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';
const queryString = require('querystring');

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: {
        url: 'https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-library-read,user-read-playback-state,playlist-read-private,playlist-read-collaborative'
      },
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session({ session }) {
      return session
    },
  },
});
