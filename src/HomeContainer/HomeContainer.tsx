/** @jsx jsx */
import { jsx } from "@emotion/core"

import { useState, useEffect } from "react"
import axios from "axios"
// react-material-table is a package that I co-authored https://github.com/nwaywood/react-material-table
import Table from "react-material-table"
import SearchIcon from "@material-ui/icons/Search"
import { Link } from "react-router-dom"
// Theme hook to make use of Emotion theming.
import { useTheme } from "../Theme/ThemeContext"
import TablePagination from "./TablePagination"
import useDebounce from "../util/useDebounce"
import ErrorBoundary from "../util/ErrorBoundry"
import mapData from "../util/mapData"
// Function I wrote to buld up the query string based on an Object
import { buildQueryString } from "../util/util"
// Styled components
import { StyledFormControlLabel, StyledTextField, MainSection, TableFooter, TableHeader, StyledSwitch } from "./styled"
// Commonly used component
import { Flex } from "../util/commonComponents"
// Typescript types
import { TableRowData, QueryType, EventType } from "../types"

// Used by the table to determine the column data, display name and whether they should be sorted
const columns = [
	{
		dataName: "displayName",
		title: "Pie  Name",
		sort: true
	},
	{
		dataName: "priceString",
		title: "Price",
		sort: true
	},
	{
		dataName: "quantity",
		title: "Quantity",
		sort: true
	},
	{
		dataName: "storeName",
		title: "Store Name",
		sort: true
	},
	{ dataName: "address", title: "Address", sort: true },
	{ dataName: "rating", title: "Rating", sort: true },
	{ dataName: "contact", title: "Mobile", sort: true }
]

const HomeContainer = () => {
	// Will store the data from pie.now
	const [pieData, setPieData] = useState<TableRowData[]>()
	// Search term for pie name
	const [searchTerm, setSearchTerm] = useState("")
	// Whether the page should be in a loading state
	const [loading, setLoading] = useState(true)
	// Total results from the header
	const [totalResults, setTotalResults] = useState(0)
	// Theme hook using Emotion
	const themeState = useTheme()
	// Query param object of all the query terms
	const [currentQueryParams, setQueryParams] = useState<QueryType>({
		_order: "",
		_sort: "",
		displayName: "",
		_page: 1,
		_limit: 5
	})
	// Will always be searching for pies of the day
	const baseUrl = "https://pie.now.sh/pies?_expand=store&isPieOfTheDay=true"
	// Function to get the pies. Sets loading initially and awaits the get request.
	const getPies = async (queryParams: QueryType) => {
		setLoading(true)
		const result = await axios.get(baseUrl + buildQueryString(queryParams))
		// Map data converts response data into display data
		const displayData = mapData(result.data)
		setPieData(displayData)
		setTotalResults(result.headers["x-total-count"])
		setLoading(false)
	}
	// Uses the debounce hook to wait on search term changes
	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	// Waits for a change for debounched search term. Aim is to wait for user to stop typing before firing next api call.
	useEffect(() => {
		getPies(currentQueryParams)
	}, [debouncedSearchTerm])
	// Called on input change to the search textfield
	const searchFunction = (query: string) => {
		setLoading(true)
		const queryParams = currentQueryParams
		queryParams.displayName = query
		// Updates query params
		setQueryParams(queryParams)
		setSearchTerm(query)
	}
	// Function that changes query params for the sorting
	const sortFunction = (columnName: string, order?: string) => {
		setLoading(true)
		const queryParams = currentQueryParams
		queryParams._sort = columnName
		queryParams._order = order || ""
		setQueryParams(queryParams)
		getPies(queryParams)
	}
	// Gets the current viewed range of values. Calculates this based on query params, return results and total results
	const getDisplayResults = () => {
		const pieDataLength = pieData ? pieData.length : 0
		const from = (currentQueryParams._page - 1) * currentQueryParams._limit
		const to = from + pieDataLength

		return `${from} to ${to}`
	}
	// Will change the page to any page. Intention was to use this if I had time to have page numbers down the bottom of the page
	const changePage = (pageNumber: number) => {
		const queryParams = currentQueryParams
		queryParams._page = pageNumber
		setQueryParams(queryParams)
		getPies(queryParams)
	}

	return (
		<ErrorBoundary>
			<MainSection>
				<Flex>
					<Flex style={{ flex: "1" }}>
						<StyledFormControlLabel
							control={
								<StyledSwitch
									checked={themeState.darkmode}
									onChange={() => {
										// Toggles the dark/light mode.
										themeState.toggle()
									}}
									value="darkmode"
								/>
							}
							label="DarkMode"
						/>
					</Flex>
					{/* Links to the other route to show lazy loading*/}
					<Link to="example">Test Lazy loaded route</Link>
				</Flex>
				<Table
					data={pieData || []}
					columns={columns}
					header={`Pies of the day Total Results: ${totalResults}`}
					headerCustomContent={
						<TableHeader>
							<StyledTextField
								id="search-field"
								label="Search"
								onChange={(event: EventType) => {
									searchFunction(event.target.value)
								}}
								InputProps={{
									startAdornment: <SearchIcon />
								}}
							/>
							<TablePagination
								totalResults={totalResults}
								changePage={changePage}
								pieData={pieData || []}
								loading={loading}
								currentQueryParams={currentQueryParams}
								displayResults={getDisplayResults()}
							/>
						</TableHeader>
					}
					loading={loading}
					sortCallback={({ dataName, order }: any) => {
						sortFunction(dataName, order)
					}}
				/>
				<TableFooter>
					<TablePagination
						totalResults={totalResults}
						changePage={changePage}
						pieData={pieData || []}
						loading={loading}
						currentQueryParams={currentQueryParams}
						displayResults={getDisplayResults()}
					/>
				</TableFooter>
			</MainSection>
		</ErrorBoundary>
	)
}

export default HomeContainer
