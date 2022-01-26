const colors = require("tailwindcss/colors");
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },
        },
        colors: {
            gray: {},
            grey: { ...colors["slate"] },
        },
    },
    plugins: [],
    darkMode: "class",
};
