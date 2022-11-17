import type {
    Achievement,
    CollatedData,
    Filters,
    MainComponent,
    Status,
    WikiData,
} from "@types";
import { Filter, Pagination, Statistics, Table, Wiki } from "./";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

const Body = ({ credentials }: MainComponent) => {
    // Set page status to let user know
    const [status, setStatus] = useState<Status>({
        stage: 0,
        message: "Fetching resources!",
    });

    // Total data collated together
    const [collatedData, setCollatedData] = useState<CollatedData[]>([]);

    // Total data after filter
    const [filteredData, setFilteredData] = useState<CollatedData[]>([]);

    // Array of filters applied
    const [filters, setFilters] = useState<Filters>({
        query: "",
        collection: [],
        collectionOpts: ["completed", "waiting"],
        pagination: 10,
        paginationOpts: [10, 20, 50],
    });

    // Pagination content
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentPageData, setCurrentPageData] = useState<CollatedData[]>([]);

    // Wiki Open or not
    const [wikiOpen, setWikiOpen] = useState<boolean>(false);

    useEffect(() => {
        const getAchievements = async () => {
            const generateWikiData = (wikiData: string[]): WikiData[] => {
                const wikiArticles: WikiData[] = [];
                wikiData.forEach((row) => {
                    const container = document.createElement("tr");
                    container.innerHTML = row;
                    const rowData = container.querySelectorAll("td");
                    try {
                        if (rowData) {
                            const { pathname } = rowData[0]
                                .firstChild as HTMLAnchorElement;
                            const data = {
                                url: pathname || "",
                                helper: rowData[3].innerText,
                                name: rowData[4].innerText.split("PS4")[0],
                            };
                            wikiArticles.push(data);
                        }
                    } catch (e) {
                        // Not expecting these records so ignore
                    }
                });
                return wikiArticles;
            };

            //76561198065815181
            const key = credentials.steamApiKey;
            const userId = credentials.steamUserId;
            const params = new URLSearchParams({
                key,
                userId,
            });

            const fetchData = fetch(
                `http://localhost:8080/api/steam/achieve?gameId=250900&${params}`
            )
                .then((res) => res.json())
                .then(({ response }) => {
                    setStatus({
                        stage: 1,
                        message: "Fetched data successfully... Compiling.",
                    });

                    return {
                        steam: response.achievements,
                        wiki: generateWikiData(response.wiki),
                    };
                });

            const response = await toast.promise(
                fetchData,
                {
                    pending: "Fetching achievements!",
                    success: "Collected achievements!",
                    error: "Couldn't collect achievements!",
                },
                { theme: "dark", draggable: true, position: "bottom-left" }
            );

            const { steam, wiki } = response;

            const achievementList = wiki.map((record) => ({
                ...steam.filter(
                    (item: Achievement) => item.name === record.name
                )[0],
                ...record,
            }));

            console.log(achievementList);
            setCollatedData(achievementList);
        };

        getAchievements();
    }, [credentials]);

    return (
        <div className="h-full flex flex-col divide-y bg-slate-100 dark:bg-slate-800 justify-center items-center mt-12">
            <div className="w-4/5 h-full overflow-auto ">
                <div>
                    <div className="p-5 text-left flex flex-col">
                        <h1 className="text-2xl uppercase leading-tight mb-2">
                            Steam Achievements!
                        </h1>
                        {!credentials && <div>You have account details!</div>}
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
                            <Wiki {...{ wikiOpen, setWikiOpen }} />
                            <Table
                                {...{
                                    ...status,
                                    currentPageData,
                                    wikiOpen,
                                    setWikiOpen,
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
            </div>
        </div>
    );
};

export default Body;
