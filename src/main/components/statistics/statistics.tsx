import { useEffect, useState } from "react";

import { StatisticsComponent } from "@types";

const Statistics = ({ collatedData, steamDetails }: StatisticsComponent) => {
    const [completed, setCompleted] = useState<number>(0);
    const [dismissed, setDismissed] = useState<boolean>(false);

    useEffect(() => {
        setCompleted(Math.floor((collatedData.filter((data) => data.achieved === 1).length / collatedData.length) * 100));
    }, [collatedData]);
    //76561198065815181
    return (
        <div>
            {steamDetails.steamUserId ? (
                <div className="z-0 mx-4 mb-4">
                    <div className="text-lg text-black dark:text-white font-extralight tracking-wide border-b border-zinc-600 mb-2 flex justify-between items-end">
                        <h1>Achievements...</h1>
                        <p className="hidden sm:block text-xs mr-1">Percentage of Completed Achievements</p>
                    </div>
                    <div className="relative rounded-full w-full bg-slate-200 dark:bg-zinc-600 shadow-inner h-8 p-1 items-center flex z-0 ">
                        <p className="z-0 absolute right-4 text-xs">{completed}%</p>
                        <div
                            className="z-0 transition-width ease-in-out duration-500 h-full bg-gradient-to-r from-sky-400 to-sky-500 rounded-full shadow flex justify-end min-w-[1.55rem]"
                            style={{
                                width: `${completed}%`,
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div hidden={dismissed}>
                    <div className="rounded flex flex-col bg-slate-100 border border-slate-300 dark:border-zinc-900/60 dark:bg-zinc-900/60 border-l-4 border-l-amber-500 dark:border-l-amber-500 shadow p-2">
                        <h1 className="p-2 text-md font-bold tracking-wide leading-relaxed text-amber-500 dark:text-amber-500">
                            Achievement Tracking is currently paused.
                        </h1>
                        <div className="mx-2 mb-4 -mt-2">
                            <div className="text-sm tracking-wide leading-loose">
                                <p>Please enter your Steam User ID into the settings!</p>
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
                                    ; you may need to change your Steam account's public settings.
                                </p>
                                <button
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-400 hover:dark:text-blue-600"
                                    onClick={() => setDismissed(true)}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Statistics;
