/**
 * Component types
 */
export interface TableComponent {
    stage: number;
    currentPageData: CollatedData[];
    wikiOpen: boolean;
    setWikiOpen: Function;
}

export interface WikiComponent {
    wikiOpen: boolean;
    setWikiOpen: Function;
}

export interface StatisticsComponent {
    stage: number;
    collatedData: CollatedData[];
}

export interface PaginationComponent {
    currentPage: number;
    filters: Filters;
    filteredData: CollatedData[];
    setCurrentPage: Function;
    setCurrentPageData: Function;
    stage: number;
    showItemCount?: boolean;
}

export interface PageRange {
    index: number;
    pages: Pages;
}

export interface FilterComponent {
    collatedData: CollatedData[];
    setCurrentPage: Function;
    setFilters: Function;
    filters: Filters;
    filteredData: CollatedData[];
    setFilteredData: Function;
}

export interface AchievedComponent {
    achieved: number;
}

export interface NavigatorComponent {
    credentials: AccountDetails;
    setCredentials: Function;
}

export interface MainComponent {
    credentials: Credentials;
}

/**
 * Data types
 */
export interface Achievement {
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

export interface WikiData {
    url: string;
    helper: string;
    name: string;
}

export interface FetchedAchievementData {
    steam: Achievement[];
    wiki: WikiData[];
}

export interface Status {
    stage: number;
    message: string;
}

export interface Filters {
    query: string;
    collection: string[];
    collectionOpts: string[];
    pagination: number;
    paginationOpts: number[];
}

export interface Pages {
    [key: number]: CollatedData[];
}

export type CollatedData = WikiData & Achievement;

export interface AccountDetails {
    steamApiKey: string | undefined;
    steamUserId: string | undefined;
    remember: boolean;
}

export interface Credentials {
    steamApiKey: string;
    steamUserId: string;
    remember: boolean;
}
