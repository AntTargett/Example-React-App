import React, { Suspense, lazy } from "react";
import {
	Route,
	Redirect,
	Switch,
	HashRouter as Router
} from "react-router-dom";
const HomeContainer = lazy(() => import("./HomeContainer/HomeContainer"));
// const ExampleRoute = lazy(() => import("./ExampleRoute/ExampleRoute"));
const App = () => {
	return (
		<Router>
			<Switch>
				<Route
					exact
					path="/"
					render={WaitingComponent(HomeContainer)}
				/>
				{/* <Route
					exact
					path="/Example"
					render={WaitingComponent(ExampleRoute)}
				/> */}
			</Switch>
		</Router>
	);
};

function WaitingComponent(Component: any) {
	return (props: any) => (
		<Suspense fallback={<div> Loading</div>}>
			<Component {...props} />
		</Suspense>
	);
}

export default App;
