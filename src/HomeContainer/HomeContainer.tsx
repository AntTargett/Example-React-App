import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import posed, { PoseGroup } from "react-pose";
import SplitText from "react-pose-text";

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
	rating: string;
	pies: Pie[];
};
type PieData = {
	data: StoreData[];
};

type DelayType = {
	charIndex: number;
};

const HomeContainer = () => {
	const [hovering, setHovering] = useState(false);
	const [pieData, setPieData] = useState<PieData>();
	const charPoses = {
		exit: { opacity: 0, y: 20 },
		enter: {
			opacity: 1,
			y: 0,
			delay: ({ charIndex }: DelayType) => charIndex * 70
		}
	};

	useEffect(() => {
		axios;
		axios
			.get("https://pie.now.sh/stores?_embed=pies&_page=2&_limit=5")
			.then((data: PieData) => {
				setPieData(data);
			});
	}, []);
	return (
		<Background>
			<MainTitle>
				<SplitText
					initialPose="exit"
					pose="enter"
					charPoses={charPoses}
				>
					Example React App
				</SplitText>
			</MainTitle>
			<TipContainer>
				<TipBoxWithSyles
					pose={hovering ? "hovered" : "idle"}
					key="TipBox"
					onMouseEnter={() => setHovering(true)}
					onMouseLeave={() => setHovering(false)}
				>
					Box
				</TipBoxWithSyles>
			</TipContainer>
		</Background>
	);
};

const Square = posed.div({
	idle: { scale: 1 },
	hovered: { scale: 1.5 }
});

const TipBoxWithSyles = styled(Square)`
	background-color: purple;
`;

const TipContainer = styled.div`
	margin-top: 200px;
`;

const MainTitle = styled.div`
	font-size: 80px;
	max-height: 200px;
`;
const Background = styled.div`
	width: 100%;
	color: white;
	display: flex;
	justify-content: center;
	height: 100vh;
	background-image: radial-gradient(#615f5f, #4e4d4d);
`;
export default HomeContainer;
