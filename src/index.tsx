// libs
import React from "react"
import ReactDOM from "react-dom"
import NoSsr from "@material-ui/core/NoSsr"
import { ThemeProvider } from "./Theme/ThemeContext"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import "./index.css"
/** @jsx jsx */
import { jsx } from "@emotion/core"
ReactDOM.render(
	<NoSsr>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</NoSsr>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
