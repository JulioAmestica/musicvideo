import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app'
import '../styles/Home.module.css';
import '../styles/spotify.css';


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (<SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>);
}
