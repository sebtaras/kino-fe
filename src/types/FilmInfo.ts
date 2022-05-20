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
	seats?: Seat[];
};

export type Seat = {
	id: number;
	number: number;
	row: number;
	type: string;
	priceCoefficient: number;
	isAvailable: boolean;
};

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
