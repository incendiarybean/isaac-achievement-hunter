import { useEffect, useState } from "react";

import { StatisticsComponent } from "@types";

const Statistics = ({
    stage,
    collatedData,
    credentials,
}: StatisticsComponent) => {
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
            {credentials.steamUserId ? (
                <div className="flex flex-col bg-white dark:bg-slate-900 rounded border-l-4 border-blue-400 shadow p-1">
                    <span className="p-2 text-xs">
                        {stage > 0
                            ? `Completed ${completed}%`
                            : "Calculating Completion..."}
                    </span>
                    <div className="mx-2 mb-4">
                        <div className="rounded-full h-4 w-full bg-slate-300 dark:bg-slate-700 shadow-inner">
                            <div
                                className="transition-width ease-in-out duration-500 h-full bg-blue-400 rounded-full shadow"
                                style={{ width: `${completed || 0}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col bg-white dark:bg-slate-900 rounded border-l-4 border-blue-400 shadow p-1">
                    <h1 className="p-2 text-md text-red-400 dark:text-red-500">
                        Achievement Tracking is currently paused.
                    </h1>
                    <div className="mx-2 mb-4">
                        <div className="text-sm">
                            <p>
                                Please enter your Steam User ID into your
                                account settings!
                            </p>
                            <p>
                                You can get this from{" "}
                                <a
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-400 hover:dark:text-blue-600"
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://steamdb.info/calculator/"
                                >
                                    SteamDB
                                </a>
                                ; you may need to change your Steam account's
                                public settings.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistics;
