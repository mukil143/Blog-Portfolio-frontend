// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Update as per your project
  ],
  theme: {
    extend: {
      keyframes: {
       scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        slideIn: "slideIn 0.3s ease-out forwards",  
      },
    },
  },
  plugins: [],
};
