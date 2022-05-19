export const timestampToHours = (timestamp: string) => {
	try {
		const parts = timestamp.split("T");
		const date = parts[1].split(".");
		return date[0].substring(0, 5);
	} catch (e) {
		return "N/A";
	}
};
