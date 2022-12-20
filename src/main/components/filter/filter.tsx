import type { CollatedData, FilterComponent, Filters } from "@types";
import { createRef, useEffect, useState } from "react";

import { ExternalClickHandler } from "../../../hooks/externalClickHandler";
import FilterButton from "./filter-button";

const Filter = ({ collatedData, filters, filteredData, setFilteredData, setCurrentPage, setFilters }: FilterComponent) => {
    const [filter, showFilter] = useState<boolean>(false);

    useEffect(() => {
        let filteredItems: CollatedData[] = [...collatedData];
        const { collection, content, query } = filters;

        if (content.length > 0) {
            filteredItems = [...filteredItems.filter((item) => content.includes(item.content))];
        }

        // TODO -> Better way of doing this
        switch (true) {
            case collection.includes("complete"):
                filteredItems = [...filteredItems.filter(({ achieved }) => achieved === 1)];
                break;
            case collection.includes("incomplete"):
                filteredItems = [...filteredItems.filter(({ achieved }) => achieved === 0)];
                break;
            case collection.includes("daily"):
                filteredItems = [...filteredItems.filter(({ helper }) => /^(.*?)daily(.*?)$/gi.test(helper))];
                break;
            case collection.includes("challenge"):
                filteredItems = [...filteredItems.filter(({ helper }) => /^(.*?)challenge\s#\d{2}(.*?)$/g.test(helper))];
                break;
            default:
                break;
        }

        if (query) {
            try {
                const find = new RegExp(`${query}`, "gi");
                filteredItems = [...filteredItems.filter(({ displayName, helper }) => displayName.match(find) || helper.match(find))];
            } catch (e) {
                // TODO -> SANITISE input, or handle response better
                console.log("BAD OUTPUT");
            }
        }

        return setFilteredData(filteredItems);
    }, [filters, setFilteredData, collatedData]);

    // TODO -> Make these 3 functions *GENERIC*
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

    const handleContent = (filter: string) => {
        const { content } = filters;
        setCurrentPage(0);
        if (content.includes(filter)) {
            return setFilters((filters: Filters) => ({
                ...filters,
                content: content.filter((f) => f !== filter),
            }));
        }
        return setFilters((filters: Filters) => ({
            ...filters,
            content: [...content, filter],
        }));
    };

    const filterElement = createRef<HTMLDivElement>();
    ExternalClickHandler(filterElement, showFilter);

    return (
        <div className="text-xs font-medium flex items-center w-auto">
            <div ref={filterElement} className="relative z-20 flex flex-row">
                <button
                    onClick={() => showFilter(!filter)}
                    className={`bg-slate-100 dark:bg-zinc-900 ${
                        filter
                            ? "border-b-2 border-sky-400 dark:border-sky-400 bg-slate-200"
                            : "border border-slate-300 dark:border-zinc-900 "
                    } text-xs uppercase font-medium flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-200 dark:hover:text-slate-900 rounded px-2 shadow`}
                >
                    <span>Filter</span>
                    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m4.5 7.5h12" />
                            <path d="m6.5 10.5h8" />
                            <path d="m8.5 13.5h4" />
                        </g>
                    </svg>
                </button>
                {filters.query && (
                    <FilterButton
                        {...{
                            handler: handleQuery,
                            filter: filters.query,
                            inline: true,
                        }}
                    />
                )}
                {filters.content.map((filterBy) => (
                    <FilterButton
                        key={`${filterBy}-inline-filters`}
                        {...{
                            handler: handleContent,
                            filter: filterBy,
                            inline: true,
                        }}
                    />
                ))}
                {filters.collection.map((filterBy) => (
                    <FilterButton
                        key={`${filterBy}-inline-filters`}
                        {...{
                            handler: handleFilters,
                            filter: filterBy,
                            inline: true,
                        }}
                    />
                ))}
                {!!filters.pagination && (
                    <FilterButton
                        {...{
                            handler: handlePagination,
                            filter: filters.pagination,
                            inline: true,
                        }}
                    />
                )}

                <div hidden={!filter} className="animate-fadeIn absolute top-5 w-auto fade-in">
                    <div className="text-sm my-2 bg-slate-100 border border-slate-300 dark:border-zinc-900 dark:bg-zinc-900 rounded p-4 w-56 shadow">
                        <input
                            className="border font-light placeholder:text-black dark:placeholder:text-white rounded w-full mb-3 px-2 p-1 dark:bg-slate-800 dark:text-white"
                            placeholder="search"
                            onChange={({ target }) =>
                                setFilters((filters: Filters) => ({
                                    ...filters,
                                    query: target.value,
                                }))
                            }
                            value={filters.query || ""}
                        />
                        <div className="">
                            <hr className="mb-2" />
                            <div className="grid grid-rows-auto grid-cols-2 gap-2">
                                {filters.contentOpts.map((filterBy) => (
                                    <FilterButton
                                        key={`${filterBy}-filters`}
                                        {...{
                                            handler: handleContent,
                                            filter: filterBy,
                                            active: filters.content.includes(filterBy),
                                        }}
                                    />
                                ))}
                            </div>
                            <hr className="my-2" />
                            <div className="grid grid-rows-auto grid-cols-2 gap-2">
                                {filters.collectionOpts.map((filterBy) => (
                                    <FilterButton
                                        key={`${filterBy}-filters`}
                                        {...{
                                            handler: handleFilters,
                                            filter: filterBy,
                                            active: filters.collection.includes(filterBy),
                                        }}
                                    />
                                ))}
                            </div>
                            <hr className="my-2" />
                            <div className="grid grid-rows-2 grid-cols-2 gap-2">
                                {filters.paginationOpts.map((itemsPerPage) => (
                                    <FilterButton
                                        key={`${itemsPerPage}-pagination`}
                                        {...{
                                            handler: handlePagination,
                                            filter: itemsPerPage,
                                            active: filters.pagination === itemsPerPage,
                                        }}
                                    />
                                ))}
                            </div>
                            <hr className="my-2" />
                            <span className="flex items-center">
                                <input
                                    id="icon-only"
                                    type="checkbox"
                                    onChange={({ target }) =>
                                        setFilters((filters: Filters) => ({
                                            ...filters,
                                            iconsOnly: target.checked,
                                        }))
                                    }
                                    checked={filters.iconsOnly}
                                />
                                <label htmlFor="icon-only" className="mx-2">
                                    Icons only?
                                </label>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
