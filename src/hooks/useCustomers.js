import React, { useState, useEffect } from "react";
import axios from "axios";

function useCustomers() {
	const [customers, setCustomers] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}/wp-json/together/customers`);
			setCustomers(data);
		};
		fetchData();
	}, []);

	return [customers];
}

export default useCustomers;
