// pages/api/revalidate.js
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
import { withSentry } from "@sentry/nextjs";

const handler = async (req, res) => {
	if (!req.query.url) return res.status(500).send("No url provided");

	const { url } = req.query;
	const urlWithTrailingSlash = url.slice(-1) === "/" ? url : `${url}/`;

	try {
		await res.revalidate(urlWithTrailingSlash);
		return res.json({ revalidated: true });
	} catch (err) {
		console.log(err);
		return res.status(500).send("Error revalidating");
	}
};

export default withSentry(handler);
