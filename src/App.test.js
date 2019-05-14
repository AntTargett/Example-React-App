import React from "react"
import ReactDOM from "react-dom"
import { render, fireEvent, cleanup, waitForElement } from "react-testing-library"
import "jest-dom/extend-expect"
import "react-testing-library/cleanup-after-each"
import App from "./App"

describe("<App /> spec", () => {
	it("App Renders without rashing", () => {
		const div = document.createElement("div")
		ReactDOM.render(<App />, div)
		ReactDOM.unmountComponentAtNode(div)
	})
	test("Snapshot Test", () => {
		const { container } = render(<App />)
		expect(container.firstChild).toMatchSnapshot()
	})
	
	it("renders table title", async () => {
		const { getByText } = render(<App />)
		//checks title exists
		await waitForElement(() => getByText(/Pies of the day Total Results/))
		//checks url link exists
		await waitForElement(() => getByText(/Test Lazy loaded route/))
	})
})
