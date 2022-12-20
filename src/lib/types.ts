/**
 * Component types
 */
export interface TableComponent {
    stage: number;
    currentPageData: CollatedData[];
    filters: Filters;
}

export interface TableWidgets {
    currentPageData: CollatedData[];
    url: string;
}

export interface WikiComponent {
    wikiOpen: boolean;
    setWikiOpen: Function;
}

export interface StatisticsComponent {
    collatedData: CollatedData[];
    steamDetails: SteamDetails;
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

export interface StatusCheckerComponent {
    status: boolean;
    loading?: boolean;
}

export interface NavigatorComponent {
    steamDetails: SteamDetails;
    setSteamDetails: Function;
}

export interface MainComponent {
    steamDetails: SteamDetails;
}

export interface ErrorComponent {
    steamDetails: SteamDetails;
}

export interface LoaderComponent {
    stage: number;
    message: string;
}

export interface NavigationInnerComponents {
    steamDetails: SteamDetails;
    setSteamDetails: Function;
    setSettingsOpen: Function;
}

export interface NavigationComponent {
    steamDetails: SteamDetails;
    setSteamDetails: Function;
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
    content: string;
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
    content: string[];
    contentOpts: string[];
    pagination: number;
    paginationOpts: number[];
    iconsOnly: boolean;
}

export interface Pages {
    [key: number]: CollatedData[];
}

export type CollatedData = WikiData & Achievement;

export interface SavedSteamDetails {
    steamUserId: string | undefined;
    remember: boolean;
}

export interface SteamDetails {
    steamUserId: string | undefined;
    remember: boolean;
    version: 0;
}

export interface ServiceStatus {
    [key: string]: boolean;
    loading: boolean;
    api: boolean;
    steamApi: boolean;
    steamAccount: boolean;
}

export interface ErrorStatus {
    name: string;
    reasons: JSX.Element[];
}

export interface ErrorStatusInfo {
    [key: string]: ErrorStatus;
    api: ErrorStatus;
    steamApi: ErrorStatus;
    steamAccount: ErrorStatus;
}
