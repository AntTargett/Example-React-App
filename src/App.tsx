/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Suspense, lazy } from "react"
import { Route, Switch, HashRouter as Router } from "react-router-dom"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Flex } from "./util/commonComponents"
/** @jsx jsx */
import { jsx } from "@emotion/core"
const HomeContainer = lazy(() => import("./HomeContainer/HomeContainer"))
const ExampleRoute = lazy(() => import("./ExampleRoute/ExampleRoute"))

// Function that wraps the component in a React Suspense component. Provides a fallback Loading screen
const WaitingComponent = (Component: any) => {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return (props: any) => (
		<Suspense
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

const App = () => (
	<Router>
		<Switch>
			<Route exact path="/" render={WaitingComponent(HomeContainer)} />
			<Route exact path="/Example" render={WaitingComponent(ExampleRoute)} />
		</Switch>
	</Router>
)

export default App
