/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
                press2p: ["Changa", "sans-serif"],
            },
            colors: {
                bg: "#272A2C",
                primary: "#9615DB",
                base: "#D2D3D3",
            }
        },
    },
    plugins: [],
}
