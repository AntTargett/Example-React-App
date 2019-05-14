/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import styled from "@emotion/styled"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

// This file holds the styled components used in the Home Container

// Using emotion with Material-ui is an interesting process. Since I am not overriding injection point of css
// the && gives priority to the styles provided

// Below is an example of creating a class and then passing it back into the function
// Forwards other props back into the component
const StyledFormControlLabel = styled((other: any) => <FormControlLabel classes={{ label: "label" }} {...other} />)`
	&& {
		& .label {
			color: ${(props: any) => props.theme.body};
		}
	}
`

const StyledSwitch = styled((other: any) => (
	<Switch
		classes={{
			switchBase: "root",
			checked: "root",
			bar: "bar"
		}}
		{...other}
	/>
))`
	&& {
		& .root {
			color: ${(props: any) => props.theme.body};
		}
		& .bar {
			background-color: ${(props: any) => props.theme.body} !important;
		}
	}
`

const StyledTextField = styled((other: any) => (
	<TextField
		InputLabelProps={{
			classes: {
				root: "label"
			}
		}}
		{...other}
		InputProps={{
			className: "root",
			classes: {
				underline: "underline"
			},
			...other.InputProps
		}}
	/>
))`
	&& {
		& .root {
			color: ${(props: any) => props.theme.body} !important;
		}
		& .label {
			color: ${(props: any) => props.theme.body};
		}
		& .underline {
			border-bottom-color: ${(props: any) => props.theme.body};
			&:hover {
				border-bottom: solid 1px ${(props: any) => props.theme.body} !important;
			}
			&:after {
				border-bottom-color: ${(props: any) => props.theme.body};
			}
			&:before {
				border-bottom-color: ${(props: any) => props.theme.body};
			}
		}
	}
`
const TableHeader = styled.div`
	display: flex;
	justify-content: space-between;
`
const TableFooter = styled.div`
	display: flex;
	justify-content: flex-end;
`

const TitleSection = styled.div`
	display: flex;
	justify-content: center;
`
const MainSection = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`
const MainTitle = styled.div`
	font-size: 80px;
	max-height: 200px;
`

const Background = styled.div`
	color: ${(props: any) => props.theme.body};
	background-color: ${(props: any) => props.theme.background};
	width: 100%;
	height: 100vh;
`

export {
	StyledFormControlLabel,
	StyledTextField,
	StyledSwitch,
	Background,
	MainTitle,
	MainSection,
	TitleSection,
	TableFooter,
	TableHeader
}
