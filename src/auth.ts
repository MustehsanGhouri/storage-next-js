import credentials from "next-auth/providers/credentials";

import NextAuth, { CredentialsSignin } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize({ email, password }) {
        if (typeof email === "string") {
          throw new CredentialsSignin("Email is not valid");
        }

        const user = { email, id: "1" };
        // return user ?? null;
        return null;
      },
    }),
  ],
});
