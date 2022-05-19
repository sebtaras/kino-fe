import { timestampToDate } from "./timestampToDate";

export const getDate = (addDays: number) => {
	const date = new Date();
	date.setDate(date.getDate() + addDays);
	return timestampToDate(date.toISOString());
};
