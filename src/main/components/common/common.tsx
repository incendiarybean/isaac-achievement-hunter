import type { StatusCheckerComponent } from "@types";

export const Cross = () => (
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

export const Tick = () => (
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
            return <Tick />;
        default:
            return <Cross />;
    }
};
