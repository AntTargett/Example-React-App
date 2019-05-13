/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Suspense, lazy } from "react"
import { Route, Switch, HashRouter as Router } from "react-router-dom"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Flex } from "./util/commonComponents"
import ErrorBoundary from "./util/ErrorBoundry"
/** @jsx jsx */
import { jsx } from "@emotion/core"
import SplitText from "react-pose-text"
import { MainTitle, TitleSection, Background } from "./HomeContainer/styled"
import { DelayType } from "./types"
const HomeContainer = lazy(() => import("./HomeContainer/HomeContainer"))
const ExampleRoute = lazy(() => import("./ExampleRoute/ExampleRoute"))

// Function that wraps the component in a React Suspense component. Provides a fallback Loading screen
const WaitingComponent = (Component: any) => {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return (props: any) => (
		<Suspense
			// Fallback UI displays a loading spinner while rendering
			fallback={
				<Flex style={{ justifyContent: "center" }}>
					<CircularProgress />
				</Flex>
			}
		>
			<Component {...props} />
		</Suspense>
	)
}
const charPoses = {
	exit: { opacity: 0, y: 20 },
	enter: {
		opacity: 1,
		y: 0,
		delay: ({ charIndex }: DelayType) => charIndex * 70
	}
}

const App = () => (
	<ErrorBoundary>
		<Background>
			<TitleSection>
				<MainTitle>
					<SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
						Example React App
					</SplitText>
				</MainTitle>
			</TitleSection>
			{/* Router for routes*/}
			<Router>
				<Switch>
					<Route exact path="/" render={WaitingComponent(HomeContainer)} />
					<Route exact path="/Example" render={WaitingComponent(ExampleRoute)} />
				</Switch>
			</Router>
		</Background>
	</ErrorBoundary>
)

export default App
