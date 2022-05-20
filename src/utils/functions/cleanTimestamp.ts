export const cleanTimestamp = (date: string) => {
	const result = date.substring(0, 16) + ":00.000Z";
	return result;
};
