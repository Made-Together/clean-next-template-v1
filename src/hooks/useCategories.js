import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useCategories() {
	const router = useRouter();
	const { data, error } = useSWRImmutable(`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/wp/v2/categories?lang=${router?.locale || "en"}`, fetcher);
	const isLoading = !error && !data;
	const isError = error;

	return !isLoading && !isError ? data : [];
}
