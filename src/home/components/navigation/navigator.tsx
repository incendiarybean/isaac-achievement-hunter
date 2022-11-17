import { AccountDetails, NavigatorComponent } from "@types";
import { createRef, useEffect, useState } from "react";

import { ExternalClickHandler } from "../../../hooks/externalClickHandler";
import { invoke } from "@tauri-apps/api";

export const Navigator = ({
    credentials,
    setCredentials,
}: NavigatorComponent) => {
    const [account, openAccount] = useState(false);
    const [accountDetails, setAccountDetails] = useState<AccountDetails>({
        steamApiKey: credentials.steamApiKey,
        steamUserId: credentials.steamUserId,
        remember: credentials.remember,
    });

    useEffect(() => {
        setAccountDetails(credentials);
    }, [credentials]);

    const saveCredentials = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setCredentials(accountDetails);

        const { remember } = accountDetails;
        if (remember) {
            return invoke("write_file", {
                fileName: "credentials.json",
                jsonString: JSON.stringify(accountDetails),
            }).catch((e) => console.log(e));
        }

        return invoke("file_exists", {
            fileName: "credentials.json",
        }).then((res) => {
            if (res) {
                invoke("remove_file", { fileName: "credentials.json" }).catch(
                    (e) => console.log(e)
                );
            }
        });
    };

    const accountElement = createRef<HTMLDivElement>();
    ExternalClickHandler(accountElement, openAccount);

    return (
        <div className="absolute top-0 bg-white dark:bg-slate-900 p-2 border-b shadow-sm flex justify-between w-full h-12 items-center">
            <h1 className="text-sm uppercase  hover:text-slate-900 hover:bg-slate-100 rounded-md px-4 py-1">
                Isaac Achievement Hunter
            </h1>
            <div className="relative" ref={accountElement}>
                <button
                    onClick={() => openAccount(!account)}
                    className="text-sm uppercase hover:text-slate-900 hover:bg-slate-100 rounded-md px-4 py-1"
                >
                    Account
                </button>
                <form
                    onSubmit={saveCredentials}
                    hidden={!account}
                    className="absolute right-0 top-10 bg-white dark:bg-slate-900 rounded-md p-4 shadow mt-2 w-96 dark:border dark:border-blue-400"
                >
                    <h1 className="text-md font-medium">
                        Optional Credentials
                    </h1>

                    <hr className="mb-4" />

                    <label className="flex items-center">
                        <span className="w-24 text-sm font-normal">
                            Steam API Key
                        </span>
                        <input
                            onChange={({ target }) =>
                                setAccountDetails(
                                    (accountDetails: AccountDetails) => ({
                                        ...accountDetails,
                                        steamApiKey: target.value || undefined,
                                    })
                                )
                            }
                            value={accountDetails.steamApiKey || ""}
                            className="px-2 w-56 border rounded-md placeholder:px-2 text-sm ml-2 dark:bg-slate-800 dark:text-white"
                        />
                    </label>

                    <label className="flex items-center mt-2">
                        <span className="w-24 text-sm font-normal">
                            Steam User ID
                        </span>
                        <input
                            onChange={({ target }) =>
                                setAccountDetails(
                                    (accountDetails: AccountDetails) => ({
                                        ...accountDetails,
                                        steamUserId: target.value || undefined,
                                    })
                                )
                            }
                            value={accountDetails.steamUserId || ""}
                            className="px-2 w-56 border rounded-md placeholder:px-2 text-sm ml-2 dark:bg-slate-800 dark:text-white"
                        />
                    </label>

                    <label className="flex items-center mt-2">
                        <span className="text-sm font-normal">
                            Remember Credentials?
                        </span>
                        <input
                            onChange={({ target }) =>
                                setAccountDetails(
                                    (accountDetails: AccountDetails) => ({
                                        ...accountDetails,
                                        remember: target.checked,
                                    })
                                )
                            }
                            type="checkbox"
                            checked={accountDetails.remember}
                            className="border rounded-md placeholder:px-2 text-sm ml-2 dark:bg-slate-800 dark:text-white"
                        />
                    </label>
                    <div className="flex flex-col">
                        <input
                            type="submit"
                            className="uppercase text-sm my-2 w-full rounded-md border border-blue-400 px-4 text-blue-400 hover:text-white hover:bg-blue-600"
                            value="save"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Navigator;
