import type {
    NavigationInnerComponents,
    SavedSteamDetails,
    SteamDetails,
} from "@types";
import {
    existingFile,
    removeFile,
    writeFile,
} from "../../../../common/fileHandler";
import { useEffect, useState } from "react";

import { SettingsIcon } from "../../common/common";

const Customisation = ({
    steamDetails,
    setSteamDetails,
    setSettingsOpen,
}: NavigationInnerComponents) => {
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

        // TODO -> Do something about this
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

    return (
        <form
            onSubmit={(e) => saveCredentials(e)}
            className="md:p-4 md:w-96 top-12 right-0 z-40 rounded shadow bg-slate-100 border border-slate-300 dark:border-none dark:bg-zinc-900 w-auto"
        >
            <h1 className="flex items-center">
                <SettingsIcon />
                <span className="ml-2">Customisation</span>
            </h1>

            <label className="mx-3 flex sm:items-center mt-2 justify-between flex-col sm:flex-row">
                <span className="text-sm font-normal text-left">
                    Steam User ID
                </span>
                <input
                    onChange={({ target }) =>
                        setSavedSteamDetails(
                            (savedSteamDetails: SavedSteamDetails) => ({
                                ...savedSteamDetails,
                                steamUserId: target.value || undefined,
                            })
                        )
                    }
                    value={savedSteamDetails.steamUserId || ""}
                    className="px-2 sm:w-56 border rounded placeholder:px-2 placeholder:text-white placeholder:dark:text-black font-light text-sm sm:ml-2 dark:bg-slate-800 dark:text-white"
                />
            </label>

            <label className="mx-3 flex items-center mt-2">
                <span className="text-sm font-normal">
                    Remember Credentials?
                </span>
                <input
                    onChange={({ target }) =>
                        setSavedSteamDetails(
                            (savedSteamDetails: SavedSteamDetails) => ({
                                ...savedSteamDetails,
                                remember: target.checked,
                            })
                        )
                    }
                    type="checkbox"
                    checked={savedSteamDetails.remember}
                    className="ml-6"
                />
            </label>
            <div className="px-3">
                <input
                    type="submit"
                    className="cursor-pointer uppercase text-sm mt-4 p-1 w-full rounded-md border border-sky-500 px-4 text-sky-500 dark:text-sky-400 hover:text-white hover:border-sky-600 hover:bg-sky-600"
                    value="save"
                />
            </div>
        </form>
    );
};

export default Customisation;
