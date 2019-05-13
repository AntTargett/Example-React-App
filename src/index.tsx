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
		{/* Wrapping the App in the theme provider*/}
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</NoSsr>,
	document.getElementById("root")
)

serviceWorker.unregister()
