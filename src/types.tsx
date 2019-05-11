export type Pie = {
	storeId: number;
	displayName: string;
	quantity: number;
	price: number;
	priceString: string;
	isPieOfTheDay?: boolean;
};
export interface PieWithStore extends Pie {
	store: StoreData;
}
export type StoreData = {
	title: string;
	displayName: string;
	address: string;
	rating: number;
	mobile: string;
};
export type QueryType = {
	_page: number;
	_order: string;
	_sort: string;
	displayName: string;
};
export interface StoreDataWithPie extends Pie {
	pies: Pie[];
}

export type TableRowData = {
	displayName: string;
	storeName: string;
	price: number;
	priceString: string;
	address: string;
	quantity: number;
	rating: number;
	contact: string;
};

export type DelayType = {
	charIndex: number;
};
