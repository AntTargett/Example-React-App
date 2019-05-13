import React from "react"
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming"
import theme from "./theme"
import { ThemeHookType } from "../types"
// Inspired by https://medium.com/maxime-heckel/switching-off-the-lights-adding-dark-mode-to-your-react-app-with-context-and-hooks-f41da6e07269

// Default data for the context
const defaultContextData = {
	darkmode: false,
	toggle: () => {}
}

// Creating context
const ThemeContext = React.createContext(defaultContextData)
// Usetheme hook to be used throughout the app to update the theme
const useTheme = () => React.useContext(ThemeContext)

// useEffectHook to store the current setting in local storage. This allows for persistance of chosen mode.
const useEffectDarkMode = () => {
	const [themeState, setThemeState] = React.useState<ThemeHookType>({
		darkmode: false,
		hasThemeMounted: false
	})
	React.useEffect(() => {
		// Storing to local storage. Allows users to refresh and not have their eyes be destroyed by the brightness of light mode
		const isDark = localStorage.getItem("darkmode") === "true"
		setThemeState({
			...themeState,
			darkmode: isDark,
			hasThemeMounted: true
		})
	}, [])

	return { themeState, setThemeState }
}

// The Context provider
const ThemeProvider = ({ children }: any) => {
	const { themeState, setThemeState } = useEffectDarkMode()

	if (!themeState.hasThemeMounted) {
		return <div />
	}
	// Toggle between modes
	const toggle = () => {
		const darkmode = !themeState.darkmode
		// Updating the local storage
		localStorage.setItem("darkmode", JSON.stringify(darkmode))
		setThemeState({ ...themeState, darkmode })
	}

	const computedTheme = themeState.darkmode ? theme("darkmode") : theme("light")

	return (
		<EmotionThemeProvider theme={computedTheme}>
			<ThemeContext.Provider
				value={{
					darkmode: themeState.darkmode,
					toggle
				}}
			>
				{children}
			</ThemeContext.Provider>
		</EmotionThemeProvider>
	)
}

export { ThemeProvider, useTheme }
