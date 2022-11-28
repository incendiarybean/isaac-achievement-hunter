const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            transitionProperty: {
                width: "width",
                bg: "background-color",
            },
            height: {
                92: "23rem",
                128: "32rem",
                120: "30rem",
                112: "28rem",
            },
            width: {
                "2xl": "42rem",
            },
            maxHeight: {
                128: "32rem",
                120: "30rem",
                112: "28rem",
            },
            minWidth: {
                128: "32rem",
                120: "30rem",
                112: "28rem",
            },
            animation: {
                fadeIn: "fadeIn 200ms ease-in",
            },
            keyframes: (theme) => ({
                fadeIn: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 2 },
                },
            }),
        },
    },
    plugins: [],
};
