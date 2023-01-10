import React, {useCallback, useEffect, useState} from 'react';
import Head from "next/head";
import {CloseEyeIcon, EmailIcon, GoogleIcon, OpenEyeIcon, PasswordIcon, UserIcon} from "../components/elements/Icons";
import {Auth} from "../interfaces/AppComponent.interface";
import {signIn, useSession} from "next-auth/react";
import {Engine} from "tsparticles-engine";
import {loadFull} from "tsparticles";
import Particles from "react-particles";
import {useStateContext} from "../context/StateContext";
import {useRouter} from "next/router";
import {signUp} from "next-auth-sanity/client";

enum AuthAction {
    AUTH_SIGNIN,
    AUTH_SIGNUP
}

const SignUpForm = ({showPassword, showConfirmPassword, setShowPassword, setShowConfirmPassword}: Auth) => {
    const {
        usernameInput,
        setUsernameInput,
        emailInput,
        setEmailInput,
        passwordInput,
        setPasswordInput,
        confirmPasswordInput,
        setConfirmPasswordInput
    } = useStateContext()
    return (
        <form action="" className="flex flex-col w-2/3 lg:w-1/2 my-5 gap-3">
            <div
                className="h-[50px] w-full bg-bg/50 backdrop-blur-3xl border-[1px] border-base/10 rounded-xl px-3 flex items-center gap-3 text-base/50">
                <UserIcon/>
                <input type="text" placeholder="Username" required
                       value={usernameInput.toString()}
                       onChange={(e) => setUsernameInput(e.target.value)}
                       className="h-full bg-transparent placeholder-base/50 text-base tracking-normal w-full"/>
            </div>

            <div
                className="h-[50px] w-full bg-bg/50 backdrop-blur-3xl border-[1px] border-base/10 rounded-xl px-3 flex items-center gap-3 text-base/50">
                <EmailIcon/>
                <input type="email" placeholder="Email" required
                       value={emailInput.toString()}
                       onChange={(e) => setEmailInput(e.target.value)}
                       className="h-full bg-transparent placeholder-base/50 text-base tracking-normal w-full"/>
            </div>

            <div
                className="h-[50px] w-full bg-bg/50 backdrop-blur-3xl border-[1px] border-base/10 rounded-xl px-3 flex items-center gap-3 text-base/50">
                <PasswordIcon/>
                <input type={showPassword ? "text" : "password"} placeholder="Password" required
                       value={passwordInput.toString()}
                       onChange={(e) => setPasswordInput(e.target.value)}
                       className="h-full bg-transparent placeholder-base/50 text-base tracking-normal w-full"/>
                <div onClick={setShowPassword}
                     className="h-full w-fit flex items-center justify-center">{showPassword ? <CloseEyeIcon/> :
                    <OpenEyeIcon/>}</div>
            </div>

            <div
                className="h-[50px] w-full bg-bg/50 backdrop-blur-3xl border-[1px] border-base/10 rounded-xl px-3 flex items-center gap-3 text-base/50">
                <PasswordIcon/>
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" required
                       value={confirmPasswordInput.toString()}
                       onChange={(e) => setConfirmPasswordInput(e.target.value)}
                       className="h-full bg-transparent placeholder-base/50 text-base tracking-normal w-full"/>
                <div onClick={setShowConfirmPassword}
                     className="h-full w-fit flex items-center justify-center">{showConfirmPassword ?
                    <CloseEyeIcon/> :
                    <OpenEyeIcon/>}</div>
            </div>
        </form>
    );
}

const SignInForm = ({showPassword, setShowPassword}: Auth) => {
    const {
        usernameInput,
        setUsernameInput,
        emailInput,
        setEmailInput,
        passwordInput,
        setPasswordInput,
        confirmPasswordInput,
        setConfirmPasswordInput
    } = useStateContext()
    return (
        <form action="" className="flex flex-col w-2/3 lg:w-1/2 my-5 gap-3">
            <div
                className="h-[50px] w-full bg-bg/50 backdrop-blur-3xl border-[1px] border-base/10 rounded-xl px-3 flex items-center gap-3 text-base/50">
                <EmailIcon/>
                <input type="email" placeholder="Email" required
                       value={emailInput.toString()}
                       onChange={(e) => setEmailInput(e.target.value)}
                       className="h-full bg-transparent placeholder-base/50 text-base tracking-normal w-full"/>
            </div>

            <div
                className="h-[50px] w-full bg-bg/50 backdrop-blur-3xl border-[1px] border-base/10 rounded-xl px-3 flex items-center gap-3 text-base/50">
                <PasswordIcon/>
                <input type={showPassword ? "text" : "password"} placeholder="Password" required
                       value={passwordInput.toString()}
                       onChange={(e) => setPasswordInput(e.target.value)}
                       className="h-full bg-transparent placeholder-base/50 text-base tracking-normal w-full"/>
                <div onClick={setShowPassword}
                     className="h-full w-fit flex items-center justify-center">{showPassword ? <CloseEyeIcon/> :
                    <OpenEyeIcon/>}</div>
            </div>
        </form>
    )
}

const Auth = () => {
    // TODO: Create Authentication System with NextAuth.
    const {
        setUsernameInput,
        setEmailInput,
        passwordInput,
        emailInput,
        setPasswordInput,
        confirmPasswordInput,
        usernameInput,
        setConfirmPasswordInput
    } = useStateContext()

    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/").then(r => console.log(r + "changed"))
        }
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [authChoice, setAuthChoice] = useState(AuthAction.AUTH_SIGNIN)
    const [passwordAlert, setPasswordAlert] = useState(false)


    const particlesInit = useCallback(async (engine: Engine) => {
        console.log(engine)
        await loadFull(engine);
    }, [])

    const handleSignInClick = async () => {
        if (authChoice === AuthAction.AUTH_SIGNIN) {
            await signIn("sanity-login", {
                redirect: false,
                email: emailInput,
                password: passwordInput,
            })

        } else {
            setAuthChoice(AuthAction.AUTH_SIGNIN)
            setEmailInput("")
            setPasswordInput("")


        }
    }

    const handleSignUpClick = async () => {
        if (authChoice === AuthAction.AUTH_SIGNUP) {
            if (passwordInput !== confirmPasswordInput) setPasswordAlert(true)
            await signUp(
                {
                    email: emailInput.toString(),
                    password: passwordInput.toString(),
                    name: usernameInput.toString()
                })

            await signIn("sanity-login", {
                redirect: false,
                email: emailInput,
                password: passwordInput
            })

        } else {
            setAuthChoice(AuthAction.AUTH_SIGNUP)
            setUsernameInput("")
            setEmailInput("")
            setPasswordInput("")
            setConfirmPasswordInput("")
        }
    }

    return (
        <div className="relative w-screen h-screen flex items-center justify-center font-roboto text-base">
            <Head>
                <title>Sign In</title>
                <meta name="description" content="Sign in to Hangnado."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="w-1/2 flex flex-col items-center">
                <h3 className="text-3xl font-bold tracking-wide w-2/3 lg:w-1/2">Welcome!</h3>
                <span className="font-light text-base/40 font-medium w-2/3 lg:w-1/2">Sign in to <b
                    className="font-changa text-base ">Hangnado</b>.</span>

                {authChoice ?
                    <SignUpForm showConfirmPassword={showConfirmPassword}
                                setShowConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                setShowPassword={() => setShowPassword(!showPassword)}
                                showPassword={showPassword}/> :
                    <SignInForm
                        setShowPassword={() => setShowPassword(!showPassword)} showPassword={showPassword}/>}

                <div className="w-2/3 lg:w-1/2 h-[45px] flex gap-5 items-center">
                    <button
                        onClick={() => handleSignUpClick()}
                        className={authChoice ? "h-full bg-base px-6 uppercase text-sm font-bold rounded-xl tracking-wide text-bg" : "h-full text-sm font-bold rounded-xl tracking-wide"}>Sign
                        Up
                    </button>
                    <span className="w-[1px] bg-base/20 h-1/3"></span>
                    <button
                        onClick={() => handleSignInClick()}
                        className={authChoice ? "h-full text-sm font-bold rounded-xl tracking-wide" : "h-full bg-base px-6 uppercase text-sm font-bold rounded-xl tracking-wide text-bg"}>Sign
                        In
                    </button>


                </div>
                <div className="w-2/3 lg:w-1/2 my-6 flex flex-col gap-6">
                    <div className="h-[1px] w-full bg-base/40"></div>
                    <button
                        onClick={() => signIn("google")}
                        className="h-[45px] w-[45px] bg-base rounded-xl text-bg flex items-center justify-center">
                        <GoogleIcon/>
                    </button>
                </div>
            </div>
            <div
                className="w-[1px] h-20 flex items-center justify-center text-sm font-medium tracking-wide bg-base/20">
            </div>
            <div className="w-1/2 h-2/3 flex items-center justify-center relative overflow-hidden">
                <Particles id="tsparticles"
                           init={particlesInit}
                           className="w-2/3 h-full"
                           options={{
                               fullScreen: false,
                               fpsLimit: 120,
                               interactivity: {
                                   modes: {
                                       push: {
                                           quantity: 4,
                                       },
                                       repulse: {
                                           distance: 200,
                                           duration: 0.4,
                                       },
                                   },
                               },
                               particles: {
                                   color: {
                                       value: "#D2D3D3",
                                   },
                                   links: {
                                       color: "#ffffff",
                                       distance: 150,
                                       enable: true,
                                       opacity: 0.5,
                                       width: 1,
                                   },
                                   collisions: {
                                       enable: true,
                                   },
                                   move: {
                                       direction: "none",
                                       enable: true,
                                       outModes: {
                                           default: "bounce",
                                       },
                                       random: false,
                                       speed: 1,
                                       straight: false,
                                   },
                                   number: {
                                       density: {
                                           enable: true,
                                           area: 1000,
                                       },
                                       value: 80,
                                   },
                                   opacity: {
                                       value: 0.5,
                                   },
                                   shape: {
                                       type: "circle",
                                   },
                                   size: {
                                       value: {min: 1, max: 5},
                                   },
                               },
                               detectRetina: true,
                           }}/>
            </div>
        </div>
    );
};

export default Auth;