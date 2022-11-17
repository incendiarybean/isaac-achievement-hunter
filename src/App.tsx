import { Main, Navigator } from "./home";
import { useEffect, useState } from "react";

import { Credentials } from "@types";
import { invoke } from "@tauri-apps/api";

const App = () => {
    const [credentials, setCredentials] = useState<Credentials>({
        steamApiKey: "",
        steamUserId: "",
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
            <Main {...{ credentials }} />
        </div>
    );
};

export default App;
