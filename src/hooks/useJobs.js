import useSWRImmutable from "swr/immutable";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useJobs() {
	const { data, error } = useSWRImmutable(`/api/jobs`, fetcher);
	const isLoading = !error && !data;
	const isError = error;

	return !isLoading && !isError ? data : [];
}
