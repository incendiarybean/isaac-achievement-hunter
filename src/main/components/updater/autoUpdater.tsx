import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { useEffect, useState } from "react";

import type { UpdateManifest } from "@tauri-apps/api/updater";
import { invoke } from "@tauri-apps/api";
import { relaunch } from "@tauri-apps/api/process";

const AutoUpdater = () => {
    const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);
    const [updateManifest, setUpdateManifest] = useState<UpdateManifest>({
        body: "Update Notes",
        date: new Date().toISOString(),
        version: "0.0.0",
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
        } catch (error) {
            console.log(error);
        }
    };

    if (updateAvailable) {
        return (
            <div className="w-full bg-amber-600 flex h-8 p-1 shadow backdrop-blur justify-between">
                <h1>New Version: {updateManifest.version} - Is available.</h1>
                <button
                    onClick={() => {
                        invoke("open_browser", {
                            siteName: updateManifest.body,
                        });
                    }}
                >
                    Open Change Log
                </button>
                <div className="w-auto flex">
                    <button
                        onClick={() => setUpdateAvailable(false)}
                        className="mx-2 rounded border border-sky-500 px-4 uppercase bg-sky-500 hover:bg-sky-600 text-white shadow text-xs"
                    >
                        Dismiss!
                    </button>
                    <button
                        onClick={runUpdate}
                        className="mx-2 rounded border border-lime-500 px-4 uppercase bg-lime-500 hover:bg-lime-600 text-white shadow text-xs"
                    >
                        Update!
                    </button>
                </div>
            </div>
        );
    }
    return <></>;
};

export default AutoUpdater;
