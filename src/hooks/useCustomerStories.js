import useSWRImmutable from "swr/immutable";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useCustomerStories() {
	const router = useRouter();
	const { data, error } = useSWRImmutable(
		`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/post_previews?post_type=customer_story&lang=${router?.locale}`,
		fetcher
	);
	const isLoading = !error && !data;
	const isError = error;
	return !isLoading && !isError ? data : [];
}
