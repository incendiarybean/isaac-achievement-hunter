import { Achievement, TableWidgets } from "@types";

import { openBrowser } from "../../../../common/utils";

const TableRowIconsOnly = ({ currentPageData, url }: TableWidgets) => {
    return (
        <div className="w-full flex flex-wrap justify-around">
            {currentPageData.map((data: Achievement) => (
                <div className="flex" key={`${data.displayName}-icon-only-pagination-${data.name}-${new Date().toISOString()}`}>
                    <div className="group">
                        <button onClick={() => openBrowser(`${url}${data.url}`)} className="overflow-auto group-hover:scale-105">
                            <p className="group flex-none w-16 h-full flex justify-center items-center ">
                                <img className="rounded w-12 h-12" alt={`${data.apiname}-${data.displayName}`} src={data.icon} />
                            </p>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default TableRowIconsOnly;
