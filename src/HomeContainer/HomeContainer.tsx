/** @jsx jsx */
import { jsx } from "@emotion/core"

import { useState, useEffect } from "react"
import axios from "axios"
import SplitText from "react-pose-text"
// react-material-table is a package that I co-authored https://github.com/nwaywood/react-material-table
import Table from "react-material-table"
import SearchIcon from "@material-ui/icons/Search"
import { withTheme } from "emotion-theming"
import { useTheme } from "../Theme/ThemeContext"
import TablePagination from "./TablePagination"
import useDebounce from "../util/useDebounce"
import ErrorBoundary from "../util/ErrorBoundry"
import mapData from "../util/mapData"
import { buildQueryString } from "../util/util"
import {
	StyledFormControlLabel,
	StyledTextField,
	Background,
	MainTitle,
	MainSection,
	TitleSection,
	TableFooter,
	TableHeader,
	StyledSwitch
} from "./styled"

import { TableRowData, DelayType, QueryType, EventType } from "../types"

const charPoses = {
	exit: { opacity: 0, y: 20 },
	enter: {
		opacity: 1,
		y: 0,
		delay: ({ charIndex }: DelayType) => charIndex * 70
	}
}

const HomeContainer = () => {
	const [pieData, setPieData] = useState<TableRowData[]>()
	const [searchTerm, setSearchTerm] = useState("")
	const [loading, setLoading] = useState(true)
	const [totalResults, setTotalResults] = useState(0)
	const themeState = useTheme()
	const [currentQueryParams, setQueryParams] = useState<QueryType>({
		_order: "",
		_sort: "",
		displayName: "",
		_page: 1,
		_limit: 5
	})
	const baseUrl = "https://pie.now.sh/pies?_expand=store&isPieOfTheDay=true"
	const getPies = async (queryParams: QueryType) => {
		setLoading(true)
		const result = await axios.get(baseUrl + buildQueryString(queryParams))
		const displayData = mapData(result.data)
		setPieData(displayData)
		setTotalResults(result.headers["x-total-count"])
		setLoading(false)
	}
	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	// Waits for a change for debounched search term. Aim is to wait for user to stop typing before firing next api call.
	useEffect(() => {
		getPies(currentQueryParams)
	}, [debouncedSearchTerm])

	const searchFunction = (query: string) => {
		setLoading(true)
		const queryParams = currentQueryParams
		queryParams.displayName = query
		setQueryParams(queryParams)
		setSearchTerm(query)
	}
	const sortFunction = (columnName: string, order?: string) => {
		setLoading(true)
		const queryParams = currentQueryParams
		queryParams._sort = columnName
		queryParams._order = order || ""
		setQueryParams(queryParams)
		getPies(queryParams)
	}

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
	const getDisplayResults = () => {
		const pieDataLength = pieData ? pieData.length : 0
		const from = (currentQueryParams._page - 1) * currentQueryParams._limit
		const to = from + pieDataLength

		return `${from} to ${to}`
	}

	const changePage = (pageNumber: number) => {
		const queryParams = currentQueryParams
		queryParams._page = pageNumber
		setQueryParams(queryParams)
		getPies(queryParams)
	}

	return (
		<ErrorBoundary>
			<Background>
				<TitleSection>
					<MainTitle>
						<SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
							Example React App
						</SplitText>
					</MainTitle>
				</TitleSection>
				<MainSection>
					<StyledFormControlLabel
						control={
							<StyledSwitch
								checked={themeState.darkmode}
								onChange={() => {
									themeState.toggle()
								}}
								value="darkmode"
							/>
						}
						label="DarkMode"
					/>
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
			</Background>
		</ErrorBoundary>
	)
}

export default withTheme(HomeContainer)
