import { Main, Navigator } from "./main";
import { useEffect, useState } from "react";

import AutoUpdater from "./main/components/updater/autoUpdater";
import { SteamDetails } from "@types";
import { readFile } from "./common/fileHandler";

const App = () => {
    const [steamDetails, setSteamDetails] = useState<SteamDetails>({
        steamUserId: undefined,
        remember: false,
        version: 0,
    });

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

    return (
        <div className="h-full text-slate-800 dark:text-white">
            <Navigator {...{ steamDetails, setSteamDetails }} />
            <AutoUpdater />
            <div className="h-full flex flex-col divide-y justify-center items-center">
                <div className="w-4/5 h-full overflow-visible ">
                    <Main {...{ steamDetails }} />
                </div>
            </div>
        </div>
    );
};

export default App;
