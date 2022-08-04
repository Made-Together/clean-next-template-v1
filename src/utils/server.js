import axios from "axios";

export const getFromWordpress = async (url = "") => {
	const date = new Date();
	const dateStr =
		process.env.NODE_ENV === "production" ? `${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes().toString()}` : +new Date();
	const randomCacheString = url.includes("?") ? `&${dateStr}` : `?${dateStr}`;
	const processedUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/${url}${randomCacheString}`;

	const options = {};
	if (process.env.NEXT_PUBLIC_WORDPRESS_AUTH_USER && process.env.NEXT_PUBLIC_WORDPRESS_AUTH_PASS) {
		options.auth = {
			username: process.env.NEXT_PUBLIC_WORDPRESS_AUTH_USER,
			password: process.env.NEXT_PUBLIC_WORDPRESS_AUTH_PASS,
		};
	}

	try {
		const { data } = await axios.get(processedUrl, options);
		return data;
	} catch (error) {
		console.error(`${error.code} ${error.message} on URL ${processedUrl}`);
		return process.exit(1);
	}
};

export default getFromWordpress;
