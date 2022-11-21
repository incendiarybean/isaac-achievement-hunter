import { Error, Filter, Loader, Pagination, Statistics, Table } from "./";

import FirstLoadHandler from "../hooks/firstLoadHandler";
import type { MainComponent } from "@types";

const Body = ({ credentials }: MainComponent) => {
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
    } = FirstLoadHandler(credentials);

    if (error) {
        return <Error {...{ credentials }} />;
    }

    if (status.stage < 3) {
        return <Loader {...{ ...status }} />;
    }

    return (
        <div>
            <div className="p-5 text-left flex flex-col">
                <h1 className="text-2xl uppercase leading-tight mb-2">
                    Steam Achievements!
                </h1>
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
            </div>
            <div>
                <Statistics
                    {...{
                        ...status,
                        collatedData,
                        credentials,
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
