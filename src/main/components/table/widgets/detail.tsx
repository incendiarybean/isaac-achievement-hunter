import { Achievement, CollatedData } from "@types";

import { StatusChecker } from "../../..";
import { openBrowser } from "../../../../common/utils";

const TableRowDetail = ({
    collatedData,
    url,
}: {
    collatedData: CollatedData[];
    url: string;
}) => {
    return (
        <>
            {collatedData.map((data: Achievement) => (
                <div
                    className="group"
                    key={`${data.displayName}-pagination-${
                        data.name
                    }-${new Date().toISOString()}`}
                >
                    <button
                        onClick={() => openBrowser(`${url}${data.url}`)}
                        className="overflow-auto group-hover:scale-105 group-hover:dark:bg-zinc-900/60 transition-transform duration-150 ease-in-out bg-slate-100 border border-slate-300 dark:border-none dark:bg-zinc-900/60 shadow divide-x dark:divide-zinc-600 flex flex-row w-full text-left my-2 h-16 text-zinc-900 dark:text-white rounded"
                    >
                        <p className="flex-none w-16 h-full flex justify-center items-center ">
                            <img
                                className="rounded w-12 h-12"
                                alt={`${data.apiname}-${data.displayName}`}
                                src={data.icon}
                            />
                        </p>
                        <p className="flex-auto sm:flex-none h-full w-24 md:w-56 p-2">
                            {data.displayName}
                        </p>
                        <p className="hidden sm:block flex-auto h-full p-2 overflow-auto">
                            {data.helper}
                        </p>
                        <p
                            className={`${
                                !Object.keys(data).includes("achieved") &&
                                "hidden"
                            } w-16 h-full flex-none flex items-center justify-around`}
                        >
                            <StatusChecker status={!!data.achieved} />
                        </p>
                    </button>
                </div>
            ))}
        </>
    );
};
export default TableRowDetail;
