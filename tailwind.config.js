import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#39D84A",
        red: "#FF6868",
        secondary: "#555",
        primaryBg: "#FCFCFC"
      },
      boxShadow: {
        custom: "0 10px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)"
      }
    }
  },
  plugins: [daisyui]
};
