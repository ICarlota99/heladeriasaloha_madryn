/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                Lobster: ["Lobster", "cursive"],
            },
            colors: {
                customgray: "#59427a",
            },
        },
    },
    plugins: [],
};