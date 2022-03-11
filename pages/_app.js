import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider defaultTheme="twitter">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
