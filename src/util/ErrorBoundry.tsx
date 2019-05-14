/** @jsx jsx */
import { jsx } from "@emotion/core"
import React, { Component } from "react"
import { Card, CardContent } from "@material-ui/core"
import { ErrorBoundaryProps, ErrorBoundaryState } from "../types"
import { Flex } from "./commonComponents"
// To catch errors and display a fallback UI.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: Readonly<ErrorBoundaryProps>) {
		super(props)
		this.state = { hasError: false, errorMessage: "" }
	}

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error: any, info: any) {
		// Sets the error to the state
		this.setState({ errorMessage: info, hasError: true })
	}

	render() {
		const { errorMessage, hasError } = this.state
		const { children } = this.props
		if (hasError) {
			// Fallback when there is an erro
			return (
				<Flex style={{ justifyContent: "center", alignContent: "center" }}>
					<Card>
						<CardContent>
							<Flex style={{ flexDirection: "column" }}>
								<div>Something went wrong :( </div>
								<div>
									Please raise an issue at{" "}
									<a href="https://github.com/AntTargett/Example-React-App"> Github page</a>{" "}
								</div>
								<div>Error Message: {errorMessage}</div>
							</Flex>
						</CardContent>
					</Card>
				</Flex>
			)
		}
		//Will render children if no error
		return children
	}
}

export default ErrorBoundary
