import type { TableComponent } from "@types";
import TableRowDetail from "./widgets/detail";
import TableRowIconsOnly from "./widgets/icons-only";

const Table = ({ stage, currentPageData, filters }: TableComponent) => {
    const bindingOfIsaacWikiUrl = "https://bindingofisaacrebirth.fandom.com";

    if (stage > 0) {
        return (
            <>
                {currentPageData &&
                    (filters.iconsOnly ? (
                        <TableRowIconsOnly
                            collatedData={currentPageData}
                            url={bindingOfIsaacWikiUrl}
                        />
                    ) : (
                        <TableRowDetail
                            collatedData={currentPageData}
                            url={bindingOfIsaacWikiUrl}
                        />
                    ))}
            </>
        );
    }

    return (
        <div className="w-full flex my-4">
            <div className="w-full inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-full border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 transition ease-in-out duration-150 cursor-not-allowed">
                <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-blue-600 dark:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                Loading Achievements... This may take a moment!
            </div>
        </div>
    );
};

export default Table;
