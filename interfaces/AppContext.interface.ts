import {Dispatch, PropsWithChildren, SetStateAction} from "react";

export interface AppContext {
    loading: Boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    usernameInput: String;
    setUsernameInput: Dispatch<SetStateAction<string>>
    emailInput: String;
    setEmailInput: Dispatch<SetStateAction<string>>
    passwordInput: String;
    setPasswordInput: Dispatch<SetStateAction<string>>
    confirmPasswordInput: String;
    setConfirmPasswordInput: Dispatch<SetStateAction<string>>
}

export interface AppContextProps extends PropsWithChildren {
}
