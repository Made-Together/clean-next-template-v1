import axios from "axios";
import { withSentry } from "@sentry/nextjs";

const handler = async (req, res) => {
	const axiosClient = axios.create({
		baseURL: `https://bosonprotocol.workable.com/spi/v3/`,
		headers: {
			Authorization: `Bearer a3cbf2dba714bd39941057438d4135c33458bf391c70aa5ee96d2d6a2562b91d`,
		},
	});

	try {
		// Get list of all jobs
		const {
			data: { jobs },
		} = await axiosClient.get("/jobs", { params: { state: "published" } });
		return res.status(200).json(jobs);
	} catch (error) {
		return res.status(500);
	}
};

export default withSentry(handler);
