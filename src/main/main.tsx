import { Error, Filter, Loader, Pagination, Statistics, Table } from "./";

import FirstLoadHandler from "../hooks/firstLoadHandler";
import type { MainComponent } from "@types";

const Body = ({ steamDetails }: MainComponent) => {
    const {
        status,
        collatedData,
        filteredData,
        setFilteredData,
        currentPage,
        setCurrentPage,
        currentPageData,
        setCurrentPageData,
        filters,
        setFilters,
        error,
    } = FirstLoadHandler(steamDetails);

    if (error) {
        return <Error {...{ steamDetails }} />;
    }

    if (status.stage < 3) {
        return <Loader {...{ ...status }} />;
    }

    return (
        <div className="animate-fadeIn">
            <div className="py-4 text-left flex flex-col">
                <Statistics
                    {...{
                        ...status,
                        collatedData,
                        steamDetails,
                    }}
                />
            </div>
            <div>
                <Filter
                    {...{
                        collatedData,
                        filters,
                        filteredData,
                        setFilteredData,
                        setFilters,
                        setCurrentPage,
                    }}
                />
                <Pagination
                    {...{
                        currentPage,
                        filters,
                        filteredData,
                        setCurrentPage,
                        setCurrentPageData,
                        ...status,
                        ...{ showItemCount: true },
                    }}
                />
                <div className="px-7">
                    <Table
                        {...{
                            ...status,
                            currentPageData,
                        }}
                    />
                </div>
                <Pagination
                    {...{
                        currentPage,
                        filters,
                        filteredData,
                        setCurrentPage,
                        setCurrentPageData,
                        ...status,
                    }}
                />
            </div>
        </div>
    );
};

export default Body;
