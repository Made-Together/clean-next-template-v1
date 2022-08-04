import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useIntegrationCategories() {
	const router = useRouter();
	const { data, error } = useSWR(
		`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/wp/v2/integration_category?lang=${router?.locale || "en"}&c=1`,
		fetcher
	);
	const isLoading = !error && !data;
	const isError = error;

	return !isLoading && !isError ? data : [];
}
