import useSWRImmutable from "swr/immutable";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function usePressReleases() {
	const { data, error } = useSWRImmutable(`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/post_previews?post_type=press_release`, fetcher);
	const isLoading = !error && !data;
	const isError = error;
	return !isLoading && !isError ? data : [];
}
