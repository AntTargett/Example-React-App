const white = "#FFFFFF"
const black = "#161617"
const gray = "#F8F8F9"

// Light theme
const themeLight = {
	background: gray,
	body: black
}

// Dark theme
const themeDark = {
	background: black,
	body: white
}

//Based on currently set mode return the dark or light theme
const theme = (mode: string) => (mode === "darkmode" ? themeDark : themeLight)

export default theme
