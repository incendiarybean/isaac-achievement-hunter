import { Main, Navigator } from "./main";
import { useEffect, useState } from "react";

import { Credentials } from "@types";
import { readFile } from "./common/fileHandler";

const App = () => {
    const [credentials, setCredentials] = useState<Credentials>({
        steamApiKey: undefined,
        steamUserId: undefined,
        remember: false,
        version: 0,
    });

    useEffect(() => {
        const checkAccount = async () => {
            await readFile("credentials.json")
                .then((fileContent: string) =>
                    setCredentials((credentials) => ({
                        ...credentials,
                        ...JSON.parse(fileContent),
                    }))
                )
                .catch((e) => console.log(e));
        };

        checkAccount();
    }, []);

    return (
        <div className="h-full text-slate-800 dark:text-white">
            <Navigator {...{ credentials, setCredentials }} />
            <div className="h-full flex flex-col divide-y justify-center items-center">
                <div className="w-4/5 h-full overflow-visible ">
                    <Main {...{ credentials }} />
                </div>
            </div>
        </div>
    );
};

export default App;
