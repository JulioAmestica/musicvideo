import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization:
        "https://accounts.spotify.com/authorize?scope=playlist-read-private%20playlist-read-collaborative",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.refresh_token) token.refreshToken = account.refresh_token;
      if (account?.access_token) token.accessToken = account.access_token;
      return token;
    },
    // Pass refresh token into the session object
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.name = token.name as string; // nombre de usuario
      return session;
    },
  },
});
