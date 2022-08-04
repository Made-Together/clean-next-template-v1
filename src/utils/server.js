import axios from "axios";

export const getFromWordpress = async (url = "") => {
	const date = new Date();
	const dateStr =
		process.env.NODE_ENV === "production" ? `${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes().toString()}` : +new Date();
	const randomCacheString = url.includes("?") ? `&${dateStr}` : `?${dateStr}`;
	const processedUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/${url}${randomCacheString}`;

	try {
		const { data } = await axios.get(processedUrl);
		return data;
	} catch (error) {
		console.error(`${error.code} ${error.message} on URL ${processedUrl}`);
		return process.exit(1);
	}
};

export default getFromWordpress;
