// /** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import styled from "@emotion/styled"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

import IconButton from "@material-ui/core/IconButton"

const StyledIconButton = styled(other => <IconButton classes={{ root: "label" }} {...other} />)`
	&& {
		& .label {
			color: ${props => props.theme.body};
		}
	}
`

const StyledFormControlLabel = styled(other => <FormControlLabel classes={{ label: "label" }} {...other} />)`
	&& {
		& .label {
			color: ${props => props.theme.body};
		}
	}
`

const StyledSwitch = styled(other => (
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
			color: ${props => props.theme.body};
		}
		& .bar {
			background-color: ${props => props.theme.body} !important;
		}
	}
`

const StyledTextField = styled(other => (
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
			color: ${props => props.theme.body} !important;
		}
		& .label {
			color: ${props => props.theme.body};
		}
		& .underline {
			border-bottom-color: ${props => props.theme.body};
			&:hover {
				border-bottom: solid 1px ${props => props.theme.body} !important;
			}
			&:after {
				border-bottom-color: ${props => props.theme.body};
			}
			&:before {
				border-bottom-color: ${props => props.theme.body};
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
	TableHeader,
	StyledIconButton
}
