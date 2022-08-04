const path = require("path");

module.exports = {
	i18n: {
		localeDetection: false,
		locales: ["en"],
		defaultLocale: "en",
		domains: [
			{
				domain: process.env.NEXT_PUBLIC_DOMAIN_EN,
				defaultLocale: "en",
				locales: ["en"],
			},
		],
		localePath: path.resolve("./public/static/locales"),
	},
};
