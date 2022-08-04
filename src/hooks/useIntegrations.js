import useSWRImmutable from "swr/immutable";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useStore from "~/hooks/useStore";
import useIntegrationCategories from "~/hooks/useIntegrationCategories";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useIntegrations() {
	const categories = useIntegrationCategories();
	const integrationSearch = useStore((state) => state.integrationSearch);
	const [filteredData, setFilteredData] = useState([]);
	const router = useRouter();
	const { data } = useSWRImmutable(
		`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/post_previews?post_type=integration&lang=${router?.locale}`,
		fetcher
	);

	useEffect(() => {
		if (!data || !data.length) return;
		if (window.location.hash) {
			setTimeout(() => {
				const element = document.querySelector(window.location.hash);
				if (element && window.scrollY === 0) {
					element.scrollIntoView();
				}
			}, 200);
		}
	}, [data]);

	useEffect(() => {
		const catIds = categories.map((c) => c.id);

		setFilteredData(
			data
				? Object.values(
						data
							.filter((post) => {
								if (!integrationSearch) return true;
								return post.post_title.toLowerCase().includes(integrationSearch.toLowerCase());
							})
							.reduce((result, item) => {
								item.integration_category.forEach((c) => {
									if (!result[c.slug]) {
										result[c.slug] = { ...c, posts: [] };
									}
									result[c.slug]?.posts.push(item);
								});
								return result;
							}, {})
				  )
						.sort((a, b) => catIds.indexOf(a.id) - catIds.indexOf(b.id))
						.map((c) => {
							const match = categories.filter((cat) => cat.id === c.id).pop();
							const shortName = match?.acf?.short_name || c.name;
							return {
								...c,
								shortName,
							};
						})
				: []
		);
		// eslint-disable-next-line
	}, [data, integrationSearch]);

	return filteredData;
}
