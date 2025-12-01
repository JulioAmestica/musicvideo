import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Script from 'next/script';
import { AppProps } from 'next/app'
import '../styles/Home.module.css';
import '../styles/spotify.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>MusicVideo | Spotify Visualizer</title>
        <meta
          name="description"
          content="Explora tus playlists de Spotify con visuales y pistas destacadas en MusicVideo."
        />
        <meta property="og:site_name" content="MusicVideo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8J9Y8RHL44"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8J9Y8RHL44');
        `}
      </Script>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
