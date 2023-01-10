export interface AppComponent {

}

export interface Auth extends AppComponent {
    showPassword: boolean;
    setShowPassword: () => void;
    showConfirmPassword?: boolean;
    setShowConfirmPassword?: () => void;
}