// tailwind.config.js
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}", // if you use a src folder
      // Include any other folders you use with Tailwind classes
    ],
    theme: {
      extend: {
        animation: {
          loader: 'loader 1.5s ease-in-out infinite',
        },
        keyframes: {
          loader: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(300%)' },
          },
        },
      },
    },
    plugins: [],
  };
  