export type Review = {
	id: number;
	userId: number;
	userName: string;
	filmId: number;
	score: number;
	text: string;
	createdAt: string;
};

export type Screening = {
	basePrice: number;
	endAt: string;
	startAt: string;
	filmId: number;
	hallId: number;
	id: number;
	seatRows: Row[];
};

export type Row = {
	row: number;
	seats: Seat[];
};

export type Seat = {
	id: number;
	number: number;
	type: string;
	priceCoefficient: number;
	isAvailable: boolean;
};

export type SeatWithRow = Seat & { row: number };

export type FilmInfo = {
	id: number;
	title: string;
	durationMinutes: number;
	genres: string[];
	averageScore: number;
	reviews: Review[];
	screenings: Screening[];
	description: string;
	imageUrl: string;
};

export type Hall = {
	id: number;
	name: string;
	capacity: number;
};
