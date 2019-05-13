import React, { useState, useEffect } from "react";


// Debounce Hook inspired by [URL]
const useDebounce = (value: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value]);

	return debouncedValue;
};

export default useDebounce;
