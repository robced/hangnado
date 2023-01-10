import {AppContext, AppContextProps,} from "../interfaces/AppContext.interface";
import {createContext, useContext, useState} from "react";

const Context = createContext({} as AppContext);

export const StateContext = ({children}: AppContextProps) => {
    const [loading, setLoading] = useState(false);
    const [usernameInput, setUsernameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("")

    return (
        <Context.Provider value={{
            loading,
            setLoading,
            usernameInput,
            setUsernameInput,
            emailInput,
            setEmailInput,
            passwordInput,
            setPasswordInput,
            confirmPasswordInput,
            setConfirmPasswordInput
        }}>
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);
