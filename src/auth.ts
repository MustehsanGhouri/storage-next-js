import credentials from "next-auth/providers/credentials";

import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the User type to include accessToken and tokenType
declare module "next-auth" {
  interface User {
    accessToken: string;
    tokenType: string;
  }
  interface Session {
    accessToken: string;
    tokenType: string;
  }
}

// Extend the JWT type to include accessToken and tokenType
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    tokenType: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        username: { label: "User Name", type: "string" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        if (!username || !password) {
          console.error("Missing username or password");
          throw new Error("Username and password are required");
        }

        try {
          const body = new URLSearchParams();
          body.append("username", username);
          body.append("password", password);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/login/token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: body.toString(),
            }
          );
          console.log(
            "url: ",
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/login/token`
          );
          console.log("credentials: ", { username, password });

          const data = await response.json();
          console.log("response.json: ", data);

          if (!response.ok) {
            console.error("Failed to authenticate:", data);
            throw new Error(data.message || "Failed to authenticate");
          }

          const user = {
            username,
            accessToken: data.access_token,
            tokenType: data.token_type,
          };

          console.log("User authenticated successfully:", user);
          return user ?? null;
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Failed to authenticate");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add accessToken and tokenType to the token right after sign-in
      if (user) {
        token.accessToken = user.accessToken;
        token.tokenType = user.tokenType;
      }
      return token;
    },
    // async session({ session, token }) {
    //   // Add accessToken and tokenType to the session
    //   session.accessToken = token.accessToken;
    //   session.tokenType = token.tokenType;
    //   return session;
    // },
    // async signIn({ user, account, profile, email, credentials }) {
    //   // Here you can add any logic to handle after sign-in
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   // Always redirect to the dashboard after sign-in
    //   return baseUrl + "/dashboard";
    // },
  },
  session: {
    strategy: "jwt", // Use JWT strategy for sessions
  },
  secret: process.env.NEXTAUTH_SECRET, // Use a secret for signing the JWT
});
