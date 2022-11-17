import type { PageRange, Pages, PaginationComponent } from "@types";
import { useEffect, useState } from "react";

const Pagination = ({
    currentPage,
    filters,
    filteredData,
    setCurrentPage,
    setCurrentPageData,
    stage,
    showItemCount = false,
}: PaginationComponent) => {
    const [pages, setPages] = useState<Pages>({});

    useEffect(() => {
        const { pagination } = filters;
        const totalPages = Math.ceil(filteredData.length / pagination);
        const pages: Pages = {};
        for (let i = 0; i < totalPages; i++) {
            const start = i * pagination;
            const end = start + pagination;
            pages[i] = filteredData.slice(start, end);
        }
        setPages(pages);
        setCurrentPageData(pages[currentPage]);
    }, [setCurrentPageData, setPages, filteredData, filters, currentPage]);

    const handleChangePage = (pageValue: number) => {
        if (pageValue < 0) {
            return setCurrentPage(0);
        }

        if (pageValue >= Object.keys(pages).length) {
            return setCurrentPage(Object.keys(pages).length - 1);
        }

        return setCurrentPage(pageValue);
    };

    const PageRange = ({ index, pages }: PageRange) => {
        const pagesLength = Object.keys(pages).length;
        const startDelay =
            currentPage >= 0 &&
            currentPage <= 5 &&
            index < currentPage + 11 - currentPage;

        const rollingDelay = currentPage < index + 6 && currentPage > index - 6;

        const endDelay =
            currentPage <= pagesLength &&
            currentPage >= pagesLength - 6 &&
            index > pagesLength - 12;

        if (startDelay || rollingDelay || endDelay) {
            return (
                <button
                    onClick={() => handleChangePage(index)}
                    className={`w-full text-center hover:bg-blue-600 hover:text-white ${
                        currentPage === index
                            ? "bg-blue-500 dark:bg-blue-500 text-white shadow-inner"
                            : "  hover:shadow-inner"
                    }`}
                >
                    {index + 1}
                </button>
            );
        }
        return <></>;
    };

    /**
     * currentPageStart is the starting index of the page
     * currentPageEnd is the ending index of the page
     * lastPageEnd is to make sure the ending index is not bigger than the total number of records
     */
    const { pagination } = filters;
    const totalRecords = filteredData.length;
    const currentPageStart = currentPage * pagination;
    const currentPageEnd = currentPageStart + pagination;
    const lastPageEnd =
        currentPageEnd < totalRecords ? currentPageEnd : totalRecords;

    if (stage > 0) {
        return (
            <div className="py-4">
                <p hidden={!showItemCount} className="mx-2 text-xs mb-2">
                    Showing {currentPageStart + 1}-{lastPageEnd} out of{" "}
                    {filteredData.length} items.
                </p>

                <div className="flex justify-around">
                    <button
                        onClick={() => handleChangePage(currentPage - 1)}
                        className="border w-24 rounded-l-sm border-blue-500 text-blue-500 hover:bg-blue-700 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-blue-600 hover:text-blue-100"
                    >
                        Back
                    </button>
                    <div className="border-b border-t w-full border-blue-500 text-blue-500 dark:border-blue-300 dark:text-blue-300 flex divide-x divide-blue-500 dark:divide-blue-300">
                        {Object.keys(pages).map((key, index) => (
                            <PageRange
                                key={`pagination-button-${key}`}
                                {...{ index, pages }}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => handleChangePage(currentPage + 1)}
                        className="border w-24 rounded-r-sm border-blue-500 text-blue-500 hover:bg-blue-700 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-blue-600 hover:text-blue-100"
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
    return <></>;
};

export default Pagination;
