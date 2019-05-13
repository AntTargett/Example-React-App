import { QueryType } from "../types"

// eslint-disable-next-line import/prefer-default-export
export const buildQueryString = (queryParams: QueryType) => {
	let queryString = ""
	Object.entries(queryParams).forEach(item => {
		if (item[1] !== "") {
			queryString += `&${item[0]}=${item[1]}`
		}
	})
	return queryString
}
