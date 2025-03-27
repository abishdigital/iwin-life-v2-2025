/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{js,jsx,ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
    extend: {
        colors: {
            primary: '#FF0000'
        },
        fontFamily: {
            vigaRegular: ["Viga-Regular"]
        }
    },
};
export const plugins = [];