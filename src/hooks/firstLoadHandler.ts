import type {
    Achievement,
    CollatedData,
    Credentials,
    Filters,
    Status,
    WikiData,
} from "@types";
import { useEffect, useState } from "react";

/**
 * This function is to run on the first load of the application.
 * This was split from the main JSX files so there was less processing in the components.
 * @param credentials - Credentials type object that contains steamApiKey & steamUserId
 * @returns Get/Setters for each useState
 */
export const FirstLoadHandler = (credentials: Credentials) => {
    // Set page status to let user know
    const [status, setStatus] = useState<Status>({
        stage: 0,
        message: "Preparing Resources!",
    });

    // Total data collated together
    const [collatedData, setCollatedData] = useState<CollatedData[]>([]);

    // Total data after filter
    const [filteredData, setFilteredData] = useState<CollatedData[]>([]);

    // Total data, filtered, after pagination
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [currentPageData, setCurrentPageData] = useState<CollatedData[]>([]);

    // Array of filters applied
    const [filters, setFilters] = useState<Filters>({
        query: "",
        collection: [],
        collectionOpts: ["completed", "waiting"],
        pagination: 10,
        paginationOpts: [10, 20, 50],
    });

    // Open Error component on failure
    const [error, setError] = useState<boolean>();

    useEffect(() => {
        setStatus({
            stage: 1,
            message: "Fetching Data!",
        });

        /**
         * This function pulls required data from the HTML table on the Game's Wiki
         * @param wikiData Array of stringified HTMLTableRowElement
         * @returns {WikiData[]} wikiArticles - parsed Wiki table data
         */
        const generateWikiData = (tableRows: string[]): WikiData[] => {
            const wikiArticles: WikiData[] = [];
            tableRows.forEach((row) => {
                const container = document.createElement("tr");
                container.innerHTML = row;
                const rowData = container.querySelectorAll("td");

                if (rowData[0]) {
                    const { children } = rowData[0];

                    const url =
                        (Array.from(children).filter(
                            (child) => child.nodeName === "A"
                        )[0] as HTMLAnchorElement) || "";

                    const data = {
                        url: url.pathname || "",
                        helper: rowData[3].innerText || "",
                        name: rowData[4].innerText.split("PS4")[0] || "",
                    };
                    wikiArticles.push(data);
                }
            });

            return wikiArticles;
        };

        /**
         * This function simply fetches the API Endpoint and parses response;
         * Sets useState var collatedData
         */
        const getAchievements = async () => {
            const paramObject: any = {};
            if (credentials.steamApiKey) {
                paramObject["key"] = credentials.steamApiKey;
            }
            if (credentials.steamUserId) {
                paramObject["userId"] = credentials.steamUserId;
            }

            const params = new URLSearchParams(paramObject);

            const response = await fetch(
                `https://dev.benweare.co.uk/api/steam/achieve?gameId=250900&${params}`
            )
                .then((res) => res.json())
                .then(({ response }) => {
                    setError(false);
                    setStatus({
                        stage: 2,
                        message: "Fetched Data Successfully... Compiling!",
                    });
                    return {
                        steam: response.achievements,
                        wiki: generateWikiData(response.wiki),
                    };
                })
                .catch((e) => {
                    setError(true);
                    return {
                        steam: [],
                        wiki: [],
                    };
                });

            const { steam, wiki } = response;

            const achievementList = wiki.map((record) => ({
                ...steam.filter(
                    (item: Achievement) => item.name === record.name
                )[0],
                ...record,
            }));

            setCollatedData(achievementList);

            setStatus({
                stage: 3,
                message: "Done!",
            });
        };

        setStatus({
            stage: 0,
            message: "Preparing Resources!",
        });
        getAchievements();
    }, [credentials]);

    return {
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
    };
};

export default FirstLoadHandler;
