import { QueryType } from "../types"
// Small funciton to convert from queryParams to queryString
// eslint-disable-next-line import/prefer-default-export
export const buildQueryString = (queryParams: QueryType) => {
	let queryString = ""
	// Builds query string by going through each queryParam
	Object.entries(queryParams).forEach(item => {
		if (item[1] !== "") {
			queryString += `&${item[0]}=${item[1]}`
		}
	})
	return queryString
}
