import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const NODE_ENV = process.env.NODE_ENV;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'custom',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${
            NODE_ENV === 'production'
              ? 'https://tolongmarkahin-app.vercel.app/'
              : 'http://localhost:3000/'
          }/api/firebase/login`,
          {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.defaultFolder = user.defaultFolder;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.user = token;
      }
      return session;
    },
  },
});
