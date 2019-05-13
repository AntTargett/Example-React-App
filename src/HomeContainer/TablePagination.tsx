import React, { useState, useEffect } from "react";
import { QueryType, TableRowData } from "../types";
import IconButton from "@material-ui/core/IconButton";
import { StyledKeyboardArrowLeft , StyledKeyboardArrowRight} from "./styled";

type TablePaginationPropTypes = {
	changePage: Function;
	totalResults: number;
	currentQueryParams: QueryType;
	pieData: TableRowData[];
	loading: boolean;
	displayResults: string;
};

const areMoreResults = (
	dataLength: number,
	pageNumber: number,
	results: number,
	limit: number,
	loading: boolean
) => {
	var current = (pageNumber - 1) * limit + dataLength;
	return loading ? false : results > current;
};
const areLessResults = (pageNumber: number, loading: boolean) => {
	return loading ? false : pageNumber > 0;
};
const TablePagination = ({
	changePage,
	currentQueryParams,
	pieData,
	loading,
	totalResults,
	displayResults
}: TablePaginationPropTypes) => {
	return (
		<div>
			{displayResults}
			<IconButton
				onClick={() =>
					changePage(
						areLessResults(currentQueryParams._page, loading) &&
							currentQueryParams._page - 1
					)
				}
				disabled={!areLessResults(currentQueryParams._page, loading)}
			>
				<StyledKeyboardArrowLeft />
			</IconButton>
			<IconButton
				onClick={() =>
					changePage(
						areMoreResults(
							pieData ? pieData.length : 0,
							currentQueryParams._page,
							totalResults,
							currentQueryParams._limit,
							loading
						) && currentQueryParams._page + 1
					)
				}
				disabled={
					!areMoreResults(
						pieData ? pieData.length : 0,
						currentQueryParams._page,
						totalResults,
						currentQueryParams._limit,
						loading
					)
				}
			>
				<StyledKeyboardArrowRight />
			</IconButton>
		</div>
	);
};


export default TablePagination;
