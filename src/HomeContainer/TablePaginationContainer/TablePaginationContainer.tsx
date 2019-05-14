/** @jsx jsx */
import { jsx } from "@emotion/core"
import * as React from "react"
import IconButton from "@material-ui/core/IconButton"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import { TablePaginationPropTypes } from "../../types"

// Function to check whether or not the forward page button should be disabled
const areMoreResults = (dataLength: number, pageNumber: number, results: number, limit: number, loading: boolean) => {
	const current = (pageNumber - 1) * limit + dataLength
	return loading ? false : results > current
}
// Function to check whether or not the back page button should be disabled
const areLessResults = (pageNumber: number, loading: boolean) => (loading ? false : pageNumber > 1)

const TablePagination = ({
	changePage,
	currentQueryParams,
	pieData,
	loading,
	totalResults,
	displayResults
}: TablePaginationPropTypes) => (
	<React.Fragment>
		{displayResults}
		<IconButton
			aria-label="Navigate Back a page"
			// inherits parents color
			color="inherit"
			onClick={() =>
				changePage(areLessResults(currentQueryParams._page, loading) && currentQueryParams._page - 1)
			}
			disabled={!areLessResults(currentQueryParams._page, loading)}
		>
			<KeyboardArrowLeft />
		</IconButton>
		<IconButton
			color="inherit"
			aria-label="Navigate forward a page"
			onClick={() =>
				changePage(
					areMoreResults(
						pieData ? pieData.length : 0,
						currentQueryParams._page,
						totalResults,
						currentQueryParams._limit,
						loading
					) && currentQueryParams._page + 1
				)
			}
			disabled={
				!areMoreResults(
					pieData ? pieData.length : 0,
					currentQueryParams._page,
					totalResults,
					currentQueryParams._limit,
					loading
				)
			}
		>
			<KeyboardArrowRight />
		</IconButton>
	</React.Fragment>
)

export default TablePagination
