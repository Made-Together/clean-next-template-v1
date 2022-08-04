import React, { useState, useEffect } from "react";
import axios from "axios";

function usePositionsList() {
	const [positionList, setPositionList] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/position`);
			settingPositionList(data);
		};
		fetchData();
	}, []);

	function settingPositionList(data) {
		const tax = [];
		data.forEach((e) => {
			if (e?.taxonomies && tax.filter((f) => f.slug === e?.taxonomies[0]?.terms[0]?.slug).length) {
				const index = tax.findIndex((i) => i.slug === e?.taxonomies[0]?.terms[0]?.slug);
				tax[index]?.posts?.push(e);
			} else {
				tax.push({
					slug: e?.taxonomies[0]?.terms[0]?.slug,
					name: e?.taxonomies[0]?.terms[0]?.name,
					posts: [e],
				});
			}
		});
		setPositionList(tax);
	}

	return [positionList, setPositionList];
}

export default usePositionsList;
