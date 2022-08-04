/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import axios from "axios";

export function usePost(post_slug) {
	const [post, setPost] = useState();

	useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/post?slug=${post_slug}`);
      setPost(data);
    }
		fetchData();
	}, []);

	return [post, setPost];
}
