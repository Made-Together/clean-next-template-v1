const path = require("path");
const { withSentryConfig } = require("@sentry/nextjs");
const { i18n } = require("./next-i18next.config");

const config = {
	i18n,
	trailingSlash: true,
	poweredByHeader: false,
	images: {
		dangerouslyAllowSVG: true,
		domains: [
			"localhost",
			"bosonprotocolcms.wpengine.com",
			"bosonprotocoldev.wpengine.com",
			"bosonprotocolstage.wpengine.com",
			"cms.bosonprotocol.io",
			"bosonprotocol.and.together.agency",
		],
		formats: ["image/avif", "image/webp"],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
	async redirects() {
		return [
			{
				source: "/wp-login.php",
				destination: "https://cms.bosonprotocol.io/wp-login.php",
				permanent: true,
			},
		];
	},
	async rewrites() {
		return {
			beforeFiles: [
				{
					source: "/wp-content/:path*",
					destination: `${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-content/:path*`,
				},
			],
			fallback: [
				{
					source: "/wp-json/:path*",
					destination: `${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/:path*`,
				},
			],
		};
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	compiler: {
		styledComponents: true,
	},
};

const sentryWebpackPluginOptions = {
	silent: true,
};

module.exports = withSentryConfig(config, sentryWebpackPluginOptions);
