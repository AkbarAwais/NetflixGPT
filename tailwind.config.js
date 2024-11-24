/** @type {import('tailwindcss').Config} */
import { NETFLIX_BG } from './src/utils/constants';
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            backgroundImage: {
                'netflix-img': `url('${NETFLIX_BG}')`
            }
        },
    },
    plugins: [],
}
