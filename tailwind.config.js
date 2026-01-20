/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: "#20B2AA",
      secondary: "#008B8B",
      secondaryHover: "#008b8bee",
      background: "#E0FFFF",
      textdark: "#222",
      textlight: "#555",
      backwhite: "#ddd",
    }
  }
}

  ,plugins: [],
}
