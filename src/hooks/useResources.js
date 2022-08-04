import React, { useState, useEffect } from "react";
import axios from "axios";

function useResources() {
	const [resources, setResources] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/resource`);
			setResources(data);
		};
		fetchData();
	}, []);

	return [resources];
}

export default useResources;
