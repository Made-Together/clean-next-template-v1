import React, { useEffect, useState } from "react";
import axios from "axios";

export default function usePerson(post_id) {
	const [personPostId, setPersonPostId] = useState(post_id);
	const [personData, setPersonData] = useState();

	const fetchData = async () => {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/people?id=${personPostId}`);
		setPersonData(data[0]);
	};

	useEffect(() => {
    setPersonPostId(post_id)
		fetchData();
	}, []);

	function setNewPersonPostId(id) {
		setPersonPostId(id);
		fetchData();
	}

	return [personData, setNewPersonPostId];
}
