import { useEffect, useState } from "react";

interface Achievement {
    [key: string | number]: string | number;
    apiname: number;
    achieved: number;
    unlocktime: number;
    name: string;
    defaultvalue: number;
    displayName: string;
    hidden: number;
    description: string;
    icon: string;
    icongray: string;
}

interface WikiData {
    helper: string;
    apiname: number;
}

type CollatedData = WikiData & Achievement;

const Body = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [collatedData, setCollatedData] = useState<CollatedData[]>([]);
    const [filter, showFilter] = useState<boolean>(false);
    const [filters, addFilters] = useState<string[]>([]);
    const [filteredData, setFilteredData] = useState<CollatedData[]>([]);
    const [pagination, setPagination] = useState<number>(10);
    const [completed, setCompleted] = useState<number>(0);
    const filterButtons = ["completed", "waiting"];
    const paginationButtons = [10, 20, 50];

    const [pages, setPages] = useState<any>({});
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentPageData, setCurrentPageData] = useState<CollatedData[]>([]);

    useEffect(() => {
        const getAchievements = async () => {
            const response = await fetch(
                `http://dev.benweare.co.uk/api/steam/achieve?userId=76561198065815181&gameId=250900`
            )
                .then((res) => res.json())
                .then(({ response }) => {
                    setLoaded(true);
                    return {
                        steam: response.achievements,
                        wiki: response.wiki,
                    };
                });

            const container = document.createElement("div");
            container.innerHTML = response.wiki || "<></>";

            const tables = container.querySelectorAll(
                '[data-description="Achievements"]'
            );

            const wikiArticles: WikiData[] = [];
            tables.forEach((table) => {
                const rows = table.querySelectorAll("tr");
                rows.forEach((row) => {
                    const rowData = row.querySelectorAll("td");
                    try {
                        if (rowData) {
                            const data = {
                                helper: rowData[3].innerText.split("\n")[0],
                                apiname: parseInt(
                                    rowData[4].innerText.split("\n")[0]
                                ),
                            };
                            wikiArticles.push(data);
                        }
                    } catch (e) {
                        // Not expecting these records so ignore
                    }
                });
            });

            const achievementList = wikiArticles.map((record) => {
                return {
                    ...record,
                    ...response.steam[record.apiname - 1],
                };
            });
            setCollatedData(achievementList);

            setCompleted(
                Math.floor(
                    (achievementList.filter((data) => data.achieved === 1)
                        .length /
                        achievementList.length) *
                        100
                )
            );
        };

        getAchievements();
    }, []);

    useEffect(() => {
        let filteredItems: any = [];
        switch (true) {
            case filters.includes("completed"):
                filteredItems = [
                    ...filteredItems,
                    ...collatedData.filter((data) => data.achieved === 1),
                ];
                break;
            case filters.includes("waiting"):
                filteredItems = [
                    ...filteredItems,
                    ...collatedData.filter((data) => data.achieved === 0),
                ];
                break;
            default:
                break;
        }
        if (filters.length === 0) {
            return setFilteredData(collatedData);
        }

        return setFilteredData(filteredItems);
    }, [filters, collatedData]);

    useEffect(() => {
        const totalPages = Math.ceil(filteredData.length / pagination);
        const pages: any = {};
        for (let i = 0; i < totalPages; i++) {
            const start = i * pagination;
            const end = start + pagination;
            pages[i] = filteredData.slice(start, end);
        }
        setPages(pages);
        setCurrentPageData(pages[currentPage]);
    }, [collatedData, filteredData, pagination, currentPage]);

    const handleFilters = (filter: string) => {
        setCurrentPage(0);
        if (filters.includes(filter)) {
            return addFilters((filters) => filters.filter((f) => f !== filter));
        }
        return addFilters([...filters, filter]);
    };

    const handlePagination = (perPage: number) => {
        setCurrentPage(0);
        if (pagination === perPage) {
            return setPagination(filteredData.length);
        }
        return setPagination(perPage);
    };

    const handleChangePage = (pageValue: number) => {
        if (pageValue < 0) {
            return setCurrentPage(0);
        }

        if (pageValue >= Object.keys(pages).length) {
            return setCurrentPage(Object.keys(pages).length - 1);
        }

        return setCurrentPage(pageValue);
    };

    const Achieved = (value: number) =>
        value ? (
            <svg
                height="21"
                viewBox="0 0 21 21"
                width="21"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-500"
            >
                <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(2 2)"
                >
                    <path d="m12.8571123 1.79063546c-3.70547974-2.40636667-8.66011018-1.35322746-11.06647684 2.35225226-2.40636667 3.70547972-1.35322746 8.66011018 2.35225226 11.06647678 1.40713892.9138067 2.9944136 1.3287299 4.55387082 1.2889715 2.54712886-.0649393 5.02004606-1.3428829 6.51260596-3.6412237 1.5774991-2.4291355 1.6682799-5.39509184.4997393-7.82805117" />
                    <path d="m4.5 7.5 3 3 8-8" />
                </g>
            </svg>
        ) : (
            <svg
                height="21"
                viewBox="0 0 21 21"
                width="21"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red-500"
            >
                <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(2 2)"
                >
                    <circle cx="8.5" cy="8.5" r="8" />
                    <g transform="matrix(0 1 -1 0 17 0)">
                        <path d="m5.5 11.5 6-6" />
                        <path d="m5.5 5.5 6 6" />
                    </g>
                </g>
            </svg>
        );

    const PaginationFeature = () => {
        if (loaded) {
            return (
                <div className="flex justify-around my-4 ">
                    <button
                        onClick={() => handleChangePage(currentPage - 1)}
                        className="border w-24 rounded-l-sm border-blue-500 text-blue-500 hover:bg-blue-700 hover:text-blue-100"
                    >
                        Back
                    </button>
                    <div className="border-b border-t w-full border-slate-500 text-slate-500 hover:bg-slate-100 flex">
                        {Object.keys(pages).map((key, index) => {
                            if (
                                currentPage < index + 6 &&
                                currentPage > index - 6
                            ) {
                                return (
                                    <button
                                        onClick={() => handleChangePage(index)}
                                        className={`w-full text-center ${
                                            currentPage === index
                                                ? "bg-blue-500 text-blue-100 shadow-inner hover:bg-blue-700"
                                                : ""
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            }
                        })}
                    </div>
                    <button
                        onClick={() => handleChangePage(currentPage + 1)}
                        className="border w-24 rounded-r-sm border-blue-500 text-blue-500 hover:bg-blue-700 hover:text-blue-100"
                    >
                        Next
                    </button>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-full flex flex-col divide-y bg-slate-100 justify-center items-center mt-12">
            <div className="w-3/4 h-full overflow-auto ">
                <div>
                    <div className="p-5 text-left flex flex-col">
                        <h1 className="text-2xl uppercase leading-tight mb-2">
                            Steam Achievements!
                        </h1>
                        <div className="relative text-xs uppercase font-medium flex items-center">
                            <div className="flex flex-row">
                                <button
                                    onClick={() => showFilter(!filter)}
                                    className=" text-xs uppercase font-medium flex items-center bg-white rounded-full px-2 shadow"
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
                                {filters.map((button) => (
                                    <button
                                        key={`${button}`}
                                        onClick={() => handleFilters(button)}
                                        className="ml-2 border flex justify-between items-center w-24 rounded-xl pl-2 border-purple-500 text-purple-500 hover:bg-red-600 hover:text-red-100 hover:border-red-600"
                                    >
                                        {button}
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
                                {pagination && (
                                    <button
                                        onClick={() =>
                                            handlePagination(pagination)
                                        }
                                        className="ml-2 border flex justify-between items-center w-24 rounded-xl pl-2 border-purple-500 text-purple-500 hover:bg-red-600 hover:text-red-100 hover:border-red-600"
                                    >
                                        {pagination}
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
                                className="absolute top-7 bg-white rounded-lg shadow-md p-4"
                            >
                                <input
                                    className="border rounded-md w-full mb-3 px-2 p-1"
                                    placeholder="search"
                                />
                                <div className="">
                                    <p className="ml-1">Options</p>
                                    <hr className="mb-2" />
                                    <div className="grid grid-rows-auto grid-cols-2 gap-2">
                                        {filterButtons.map((button) => (
                                            <button
                                                key={`${button}-filters`}
                                                onClick={() =>
                                                    handleFilters(button)
                                                }
                                                className={`border w-24 rounded-xl px-2 ${
                                                    filters.includes(button)
                                                        ? "border-green-500 text-green-500 hover:bg-green-600 hover:text-green-100"
                                                        : "border-red-500 text-red-500 hover:bg-red-600 hover:text-red-100"
                                                } `}
                                            >
                                                {button}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="ml-1 mt-2">Items per Page</p>
                                    <hr className="mb-2" />
                                    <div className="grid grid-rows-3 grid-cols-2 gap-2">
                                        {paginationButtons.map((perPage) => (
                                            <button
                                                key={`${perPage}-pagination`}
                                                onClick={() =>
                                                    handlePagination(perPage)
                                                }
                                                className={`border w-24 rounded-xl px-2 ${
                                                    pagination === perPage
                                                        ? "border-green-500 text-green-500 hover:bg-green-600 hover:text-green-100"
                                                        : "border-red-500 text-red-500 hover:bg-red-600 hover:text-red-100"
                                                } `}
                                            >
                                                {perPage}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <span className="p-2 text-xs">
                                Showing {pagination} out of{" "}
                                {filteredData.length} items.
                            </span>
                            <div className="flex flex-col">
                                <span className="p-2 text-xs">
                                    {loaded
                                        ? `Completed ${completed}%`
                                        : "Calculating Completion..."}
                                </span>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={completed}
                                    readOnly
                                    className="slider w-full overflow-none"
                                />
                            </div>
                        </div>
                        <PaginationFeature />
                        <div className="">
                            {loaded ? (
                                currentPageData &&
                                currentPageData.map((data) => (
                                    <div
                                        key={`${data.displayName}-pagination-${data.name}`}
                                        className="bg-white rounded-lg shadow-sm divide-x flex flex-row w-full text-left my-2 h-16"
                                    >
                                        <p className="w-16 p-2 flex justify-center items-center">
                                            <img
                                                className="rounded-sm"
                                                alt={`${data.apiname}-${data.displayName}`}
                                                src={data.icon}
                                            />
                                        </p>
                                        <p className="min-w-56 flex justify-start items-center w-56 p-2">
                                            {data.displayName}
                                        </p>
                                        <p className="min-w-56 w-full p-2 overflow-auto">
                                            {data.helper}
                                        </p>
                                        <p className="w-12 p-2 flex justify-center items-center">
                                            {Achieved(data.achieved)}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="w-full flex my-4">
                                    <div className="w-full inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-full border border-blue-500 text-blue-600 transition ease-in-out duration-150 cursor-not-allowed">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-6 w-6 text-blue-500"
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
                                        Loading Achievements... This may take a
                                        moment!
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <PaginationFeature />
                </div>
            </div>
        </div>
    );
};

export default Body;
