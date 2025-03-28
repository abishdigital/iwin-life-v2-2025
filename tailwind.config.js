/** @type {import('tailwindcss').Config} */
export const content = ["./app/**/*.{js,jsx,ts,tsx}"];
export const presets = [require("nativewind/preset")];
export const theme = {
    extend: {
        colors: {
            primary: '#FF0000',
            grayCustom: 'rgba(102, 102, 102, 1)',
            grayLightCustom: 'rgba(149, 148, 148, 1)',
        },
        fontFamily: {
            viga: ['Viga']
        }
    },
};
export const plugins = [];