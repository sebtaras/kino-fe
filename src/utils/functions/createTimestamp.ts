export const createTimestamp = (date: string, time: string) => {
	return date.substring(0, 11) + time + ":00.000Z";
};
