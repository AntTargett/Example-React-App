import React from "react";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";
import theme from "./theme";
import { themeHookType } from "../types";
// Inspired by https://medium.com/maxime-heckel/switching-off-the-lights-adding-dark-mode-to-your-react-app-with-context-and-hooks-f41da6e07269

const defaultContextData = {
	darkmode: false,
	toggle: () => {}
};

const ThemeContext = React.createContext(defaultContextData);
const useTheme = () => React.useContext(ThemeContext);

const useEffectDarkMode = () => {
	const [themeState, setThemeState] = React.useState<themeHookType>({
		darkmode: false,
		hasThemeMounted: false
	});
	React.useEffect(() => {
		const lsDark = localStorage.getItem("darkmode") === "true";
		setThemeState({
			...themeState,
			darkmode: lsDark,
			hasThemeMounted: true
		});
	}, []);

	return { themeState: themeState, setThemeState: setThemeState };
};

const ThemeProvider = ({ children }: any) => {
	const { themeState, setThemeState } = useEffectDarkMode();

	if (!themeState.hasThemeMounted) {
		return <div />;
	}

	const toggle = () => {
		const darkmode = !themeState.darkmode;
		localStorage.setItem("darkmode", JSON.stringify(darkmode));
		setThemeState({ ...themeState, darkmode });
	};

	const computedTheme = themeState.darkmode
		? theme("darkmode")
		: theme("light");

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
	);
};

export { ThemeProvider, useTheme };
