/* eslint-disable import/prefer-default-export */

import React, { useState, useEffect } from "react";
import axios from "axios";

export function useResourcesList(category) {
	const [targetCategory, setTargetCategory] = useState(category);
	const [resources, setResources] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/resources?category=${category}`);
			setResources(data);
		};
		fetchData();
	}, [targetCategory]);

	return [resources, setTargetCategory];
}
