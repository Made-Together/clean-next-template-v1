import React from "react";
import useSWRImmutable from "swr/immutable";
import { useRouter } from "next/router";
import CTA from "~/components/flexible/CTA";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function usePurpleCTA() {
	const router = useRouter();
	const { data, error } = useSWRImmutable(
		`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/post?slug=cta-purple-email-form&post_type=blocks&lang=${router?.locale}`,
		fetcher
	);

	const isLoading = !error && !data;
	const isError = error;
	return !isLoading && !isError ? data : [];
}

export default function PurpleCTA() {
	const block = usePurpleCTA();

	return block?.flexible_content && block?.flexible_content?.length > 0 ? <CTA {...block?.flexible_content[0]} /> : null;
}
