import { useState, useEffect } from "react";

export default function useCategoriesFromPosts(posts = [], taxonomyName = "") {
	const [categories, setCategories] = useState({});

	useEffect(() => {
		if (!posts.length) return;
		const cats = posts
			.map((post) => post[taxonomyName])
			.flat()
			/* deduplicate */
			.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i)
			.reduce((obj, cat) => Object.assign(obj, { [cat.name]: { ...cat } }), {});

		setCategories(cats);
	}, [posts, taxonomyName]);

	return categories;
}
