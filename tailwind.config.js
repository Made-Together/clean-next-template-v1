module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		container: (theme) => ({
			maxWidth: "100%",
			center: true,
			padding: {
				DEFAULT: theme("spacing.6"),
				lg: theme("spacing.12"),
			},
		}),
		screens: {
			xs: "480px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: "#09182C",
			"dark-grey": "#556072",
			grey: "#F1F3F9",
			white: "#FFFFFF",
			orange: "#FC6838",
			purple: "#7829F9",
			green: "#02F3A2",
			blue: "#0299EE",
			teal: "#06F7D5",
			lime: "#B6F952",
			pink: "#F041B8",
		},
		fontFamily: {
			heading: ['"Plus Jakarta Sans"', "Helvetica", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji"],
			body: ['"Plus Jakarta Sans"', "Helvetica", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji"],
		},
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						fontSize: "calc(0.7794117647rem + 0.7352941176vw)",
						maxWidth: "100%",
						color: "inherit",
						lineHeight: "inherit",
						h1: {
							fontSize: "4rem",
							fontWeight: "600",
							lineHeight: "1.07",
						},
						h2: {
							fontSize: "3.125rem",
							fontWeight: "600",
						},
						h3: {
							fontSize: "2.5rem",
							fontWeight: "600",
						},
						h4: {
							fontSize: "2rem",
							fontWeight: "600",
						},
						h5: {
							fontSize: "1.625rem",
							fontWeight: "600",
						},
					},
				},
			}),
			aspectRatio: {
				38: "38",
				23: "23",
				51: "51",
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("@tailwindcss/aspect-ratio"), require("@tailwindcss/forms")],
};
