/* eslint-disable @next/next/no-html-link-for-pages */
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center h-screen bg-base-300">
      <Head>
        <title>Tolongmarkahin</title>
        <meta property="og:title" content="Tolongmarkahin" key="title" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tolongmarkahin" />
        <meta
          name="twitter:description"
          content="Tolongmarkahin, membantu mengarsipkan tweet favorit kamu."
        />
        <meta
          name="twitter:image"
          content="https://tolongmarkahin.vercel.app/static/twitter-card.png"
        />
        <meta name="twitter:creator" content="@tolongmarkahin" />
      </Head>
      <div className="px-4">
        <div className="hero max-w-xs md:max-w-md bg-base-200 rounded-box shadow-xl">
          <div className="hero-content text-center">
            <div className="flex flex-col py-8 px-4">
              {!session && (
                <>
                  <h1 className="text-3xl font-bold">
                    You&apos;re not sign in
                  </h1>
                  <div className="mt-6">
                    <button
                      className="btn btn-sm btn-primary gap-2"
                      onClick={e => {
                        e.preventDefault();
                        signIn();
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      Sign in
                    </button>
                  </div>
                </>
              )}
              {session?.user && (
                <>
                  <h1 className="text-3xl font-bold">
                    You&apos;re sign as {session.user.username}
                  </h1>
                  <div className="flex space-x-4 items-center justify-center mt-6">
                    <a className="btn btn-sm btn-primary gap-2" href="/home">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                      </svg>
                      Home
                    </a>
                    <button
                      className="btn btn-sm btn-secondary gap-2"
                      onClick={e => {
                        e.preventDefault();
                        signOut();
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
