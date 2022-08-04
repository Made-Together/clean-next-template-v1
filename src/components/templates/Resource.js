/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Layout } from "~/components/templates/Layout";
import LinkButton from "~/components/elements/buttons/LinkButton";
import Link from "next/link";
import LinkedInIcon from "~/components/elements/icons/LinkedInIcon";
import TwitterIcon from "~/components/elements/icons/TwitterIcon";
import { useDate } from "../../hooks/useDate";

export default function Resource(props) {
	const { post_date, taxonomies, post_title, featured_image, post_content, customer } = props;
	// eslint-disable-next-line react/destructuring-assignment
	const [publishDate] = useDate(post_date);
	const [domain, setDomain] = useState(null);

	useEffect(() => {
		setDomain(`${window.location.href}`);
	}, []);

	return <Layout page={props} />;
}
