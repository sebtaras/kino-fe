export const getRowNumber = (num: number) => {
	if (num < 10) {
		return "0" + num;
	} else {
		return num.toString();
	}
};
