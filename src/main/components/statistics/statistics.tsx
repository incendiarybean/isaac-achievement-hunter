import { useEffect, useState } from "react";

import { StatisticsComponent } from "@types";

const Statistics = ({ collatedData, steamDetails }: StatisticsComponent) => {
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
    //76561198065815181
    return (
        <div>
            {steamDetails.steamUserId ? (
                <div className="z-0 mx-4 mb-4">
                    <div className="text-lg font-extralight tracking-wide border-b border-zinc-600 mb-2 flex justify-between items-end">
                        <h1>Achievements...</h1>{" "}
                        <p className="text-xs mr-1">
                            Percentage of Completed Achievements
                        </p>
                    </div>
                    <div className="relative rounded-full w-full bg-slate-300 dark:bg-zinc-600 shadow-inner h-8 p-1 items-center flex z-0 ">
                        <p className="z-0 absolute right-4 text-xs">
                            {completed}%
                        </p>
                        <div
                            className="z-0 transition-width ease-in-out duration-500 h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full shadow flex justify-end"
                            style={{ width: `${completed || 5}%` }}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col bg-white dark:bg-zinc-700 border-l-4 border-amber-500 shadow-lg p-2">
                    <h1 className="p-2 text-md font-bold tracking-wide leading-relaxed text-amber-400 dark:text-amber-500">
                        Achievement Tracking is currently paused.
                    </h1>
                    <div className="mx-2 mb-4 -mt-2">
                        <div className="text-sm tracking-wide leading-loose">
                            <p>
                                Please enter your Steam User ID into the
                                settings!
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
