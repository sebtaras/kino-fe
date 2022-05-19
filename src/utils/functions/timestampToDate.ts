export const timestampToDate = (timestamp: string) => {
	try {
		const parts = timestamp.split("T");
		const date = parts[0].split("-");
		return date.reverse().join(".");
	} catch (e) {
		return "N/A";
	}
};
