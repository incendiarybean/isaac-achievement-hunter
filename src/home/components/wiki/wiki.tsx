import type { WikiComponent } from "@types";

const Wiki = ({ wikiOpen, setWikiOpen }: WikiComponent) => {
    return (
        <div
            hidden={!wikiOpen}
            className="w-full h-full absolute top-0 left-0 bg-gray-500 bg-opacity-50"
        >
            <div className="p-20 h-full">
                <button
                    onClick={() => setWikiOpen(!wikiOpen)}
                    className="bg-white dark:bg-slate-800 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 text-sm flex justify-start mb-4 w-fit rounded-full items-center shadow p-1 px-2 hover:bg-blue-700 hover:text-blue-100"
                >
                    <svg
                        height="21"
                        viewBox="0 0 21 21"
                        width="21"
                        xmlns="http://www.w3.org/2000/svg"
                        className="scale-125"
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
                            <path d="m9.55 11.4-3-2.9 3-3" />
                        </g>
                    </svg>
                    <span className="uppercase font-medium mx-4">
                        Return to Achievements page
                    </span>
                </button>
                <iframe
                    title="Wiki Opener"
                    name="wikiOpener"
                    src=""
                    className="min-w-96 w-full h-full border rounded-lg shadow"
                ></iframe>
            </div>
        </div>
    );
};

export default Wiki;
