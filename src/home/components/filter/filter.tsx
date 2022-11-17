import type { FilterComponent, Filters } from "@types";
import { createRef, useEffect, useState } from "react";

import { ExternalClickHandler } from "../../../hooks/externalClickHandler";

const Filter = ({
    collatedData,
    filters,
    filteredData,
    setFilteredData,
    setCurrentPage,
    setFilters,
}: FilterComponent) => {
    const [filter, showFilter] = useState<boolean>(false);

    useEffect(() => {
        let filteredItems: any = [];
        const { collection, query } = filters;
        switch (true) {
            case collection.includes("completed"):
                filteredItems = [
                    ...filteredItems,
                    ...collatedData.filter(({ achieved }) => achieved === 1),
                ];
                break;
            case collection.includes("waiting"):
                filteredItems = [
                    ...filteredItems,
                    ...collatedData.filter(({ achieved }) => achieved === 0),
                ];
                break;
            default:
                break;
        }

        if (query) {
            const find = new RegExp(`${query}`, "gi");
            filteredItems = [
                ...filteredItems,
                ...collatedData.filter(
                    ({ displayName, helper }) =>
                        displayName.match(find) || helper.match(find)
                ),
            ];
        }

        if (filteredItems.length !== 0) {
            return setFilteredData(filteredItems);
        }
        return setFilteredData(collatedData);
    }, [filters, setFilteredData, collatedData]);

    const handleFilters = (filter: string) => {
        const { collection } = filters;
        setCurrentPage(0);
        if (collection.includes(filter)) {
            return setFilters((filters: Filters) => ({
                ...filters,
                collection: collection.filter((f) => f !== filter),
            }));
        }
        return setFilters((filters: Filters) => ({
            ...filters,
            collection: [filter],
        }));
    };

    const handlePagination = (perPage: number) => {
        const { pagination } = filters;
        setCurrentPage(0);
        if (pagination === perPage) {
            return setFilters((filters: Filters) => ({
                ...filters,
                pagination: filteredData.length,
            }));
        }
        return setFilters((filters: Filters) => ({
            ...filters,
            pagination: perPage,
        }));
    };

    const handleQuery = (value: string) => {
        const { query } = filters;
        setCurrentPage(0);

        if (value === query) {
            return setFilters((filters: Filters) => ({
                ...filters,
                query: "",
            }));
        }
        return setFilters((filters: Filters) => ({ ...filters, query: value }));
    };

    const filterElement = createRef<HTMLDivElement>();
    ExternalClickHandler(filterElement, showFilter);

    return (
        <div
            className="text-xs uppercase font-medium flex items-center w-auto"
            ref={filterElement}
        >
            <div className="flex flex-row">
                <button
                    onClick={() => showFilter(!filter)}
                    className="text-xs uppercase font-medium flex items-center bg-white dark:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 rounded-full px-2 shadow"
                >
                    <span>Filter</span>
                    <svg
                        height="21"
                        viewBox="0 0 21 21"
                        width="21"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g
                            fill="none"
                            fillRule="evenodd"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m4.5 7.5h12" />
                            <path d="m6.5 10.5h8" />
                            <path d="m8.5 13.5h4" />
                        </g>
                    </svg>
                </button>
                {filters.collection.map((button) => (
                    <button
                        key={`${button}`}
                        onClick={() => handleFilters(button)}
                        className="ml-2 border flex justify-between items-center w-24 rounded-xl pl-2 border-blue-500 text-blue-500 dark:border-blue-300 dark:text-blue-300 hover:bg-red-600 hover:text-red-100 hover:border-red-600"
                    >
                        <span className="">{button}</span>
                        <svg
                            height="21"
                            viewBox="0 0 21 21"
                            width="21"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g
                                fill="none"
                                fillRule="evenodd"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m7.5 7.5 6 6" />
                                <path d="m13.5 7.5-6 6" />
                            </g>
                        </svg>
                    </button>
                ))}
                {!!filters.pagination && (
                    <button
                        onClick={() => handlePagination(filters.pagination)}
                        className="ml-2 border flex justify-between items-center w-24 rounded-xl pl-2 border-blue-500 text-blue-500 dark:border-blue-300 dark:text-blue-300 hover:bg-red-600 hover:text-red-100 hover:border-red-600"
                    >
                        {filters.pagination}
                        <svg
                            height="21"
                            viewBox="0 0 21 21"
                            width="21"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g
                                fill="none"
                                fillRule="evenodd"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m7.5 7.5 6 6" />
                                <path d="m13.5 7.5-6 6" />
                            </g>
                        </svg>
                    </button>
                )}
                {filters.query && (
                    <button
                        onClick={() => handleQuery(filters.query)}
                        className="ml-2 border flex justify-between items-center w-24 rounded-xl pl-2 border-blue-500 text-blue-500 dark:border-blue-300 dark:text-blue-300 hover:bg-red-600 hover:text-red-100 hover:border-red-600"
                    >
                        {filters.query}
                        <svg
                            height="21"
                            viewBox="0 0 21 21"
                            width="21"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g
                                fill="none"
                                fillRule="evenodd"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m7.5 7.5 6 6" />
                                <path d="m13.5 7.5-6 6" />
                            </g>
                        </svg>
                    </button>
                )}
            </div>
            <div
                hidden={!filter}
                className="absolute top-7 dark:border dark:border-blue-400 bg-white dark:bg-slate-900 rounded-lg shadow p-4"
            >
                <input
                    className="border rounded-md w-full mb-3 px-2 p-1 dark:bg-slate-800 dark:text-white"
                    placeholder="search"
                    onChange={({ target }) =>
                        setFilters((filters: Filters) => ({
                            ...filters,
                            query: target.value,
                        }))
                    }
                />
                <div className="">
                    <p className="ml-1">Options</p>
                    <hr className="mb-2" />
                    <div className="grid grid-rows-auto grid-cols-2 gap-2">
                        {filters.collectionOpts.map((button) => (
                            <button
                                key={`${button}-filters`}
                                onClick={() => handleFilters(button)}
                                className={`border w-24 rounded-xl px-2 ${
                                    filters.collection.includes(button)
                                        ? "border-green-500 text-green-500 hover:bg-green-600 hover:text-green-100"
                                        : "border-red-500 text-red-500 dark:border-red-400 dark:text-red-400 hover:bg-red-600 dark:hover:border-red-600 hover:text-red-100"
                                } `}
                            >
                                {button}
                            </button>
                        ))}
                    </div>
                    <p className="ml-1 mt-2">Items per Page</p>
                    <hr className="mb-2" />
                    <div className="grid grid-rows-3 grid-cols-2 gap-2">
                        {filters.paginationOpts.map((perPage) => (
                            <button
                                key={`${perPage}-pagination`}
                                onClick={() => handlePagination(perPage)}
                                className={`border w-24 rounded-xl px-2 ${
                                    filters.pagination === perPage
                                        ? "border-green-500 text-green-500 hover:bg-green-600 hover:text-green-100"
                                        : "border-red-500 text-red-500 hover:bg-red-600 dark:border-red-400 dark:text-red-400 dark:hover:border-red-600 hover:text-red-100"
                                } `}
                            >
                                {perPage}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
