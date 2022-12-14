import type { Achievement, CollatedData, Filters, Status, SteamDetails, WikiData } from "@types";
import { useEffect, useState } from "react";

/**
 * This function is to run on the first load of the application.
 * This was split from the main JSX files so there was less processing in the components.
 * @param steamDetails - SteamDetails type object that contains steamApiKey & steamUserId
 * @returns Get/Setters for each useState
 */
export const FirstLoadHandler = (steamDetails: SteamDetails) => {
    // TODO -> Refactor this

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
        collectionOpts: ["complete", "incomplete", "challenge", "daily"],
        content: ["Rebirth", "Afterbirth", "Afterbirth+", "Repentance"],
        contentOpts: ["Rebirth", "Afterbirth", "Afterbirth+", "Repentance"],
        pagination: 10,
        paginationOpts: [10, 20, 50],
        iconsOnly: false,
    });

    // Open Error component on failure
    const [error, setError] = useState<boolean>();

    useEffect(() => {
        const { REACT_APP_IAH_ENDPOINT } = process.env;

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

            if (tableRows) {
                tableRows.forEach((row) => {
                    const container = document.createElement("tr");
                    container.innerHTML = row;
                    const rowData = container.querySelectorAll("td");

                    if (rowData[0]) {
                        const { children } = rowData[0];

                        const url = (Array.from(children).filter((child) => child.nodeName === "A")[0] as HTMLAnchorElement) || "";

                        const articleDefaults = (url = "", helper = "", name = "") => ({
                            url,
                            helper,
                            name,
                        });

                        const data = articleDefaults(url.pathname, rowData[3].innerText, rowData[4].innerText.split("PS4")[0]);

                        wikiArticles.push(data);
                    }
                });
            }
            return wikiArticles;
        };

        /**
         * This function splits the Achievements into DLC
         * @param achievements Array of Steam Achievements
         * @returns {Achievement[]} Achievement - updated Steam Achievement
         */
        const getContentData = (achievements: Achievement[]): Achievement[] =>
            achievements.map((achievement: Achievement) => {
                const value = parseInt(achievement.name);
                const achievementContent = achievement;
                switch (true) {
                    case value <= 178:
                        achievementContent.content = "Rebirth";
                        break;
                    case value <= 276:
                        achievementContent.content = "Afterbirth";
                        break;
                    case value <= 403:
                        achievementContent.content = "Afterbirth+";
                        break;
                    case value >= 404:
                        achievementContent.content = "Repentance";
                        break;
                }
                return achievementContent;
            });

        /**
         * This function simply fetches the API Endpoint and parses response;
         * Sets useState var collatedData
         */
        const getAchievements = async () => {
            const { steamUserId } = steamDetails;
            const response = await fetch(
                `${REACT_APP_IAH_ENDPOINT}/api/steam/achieve?gameId=250900${steamUserId ? "&userId=" + steamUserId : ""}`
            )
                .then((res) => res.json())
                .then(({ response }) => {
                    setError(false);
                    setStatus({
                        stage: 2,
                        message: "Fetched Data Successfully... Compiling!",
                    });
                    return {
                        steam: getContentData(response.achievements),
                        wiki: generateWikiData(response.wiki),
                    };
                })
                .catch((e) => {
                    setError(true);
                    // TODO -> Handle this Error
                    return {
                        steam: [],
                        wiki: [],
                    };
                });

            const { steam, wiki } = response;
            const achievementList =
                wiki.length > 0
                    ? wiki.map((record) => ({
                          ...steam.filter((item: Achievement) => item.name === record.name)[0],
                          ...record,
                      }))
                    : steam;

            setCollatedData(achievementList as CollatedData[]);

            setStatus({
                stage: 3,
                message: "Done!",
            });
        };

        getAchievements();
    }, [steamDetails]);

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
