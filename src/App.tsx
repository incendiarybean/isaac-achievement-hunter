import { Main, Navigator } from "./main";
import { PhysicalSize, appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";

import type { SteamDetails } from "@types";
import { readFile } from "./common/fileHandler";

const App = () => {
    const [steamDetails, setSteamDetails] = useState<SteamDetails>({
        steamUserId: undefined,
        remember: false,
        version: 0,
    });

    // console.log("76561198065815181");

    useEffect(() => {
        const checkAccount = async () => {
            await readFile("steamData.json")
                .then((fileContent: string) =>
                    setSteamDetails((steamDetails) => ({
                        ...steamDetails,
                        ...JSON.parse(fileContent),
                    }))
                )
                .catch((e) => console.log(e));
        };

        checkAccount();
    }, []);

    useEffect(() => {
        const resize = async () => {
            // TODO -> Find a better place to add this
            await appWindow.setMinSize(new PhysicalSize(450, 350));
        };

        resize();
    }, []);

    return (
        <div className="h-full text-slate-800 dark:text-white">
            <Navigator {...{ steamDetails, setSteamDetails }} />
            <div className="h-full flex flex-col divide-y justify-center items-center">
                <div className="w-4/5 h-full overflow-visible">
                    <Main {...{ steamDetails }} />
                </div>
            </div>
        </div>
    );
};

export default App;
