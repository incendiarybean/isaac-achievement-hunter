import type {
    NavigatorComponent,
    SavedSteamDetails,
    SteamDetails,
} from "@types";
import { createRef, useEffect, useState } from "react";
import {
    existingFile,
    removeFile,
    writeFile,
} from "../../../common/fileHandler";

import { ExternalClickHandler } from "../../../hooks/externalClickHandler";

export const Navigator = ({
    steamDetails,
    setSteamDetails,
}: NavigatorComponent) => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [savedSteamDetails, setSavedSteamDetails] =
        useState<SavedSteamDetails>({
            steamUserId: steamDetails.steamUserId,
            remember: steamDetails.remember,
        });

    useEffect(() => {
        const { steamUserId, remember } = steamDetails;
        setSavedSteamDetails({ steamUserId, remember });
    }, [steamDetails]);

    const saveCredentials = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { steamUserId, remember } = savedSteamDetails;
        const steamIdExpression = /^\d{17}$/g;

        if (steamUserId) {
            if (!steamIdExpression.test(steamUserId)) {
                throw new Error(
                    "Failed to validate Steam ID: 0-9 & 17 characters"
                );
            }
        }

        setSteamDetails((steamDetails: SteamDetails) => ({
            ...savedSteamDetails,
            version: steamDetails.version + 1,
        }));

        setSettingsOpen(false);

        if (remember) {
            return writeFile(
                "steamData.json",
                JSON.stringify(savedSteamDetails)
            ).catch();
        }

        return existingFile("steamData.json")
            .then((exists) => {
                if (exists) {
                    removeFile("steamData.json").catch((e) => console.log(e));
                }
            })
            .catch();
    };

    const accountElement = createRef<HTMLDivElement>();
    ExternalClickHandler(accountElement, setSettingsOpen);

    return (
        <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 md:z-50 md:border-b md:border-sky-500/10 dark:border-sky-100/10 bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
            <div className="max-w-8xl mx-auto">
                <div className="py-4 border-b border-sky-900/10 px-8 md:border-0 dark:border-sky-300/10 mx-0">
                    <div className="z-40 flex justify-between items-center w-full">
                        <a
                            className="mr-3 flex-none w-auto overflow-hidden md:w-auto"
                            href="/"
                        >
                            <span className="">Isaac Achievement Hunter</span>
                        </a>

                        <a
                            href="#latestrelease-TODO"
                            className="ml-3 text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/10 rounded-full py-1 px-3 hidden md:flex items-center hover:bg-sky-400/20"
                        >
                            <strong className="font-semibold">
                                IAH V0.2.0
                            </strong>
                        </a>
                        <div className="hidden md:flex items-center ml-auto">
                            <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                                <ul className="flex space-x-8">
                                    <li>
                                        <div className="relative">
                                            <button
                                                onClick={() =>
                                                    setSettingsOpen(
                                                        !settingsOpen
                                                    )
                                                }
                                                className={`${
                                                    settingsOpen &&
                                                    "border-b border-sky-400 text-sky-500"
                                                } px-2 hover:text-sky-500 dark:hover:text-sky-400`}
                                            >
                                                Settings
                                            </button>
                                            <div
                                                hidden={!settingsOpen}
                                                className="absolute right-0 top-12"
                                            >
                                                <div ref={accountElement}>
                                                    <form
                                                        onSubmit={(e) =>
                                                            saveCredentials(e)
                                                        }
                                                        className="top-12 right-0 p-4 z-40 rounded shadow-xl bg-zinc-300 dark:bg-zinc-900 w-96"
                                                    >
                                                        <h1 className="">
                                                            Optional Credentials
                                                        </h1>

                                                        <hr className="mb-4" />

                                                        <label className="flex items-center mt-2 justify-between">
                                                            <span className="text-sm font-normal">
                                                                Steam User ID
                                                            </span>
                                                            <input
                                                                onChange={({
                                                                    target,
                                                                }) =>
                                                                    setSavedSteamDetails(
                                                                        (
                                                                            savedSteamDetails: SavedSteamDetails
                                                                        ) => ({
                                                                            ...savedSteamDetails,
                                                                            steamUserId:
                                                                                target.value ||
                                                                                undefined,
                                                                        })
                                                                    )
                                                                }
                                                                value={
                                                                    savedSteamDetails.steamUserId ||
                                                                    ""
                                                                }
                                                                className="px-2 w-56 border rounded placeholder:px-2 text-sm ml-2 dark:bg-slate-800 dark:text-white"
                                                            />
                                                        </label>

                                                        <label className="flex items-center mt-2">
                                                            <span className="text-sm font-normal">
                                                                Remember
                                                                Credentials?
                                                            </span>
                                                            <input
                                                                onChange={({
                                                                    target,
                                                                }) =>
                                                                    setSavedSteamDetails(
                                                                        (
                                                                            savedSteamDetails: SavedSteamDetails
                                                                        ) => ({
                                                                            ...savedSteamDetails,
                                                                            remember:
                                                                                target.checked,
                                                                        })
                                                                    )
                                                                }
                                                                type="checkbox"
                                                                checked={
                                                                    savedSteamDetails.remember
                                                                }
                                                                className="ml-6"
                                                            />
                                                        </label>
                                                        <div className="">
                                                            <input
                                                                type="submit"
                                                                className="cursor-pointer uppercase text-sm mt-4 p-1 w-full rounded-md border border-sky-400 px-4 text-sky-300 dark:text-sky-400 hover:text-white hover:bg-sky-600"
                                                                value="save"
                                                            />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <a
                                            className="px-2 hover:text-sky-500 dark:hover:text-sky-400"
                                            href="https://benweare.co.uk/api/docs"
                                        >
                                            API Docs
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <div className="flex items-center px-2">
                                <a
                                    href="https://github.com/incendiarybean/isaac-achievement-hunter"
                                    className="ml-6 block text-slate-400 hover:text-skysky-500 dark:hover:text-sky-500"
                                >
                                    <span className="sr-only">
                                        Isaac Achievement Hunter - Github
                                    </span>
                                    <svg
                                        viewBox="0 0 16 16"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="ml-2 -my-1 md:hidden">
                            <button
                                type="button"
                                className="text-slate-500 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                            >
                                <span className="sr-only">Navigation</span>
                                <svg
                                    width="24"
                                    height="24"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigator;
