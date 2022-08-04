import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useResources({ category = "", industry = "", pageNumber, perPage = 9 }) {
	const router = useRouter();
	const { data, error } = useSWR(
		`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/post_previews?post_type=post&lang=${router?.locale || "en"}`,
		fetcher
	);
	const isLoading = !error && !data;
	const isError = error;

	if (isLoading || isError) {
		return [];
	}

	// No filtering? return all data
	if (!category.length && !industry.length) return data;

	let filteredPosts = data;

	if (category.length) {
		filteredPosts = data.filter((p) => p.categories && p.categories.filter((c) => c.slug === category).length > 0);
	}

	if (industry.length) {
		filteredPosts = filteredPosts.filter((p) => p.industry && p.industry.filter((c) => c.slug === industry).length > 0);
	}

	if (pageNumber) {
		return filteredPosts.slice(pageNumber * perPage - perPage, pageNumber * perPage);
	}

	return filteredPosts;
}
