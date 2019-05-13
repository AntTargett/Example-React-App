/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { Link } from "react-router-dom"

// Example Route to show lazy loading
const ExampleRoute = () => (
	<div>
		I am an Example Route <Link to="/">Back</Link>
	</div>
)

export default ExampleRoute
