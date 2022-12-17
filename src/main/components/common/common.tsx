import type { StatusCheckerComponent } from "@types";

export const CrossIcon = () => (
    <svg
        height="24"
        viewBox="0 0 21 21"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        className=""
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

export const TickIcon = () => (
    <svg
        height="24"
        viewBox="0 0 21 21"
        width="24"
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
);

export const MenuIcon = () => (
    <svg width="24" height="24" fill="none" aria-hidden="true">
        <path
            d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
    </svg>
);

export const SettingsIcon = () => (
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
            transform="translate(3 3)"
        >
            <path
                d="m7.5.5c.35132769 0 .69661025.02588228 1.03404495.07584411l.50785434 1.53911115c.44544792.12730646.86820077.30839026 1.26078721.53578009l1.4600028-.70360861c.5166435.39719686.9762801.86487779 1.3645249 1.388658l-.7293289 1.44720284c.2201691.39604534.3936959.82158734.5131582 1.2692035l1.5298263.5338186c.0390082.29913986.0591302.60421522.0591302.91399032 0 .35132769-.0258823.69661025-.0758441 1.03404495l-1.5391112.50785434c-.1273064.44544792-.3083902.86820077-.5357801 1.26078721l.7036087 1.4600028c-.3971969.5166435-.8648778.9762801-1.388658 1.3645249l-1.4472029-.7293289c-.39604532.2201691-.82158732.3936959-1.26920348.5131582l-.5338186 1.5298263c-.29913986.0390082-.60421522.0591302-.91399032.0591302-.35132769 0-.69661025-.0258823-1.03404495-.0758441l-.50785434-1.5391112c-.44544792-.1273064-.86820077-.3083902-1.26078723-.5357801l-1.46000277.7036087c-.51664349-.3971969-.97628006-.8648778-1.36452491-1.388658l.72932886-1.4472029c-.2203328-.39633993-.39395403-.82222042-.51342462-1.27020241l-1.52968981-.53381682c-.03892294-.29882066-.05900023-.60356226-.05900023-.91299317 0-.35132769.02588228-.69661025.07584411-1.03404495l1.53911115-.50785434c.12730646-.44544792.30839026-.86820077.53578009-1.26078723l-.70360861-1.46000277c.39719686-.51664349.86487779-.97628006 1.388658-1.36452491l1.44720284.72932886c.39633995-.2203328.82222044-.39395403 1.27020243-.51342462l.53381682-1.52968981c.29882066-.03892294.60356226-.05900023.91299317-.05900023z"
                strokeWidth=".933"
            />
            <circle cx="7.5" cy="7.5" r="3" />
        </g>
    </svg>
);

export const GitHubIcon = () => (
    <svg
        viewBox="0 0 16 16"
        className="w-5 h-5"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
);

export const DocsIcon = () => (
    <svg
        height="21"
        viewBox="0 0 21 21"
        width="21"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g
            strokeWidth="1.5"
            fill="none"
            fillRule="evenodd"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(1 2)"
        >
            <path d="m16.5 12.5v-10c0-1.1045695-.8954305-2-2-2h-8c-1.1045695 0-2 .8954305-2 2v10c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2z" />
            <path d="m4.30542777 2.93478874-2.00419132.72946598c-1.03795581.37778502-1.57312998 1.52546972-1.19534496 2.56342553l3.42020143 9.39692625c.37778502 1.0379558 1.52546972 1.5731299 2.56342553 1.1953449l5.56843115-2.1980811" />
            <path d="m7.5 5.5h5" />
            <path d="m7.5 7.5h6" />
            <path d="m7.5 9.5h3" />
        </g>
    </svg>
);

export const LinkIcon = () => (
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
            transform="translate(4 5)"
        >
            <path d="m5.5 2.5 1-1c1.1045695-1.1045695 2.8954305-1.1045695 4 0s1.1045695 2.8954305 0 4l-1 1m-3 3-1 1c-1.1045695 1.1045695-2.8954305 1.1045695-4 0s-1.1045695-2.8954305 0-4l1-1" />
            <path d="m3.5 8.5 5-5" />
        </g>
    </svg>
);

export const Spinner = () => (
    <svg
        className="animate-spin h-5 w-5"
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
);

export const StatusChecker = ({
    status,
    loading = false,
}: StatusCheckerComponent) => {
    switch (true) {
        case loading:
            return <Spinner />;
        case status:
            return <TickIcon />;
        default:
            return (
                <span className="text-red-500">
                    <CrossIcon />
                </span>
            );
    }
};
