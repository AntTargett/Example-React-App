import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import posed, { PoseGroup } from "react-pose";
import SplitText from "react-pose-text";
import Table from "react-material-table";

type Pie = {
	storeId: number;
	displayName: string;
	quantity: number;
	price: number;
	priceString: string;
	isPieOfTheDay?: boolean;
};

type StoreData = {
	title: string;
	displayName: string;
	address: string;
	rating: number;
	pies: Pie[];
	mobile: string;
};
type PieData = {
	data: StoreData[];
};

type TableRowData = {
	pieName: string;
	storeName: string;
	price: number;
	priceString: string;
	address: string;
	quantity: number;
	rating: number;
	contact: string;
};

type DelayType = {
	charIndex: number;
};

const columns = [
	{
		dataName: "pieName",
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
const charPoses = {
	exit: { opacity: 0, y: 20 },
	enter: {
		opacity: 1,
		y: 0,
		delay: ({ charIndex }: DelayType) => charIndex * 70
	}
};
const HomeContainer = () => {
	const [hovering, setHovering] = useState(false);
	const [pieData, setPieData] = useState<TableRowData[]>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios;
		axios
			.get("https://pie.now.sh/stores?_embed=pies&_page=2&_limit=5")
			.then((data: PieData) => {
				const displayData: TableRowData[] = [];
				data.data.forEach((storeItem: StoreData) => {
					storeItem.pies.forEach((pie: Pie) => {
						const TableRowData: TableRowData = {
							pieName: pie.displayName,
							storeName: storeItem.displayName,
							price: pie.price,
							priceString: pie.priceString,
							address: storeItem.address,
							quantity: pie.quantity,
							rating: storeItem.rating,
							contact: storeItem.mobile
						};
						displayData.push(TableRowData);
					});
				});

				setPieData(displayData);
				setLoading(false);
			});
	}, []);
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
				<Table
					data={pieData ? pieData : []}
					columns={columns}
					loading={loading}
				/>
				<TableFooter>
					<button>Previous Page</button>
					<button>Next Page</button>
				</TableFooter>
			</MainSection>
		</Background>
	);
};
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
	color: white;
	height: 100vh;
	background-image: radial-gradient(#615f5f, #4e4d4d);
`;
export default HomeContainer;
