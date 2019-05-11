import { QueryType } from "../types";

export const buildQueryString = (queryParams: QueryType) => {
	let queryString = "";
	Object.entries(queryParams).forEach(item => {
		if (item[1] != "") {
			queryString += `&${item[0]}=${item[1]}`;
		}
	});
	return queryString;
};
