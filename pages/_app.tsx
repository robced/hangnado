import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {StateContext} from "../context/StateContext";
import {SessionProvider} from "next-auth/react";
import Layout from "../components/Layout";

export default function App({Component, pageProps}: AppProps) {
    return (
        <SessionProvider>
            <StateContext>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </StateContext>
        </SessionProvider>

    );
}
