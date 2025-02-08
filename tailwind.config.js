/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            keyframes: {
                'pulse-bg': {
                    '0%, 100%': { backgroundColor: 'rgb(34, 211, 238)', transform: 'scale(1)' }, // cyan-300
                    '50%': { backgroundColor: 'rgb(56, 189, 248)', transform: 'scale(1.05)' }, // blue-400
                },
            },
            animation: {
                'pulse-smooth': 'pulse-bg 2s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}
