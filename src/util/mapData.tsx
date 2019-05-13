import { PieWithStore, TableRowData } from "../types"

const mapData = (data: PieWithStore[]) => {
	const displayData: TableRowData[] = []
	data.forEach((pieItem: PieWithStore) => {
		const TableRow: TableRowData = {
			displayName: pieItem.displayName,
			storeName: pieItem.store.displayName,
			price: pieItem.price,
			priceString: pieItem.priceString,
			address: pieItem.store.address,
			quantity: pieItem.quantity,
			rating: pieItem.store.rating,
			contact: pieItem.store.mobile
		}
		displayData.push(TableRow)
	})
	return displayData
}

export default mapData
