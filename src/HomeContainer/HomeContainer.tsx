/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import React, { useState, useEffect } from "react";
import axios from "axios";
import SplitText from "react-pose-text";
//react-material-table is a package that I co-authored https://github.com/nwaywood/react-material-table
import Table from "react-material-table";

import Switch from "@material-ui/core/Switch";
import SearchIcon from "@material-ui/icons/Search";
import { useTheme } from "../Theme/ThemeContext";
import TablePagination from "./TablePagination";
import useDebounce from "../util/useDebounce";
import mapData from "../util/mapData";
import { buildQueryString } from "../util/util";
import {
	StyledFormControlLabel,
	StyledTextField,
	Background,
	MainTitle,
	MainSection,
	TitleSection,
	TableFooter,
	TableHeader,
	StyledSwitch,
} from "./styled";

import {
	TableRowData,
	DelayType,
	QueryType,
	HomeContainerPropType,
} from "../types";
import { withTheme } from "emotion-theming";

const charPoses = {
	exit: { opacity: 0, y: 20 },
	enter: {
		opacity: 1,
		y: 0,
		delay: ({ charIndex }: DelayType) => charIndex * 70
	}
};

const HomeContainer = (props: HomeContainerPropType) => {
	const [pieData, setPieData] = useState<TableRowData[]>();
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(true);
	const [totalResults, setTotalResults] = useState(0);
	const themeState = useTheme();
	const [currentQueryParams, setQueryParams] = useState<QueryType>({
		_order: "",
		_sort: "",
		displayName: "",
		_page: 1,
		_limit: 5
	});
	const baseUrl = "https://pie.now.sh/pies?_expand=store&isPieOfTheDay=true";
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	//Essentially component did mount
	useEffect(() => {
		getPies(currentQueryParams);
	}, []);
	// Waits for a change for debounched search term. Aim is to wait for user to stop typing before firing next api call.
	useEffect(() => {
		console.log("GETTING CALLED");
		getPies(currentQueryParams);
	}, [debouncedSearchTerm]);

	const getPies = async (queryParams: QueryType) => {
		setLoading(true);
		const result = await axios.get(baseUrl + buildQueryString(queryParams));
		const displayData = mapData(result.data);
		setPieData(displayData);
		setTotalResults(result.headers["x-total-count"]);
		setLoading(false);
	};
	const searchFunction = (query: string) => {
		setLoading(true);
		const queryParams = currentQueryParams;
		queryParams.displayName = query;
		setQueryParams(queryParams);
		setSearchTerm(query);
	};
	const sortFunction = (columnName: string, order?: string) => {
		setLoading(true);
		const queryParams = currentQueryParams;
		queryParams._sort = columnName;
		queryParams._order = order ? order : "";
		setQueryParams(queryParams);
		getPies(queryParams);
	};

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
	];
	const getDisplayResults = () => {
		const pieDataLength = pieData ? pieData.length : 0;
		var from = (currentQueryParams._page - 1) * currentQueryParams._limit;
		var to = from + pieDataLength;

		return `${from} to ${to}`;
	};

	const changePage = (pageNumber: number) => {
		const queryParams = currentQueryParams;
		queryParams._page = pageNumber;
		setQueryParams(queryParams);
		getPies(queryParams);
	};
	console.log(props.theme);
	return (
		<Background>
			<TitleSection>
				<MainTitle>
					<SplitText
						initialPose="exit"
						pose="enter"
						charPoses={charPoses}
					>
						Example React App
					</SplitText>
				</MainTitle>
			</TitleSection>
			<MainSection>
				<StyledFormControlLabel
					control={
						<StyledSwitch
							checked={themeState.darkmode}
							onChange={(event: any) => {
								themeState.toggle();
							}}
							value="darkmode"
						/>
					}
					label="DarkMode"
				/>
				<Table
					data={pieData ? pieData : []}
					columns={columns}
					header={`Pies of the day Total Results: ${totalResults}`}
					headerCustomContent={
						<TableHeader>
							<StyledTextField
								id="search-field"
								label="Search"
								onChange={(event: any) => {
									console.log(event);
									searchFunction(event.target.value);
								}}
								InputProps={{
									startAdornment: <SearchIcon />
								}}
							/>
							<TablePagination
								totalResults={totalResults}
								changePage={changePage}
								pieData={pieData ? pieData : []}
								loading={loading}
								currentQueryParams={currentQueryParams}
								displayResults={getDisplayResults()}
							/>
						</TableHeader>
					}
					loading={loading}
					sortCallback={({ dataName, order }: any) => {
						sortFunction(dataName, order);
					}}
				/>
				<TableFooter>
					<TablePagination
						totalResults={totalResults}
						changePage={changePage}
						pieData={pieData ? pieData : []}
						loading={loading}
						currentQueryParams={currentQueryParams}
						displayResults={getDisplayResults()}
					/>
				</TableFooter>
			</MainSection>
		</Background>
	);
};

export default withTheme(HomeContainer);
