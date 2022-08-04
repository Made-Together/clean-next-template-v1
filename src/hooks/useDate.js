/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import React, { useState } from "react";

export function useDate(date) {
	const [storeDate, setStoreDate] = useState(new Date(date));

	function getYear(date) {
		return date.getFullYear();
	}

	function getMonth(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		return months[date.getMonth()];
	}

	function getDate(date) {
		return date.getDate();
	}

	function setDate(date) {
		const date_obj = new Date(date);
		setStoreDate(date_obj);
	}

	return [`${getDate(storeDate)} ${getMonth(storeDate)}, ${getYear(storeDate)}`, setDate];
}
