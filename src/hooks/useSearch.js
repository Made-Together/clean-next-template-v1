import useSWRImmutable from "swr/immutable";
import useStore from "~/hooks/useStore";
import useDebounce from "~/hooks/useDebounce";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useSearch() {
	const router = useRouter();
	const liveResourceSearch = useStore((state) => state.resourceSearch);
	const resourceSearch = useDebounce(
		useStore((state) => state.resourceSearch),
		1000
	);

	const { data, error } = useSWRImmutable(
		`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/search/?q=${resourceSearch}&lang=${router?.locale}`,
		fetcher
	);

	const isLoading = (!error && !data) || resourceSearch !== liveResourceSearch;
	const isError = error;

	return {
		isLoading,
		results: !isLoading && !isError ? data : [],
	};
}
