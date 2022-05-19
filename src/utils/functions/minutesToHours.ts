export const minutesToHours = (min: number) => {
	const hours = Math.floor(min / 60);
	const mins = Math.round((min / 60 - hours) * 60);
	return hours + "h " + mins + "min";
};
