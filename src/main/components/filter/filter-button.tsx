export const FilterButton = ({
    filter,
    handler,
    inline,
    active,
}: {
    filter: any;
    handler: Function;
    inline?: boolean;
    active?: boolean;
}) => (
    <button
        onClick={() => handler(filter)}
        className={`
            ${
                inline
                    ? "flex justify-between items-center pl-2 ml-2"
                    : "text-center"
            } 
            ${inline ? "w-auto" : "w-24"}
            ${
                inline &&
                "border-blue-500 text-blue-500 dark:border-blue-300 dark:text-blue-300 hover:bg-red-600 hover:text-red-100 hover:border-red-600"
            }
            ${
                active &&
                "border-red-500 text-red-500 dark:border-red-400 dark:text-red-400 hover:bg-red-600 dark:hover:border-red-600 hover:text-red-100"
            }
            ${
                !active &&
                !inline &&
                "border-green-500 text-green-500 hover:bg-green-600 hover:text-green-100"
            }
            uppercase text-xs border rounded
        `}
    >
        {filter}
        <div hidden={!inline}>
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
        </div>
    </button>
);

export default FilterButton;
