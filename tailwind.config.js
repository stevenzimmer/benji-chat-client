const colors = require("tailwindcss/colors");
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            gray: {},
            grey: { ...colors["slate"] },
        },
        extend: {
            container: {
                center: true,
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
