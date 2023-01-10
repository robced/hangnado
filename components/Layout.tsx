import React, {FC} from 'react';
import {ScriptProps} from "next/script";
import Header from "./Header";

const Background = () => {
    return <div className="fixed w-screen h-screen z-0 top-0">
        <div
            className="absolute bottom-[-1000px] left-10 h-[1336px] w-[1335px] bg-primary rounded-full z-10 blur-3xl opacity-30"/>
        <div
            className="absolute top-[-500px] right-[-600px] h-[1336px] w-[1335px] bg-primary rounded-full z-10 opacity-30 blur-3xl"/>
        <div className="absolute h-screen w-screen backdrop-blur-3xl z-10"/>
    </div>;
}

const Layout: FC<ScriptProps> = ({children}) => {
    return (
        <div className="relative overflow-hidden bg-bg h-screen w-screen">

            <header className="z-20 relative">
                <Header/>
            </header>
            <main className="z-30 relative">
                {children}
            </main>
            <Background/>
        </div>
    );
};

export default Layout;