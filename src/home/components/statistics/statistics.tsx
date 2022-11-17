import { useEffect, useState } from "react";

import { StatisticsComponent } from "@types";

const Statistics = ({ stage, collatedData }: StatisticsComponent) => {
    const [completed, setCompleted] = useState<number>(0);

    useEffect(() => {
        setCompleted(
            Math.floor(
                (collatedData.filter((data) => data.achieved === 1).length /
                    collatedData.length) *
                    100
            )
        );
    }, [collatedData]);

    return (
        <div>
            <div className="flex flex-col">
                <span className="p-2 text-xs">
                    {stage > 0
                        ? `Completed ${completed}%`
                        : "Calculating Completion..."}
                </span>
                <div className="mx-2 mb-4">
                    <div className="rounded-full h-4 w-full bg-slate-300 dark:bg-slate-600 shadow-inner">
                        <div
                            className="transition-width ease-in-out duration-500 h-full bg-blue-400 rounded-full shadow"
                            style={{ width: `${completed || 0}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
