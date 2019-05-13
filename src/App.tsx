import React, { Suspense, lazy } from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Flex } from "./util/commonComponents";
const HomeContainer = lazy(() => import("./HomeContainer/HomeContainer"));
const ExampleRoute = lazy(() => import("./ExampleRoute/ExampleRoute"));

const App = () => {
	return (
		<Router>
			<Switch>
				<Route
					exact
					path="/"
					render={WaitingComponent(HomeContainer)}
				/>
				<Route
					exact
					path="/Example"
					render={WaitingComponent(ExampleRoute)}
				/>
			</Switch>
		</Router>
	);
};

//Function that wraps the component in a React Suspense component. Provides a fallback Loading screen
function WaitingComponent(Component: any) {
	return (props: any) => (
		<Suspense
			fallback={
				<Flex style={{justifyContent: "center"}}>
					<CircularProgress />
				</Flex>
			}
		>
			<Component {...props} />
		</Suspense>
	);
}

export default App;
