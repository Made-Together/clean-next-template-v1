module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			xxs: "400px",
			xs: "480px",
			sm: "640px",
			md: "768px",
			"md-large": "890px",
			lg: "1024px",
			"xl-small": "1200px",
			xl: "1280px",
			xxl: "1320px",
			"2xl": "1440px",
			"3xl": "1920px",
			"4xl": "2560px",
			laptop: { raw: "(min-width: 1024px) and (max-height: 835px)" },
			"h-lg": { raw: "(max-height: 1024px)" },
			"h-md": { raw: "(min-height: 800px)" },
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: "#09182C",
			white: "#FFFFFF",
			purple: "#7829F9",
			green: "#02F3A2",
			lightGrey: "#F1F3F9",
		},
		fontFamily: {
			heading: ['"Plus Jakarta Sans"', "Helvetica", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji"],
			body: ['"Plus Jakarta Sans"', "Helvetica", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji"],
		},
		extend: {
		},
	},
	plugins: [],
};
