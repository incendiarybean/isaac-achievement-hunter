import { Main, Navigator } from "./home";
import { useEffect, useState } from "react";

import { Credentials } from "@types";
import { invoke } from "@tauri-apps/api";

const App = () => {
    const [credentials, setCredentials] = useState<Credentials>({
        steamApiKey: undefined,
        steamUserId: undefined,
        remember: false,
    });

    useEffect(() => {
        const checkAccount = () => {
            invoke("read_file", {
                fileName: "credentials.json",
            })
                .then((json: unknown) => {
                    const parsedJson = JSON.parse(json as string);
                    setCredentials((credentials) => ({
                        ...credentials,
                        ...parsedJson,
                    }));
                })
                .catch((e) => {});
        };

        checkAccount();
    }, []);

    return (
        <div className="h-full text-slate-800 dark:text-white ">
            <Navigator {...{ credentials, setCredentials }} />
            <div className="h-full flex flex-col divide-y bg-slate-200 dark:bg-slate-800 justify-center items-center py-12">
                <div className="w-4/5 h-full overflow-visible ">
                    <Main {...{ credentials }} />
                </div>
            </div>
        </div>
    );
};

export default App;
