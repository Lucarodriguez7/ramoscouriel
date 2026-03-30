/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Esto cubre todas las subcarpetas de src
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: '#0A192F',
                    light: '#112240',
                },
                accent: '#007BFF',
            },
        },
    },
    plugins: [],
}