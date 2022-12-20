import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { useEffect, useState } from "react";

import type { UpdateManifest } from "@tauri-apps/api/updater";
import { openBrowser } from "../../../common/utils";
import { relaunch } from "@tauri-apps/api/process";

const AutoUpdater = () => {
    const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
    const [updateManifest, setUpdateManifest] = useState<UpdateManifest>({
        body: "",
        date: "",
        version: "",
    });

    useEffect(() => {
        const updater = async () => {
            const { shouldUpdate, manifest } = await checkUpdate();
            setUpdateAvailable(shouldUpdate);
            if (manifest) {
                setUpdateManifest(manifest);
            }
        };
        updater();
    }, []);

    const runUpdate = async () => {
        try {
            await installUpdate();
            await relaunch();
        } catch (e) {
            // TODO -> Do something with error logs
            console.log(e);
        }
    };

    if (!updateAvailable) {
        return <></>;
    }

    return (
        <div className="flex w-full bg-red-500/30 h-8 p-1  px-4 shadow backdrop-blur justify-between items-center">
            <div className="flex items-center">
                <h1 className="px-4 uppercase text-xs">{updateManifest.version} Available</h1>
                <button
                    className="text-sky-300 hover:text-sky-400 text-xs uppercase items-center"
                    onClick={() => {
                        openBrowser(updateManifest.body);
                    }}
                >
                    View Changelog
                </button>
            </div>
            <div className="w-auto flex h-full">
                <button
                    onClick={() => setUpdateAvailable(false)}
                    className="mx-2 text-sky-300 hover:text-sky-400 text-xs uppercase items-center"
                >
                    Dismiss
                </button>
                <button onClick={runUpdate} className="mx-2 text-lime-300 hover:text-lime-500 text-xs uppercase items-center">
                    Update
                </button>
            </div>
        </div>
    );
};

export default AutoUpdater;
