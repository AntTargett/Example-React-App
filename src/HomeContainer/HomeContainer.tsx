import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import posed, { PoseGroup } from "react-pose";
import SplitText from "react-pose-text";
import Table from "react-material-table";
import {
	Pie,
	PieWithStore,
	StoreData,
	StoreDataWithPie,
	TableRowData,
	DelayType,
	QueryType
} from "../types";

const charPoses = {
	exit: { opacity: 0, y: 20 },
	enter: {
		opacity: 1,
		y: 0,
		delay: ({ charIndex }: DelayType) => charIndex * 70
	}
};
const mapData = (data: PieWithStore[]) => {
	const displayData: TableRowData[] = [];
	data.forEach((pieItem: PieWithStore) => {
		const TableRowData: TableRowData = {
			displayName: pieItem.displayName,
			storeName: pieItem.store.displayName,
			price: pieItem.price,
			priceString: pieItem.priceString,
			address: pieItem.store.address,
			quantity: pieItem.quantity,
			rating: pieItem.store.rating,
			contact: pieItem.store.mobile
		};
		displayData.push(TableRowData);
	});
	return displayData;
};

const buildQueryString = (queryParams: QueryType) => {
	let queryString = "";
	Object.entries(queryParams).forEach(item => {
		if (item[1] != "") {
			queryString += `&${item[0]}=${item[1]}`;
		}
	});
	return queryString;
};

const HomeContainer = () => {
	const [pieData, setPieData] = useState<TableRowData[]>();
	const [loading, setLoading] = useState(true);
	const [totalResults, setTotalResults] = useState(0);
	const [currentQueryParams, setQueryParams] = useState<QueryType>({
		_order: "",
		_sort: "",
		displayName: "",
		_page: 1
	});
	const baseUrl =
		"https://pie.now.sh/pies?_expand=store&_limit=5&isPieOfTheDay=true";

	useEffect(() => {
		axios
			.get(baseUrl+ buildQueryString(currentQueryParams))
			.then((result: { data: PieWithStore[]; headers: any }) => {
				const displayData = mapData(result.data);
				setTotalResults(result.headers["x-total-count"]);
				setPieData(displayData);
				setLoading(false);
			});
	}, []);
	const searchFunction = (query: string) => {
		setLoading(true);
		const queryParams = currentQueryParams;
		queryParams.displayName = query;
		setQueryParams(queryParams);
		axios
			.get(baseUrl + buildQueryString(queryParams))
			.then((result: { data: PieWithStore[] }) => {
				const displayData = mapData(result.data);
				setPieData(displayData);
				setLoading(false);
			});
	};
	const sortFunction = (columnName: string, order?: string) => {
		setLoading(true);
		const queryParams = currentQueryParams;
		queryParams._sort = columnName;
		queryParams._order = order ? order : "";
		setQueryParams(queryParams);

		axios
			.get(baseUrl + buildQueryString(queryParams))
			.then((result: { data: PieWithStore[] }) => {
				const displayData = mapData(result.data);
				setPieData(displayData);
				setLoading(false);
			});
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

	};
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
				<TableHeader>
					Total Results: {totalResults}
					Displaying Results: {getDisplayResults()}
					<input />
					<button>Previous Page</button>
					<button>Next Page</button>
				</TableHeader>
				<Table
					data={pieData ? pieData : []}
					columns={columns}
					loading={loading}
					sortCallback={({ dataName, order }) => {
						sortFunction(dataName, order);
					}}
				/>
				<TableFooter>
					<button>Previous Page</button>
					<button>Next Page</button>
				</TableFooter>
			</MainSection>
		</Background>
	);
};
const TableHeader = styled.div`
	display: flex;
`;
const TableFooter = styled.div`
	display: flex;
`;

const TitleSection = styled.div`
	display: flex;
	justify-content: center;
`;
const MainSection = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`;
const MainTitle = styled.div`
	font-size: 80px;
	max-height: 200px;
`;
const Background = styled.div`
	width: 100%;
	height: 100vh;
`;
export default HomeContainer;
