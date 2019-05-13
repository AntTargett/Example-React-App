import { useState, useEffect } from "react"

// Debounce Hook inspired by https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
// Aim is to use the hook to watch a value for changes and only update after the timer finishes
// Will reset timer on chnage
const useDebounce = (value: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)
		return () => {
			// Resetting timer
			clearTimeout(handler)
		}
	}, [value])

	return debouncedValue
}

export default useDebounce
