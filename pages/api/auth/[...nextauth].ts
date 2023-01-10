import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {SanityAdapter, SanityCredentials} from "next-auth-sanity";
import {client} from "../../../lib/client";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        }),
        SanityCredentials(client as any)
    ],
    session: {
        strategy: "jwt"
    },
    adapter: SanityAdapter(client as any),
    pages: {
        signIn: "/auth"
    }
}

export default NextAuth(authOptions as any);