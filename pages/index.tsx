import Head from 'next/head'
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";

export default function Home() {
    const {data: session} = useSession();
    const router = useRouter();

    // useEffect(() => {
    //     if (!session) {
    //         router.push("/auth").then(r => console.log(r + "changed"))
    //     }
    // })

    return (
        <div className="h-screen w-screen z-30"
        >
            <Head>
                <title>Hangnado</title>
                <meta name="description" content="Web-based word game."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="w-full h-full flex items-center justify-center">
                {session ? <div>
                    Welcome, {session.user?.email}
                    <div onClick={() => signOut()} className="">sasas</div>
                </div> : <div>
                    "You are not signed in."
                    <div onClick={() => signIn()} className="">Sign In</div>
                </div>}
            </main>
        </div>
    )
}
