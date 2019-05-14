// All the types specified in the application.
// Would change file struture depending on scale requirements

export interface Pie {
	storeId: number
	displayName: string
	quantity: number
	price: number
	priceString: string
	isPieOfTheDay?: boolean
}
export interface StoreData {
	title: string
	displayName: string
	address: string
	rating: number
	mobile: string
}
export interface PieWithStore extends Pie {
	store: StoreData
}

export interface QueryType {
	_page: number
	_order: string
	_sort: string
	_limit: number
	displayName: string
}
export interface StoreDataWithPie extends Pie {
	pies: Pie[]
}

export interface TableRowData {
	displayName: string
	storeName: string
	price: number
	priceString: string
	address: string
	quantity: number
	rating: number
	contact: string
}

export interface DelayType {
	charIndex: number
}
export interface ThemeHookType {
	darkmode: boolean
	hasThemeMounted: boolean
}
export interface ThemeType {
	background: string
	body: string
}
export interface HomeContainerPropType {
	theme: ThemeType
}

export type TargetType = {
	value: string
}

export type EventType = {
	target: TargetType
}
export interface TablePaginationPropTypes {
	changePage: Function
	totalResults: number
	currentQueryParams: QueryType
	pieData: TableRowData[]
	loading: boolean
	displayResults: string
}

export type ErrorBoundaryProps = {
	children: any
}
export type ErrorBoundaryState = {
	hasError: boolean
	errorMessage: string
}
