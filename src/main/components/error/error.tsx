import { ErrorComponent, ServiceStatus } from "@types";
import { useEffect, useState } from "react";

import { StatusChecker } from "../common/common";
import { invoke } from "@tauri-apps/api";

const Error = ({ credentials }: ErrorComponent) => {
    const [serviceStatus, setServiceStatus] = useState<ServiceStatus>({
        loading: true,
        api: false,
        steamApi: false,
        steamApiKey: false,
        steamAccount: false,
    });

    useEffect(() => {
        // Default Loading status to true
        setServiceStatus((serviceStatus) => ({
            ...serviceStatus,
            loading: true,
        }));

        // Fetch API and return true/false
        const getStatus = (url: string) =>
            fetch(url)
                .then((res) => res.ok)
                .catch((e) => false);

        // Update serviceStatus with endpoint status
        const setStatus = async () => {
            const status = {
                api: await getStatus("http://localhost:8080/api/status"),
                steamApi: await getStatus(
                    "http://localhost:8080/api/steam/achieve?gameId=250900"
                ),
                steamApiKey: await getStatus(
                    `http://localhost:8080/api/steam/achieve?gameId=250900${
                        credentials.steamApiKey
                            ? "&key=" + credentials.steamApiKey
                            : ""
                    }`
                ),
                steamAccount: await getStatus(
                    `http://localhost:8080/api/steam/achieve?gameId=250900${
                        credentials.steamUserId
                            ? "&userId=" + credentials.steamUserId
                            : ""
                    }`
                ),
            };
            setServiceStatus(() => ({
                loading: false,
                ...status,
            }));
        };

        setStatus();
    }, [credentials]);

    const errorStatusReasons: any = {
        api: {
            name: "Web API",
            reasons: [
                <span>The Web API is currently down.</span>,
                <span>
                    You're using a proxy service that has blocked this request.
                </span>,
                <span>An Administrator has blocked this request.</span>,
            ],
        },
        steamApi: {
            name: "Steam API",
            reasons: [
                <span>The Steam API is currently down.</span>,
                <span>The Web API is currently down.</span>,
            ],
        },
        steamApiKey: {
            name: "Steam API Key",
            reasons: [<span>Your Steam API Key may be incorrect.</span>],
        },
        steamAccount: {
            name: "Steam User ID",
            reasons: [
                <span>Your Steam ID may be incorrect.</span>,
                <span>Your Steam profile permissions may be incorrect.</span>,
                <span>
                    Check your steam profile details here{" "}
                    <button
                        onClick={() => {
                            invoke("open_browser", {
                                siteName: "https://steamdb.info/calculator/",
                            });
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-400 hover:dark:text-blue-600"
                    >
                        SteamDB
                    </button>
                    .
                </span>,
            ],
        },
    };

    return (
        <div className="flex flex-col bg-white dark:bg-slate-900 rounded border-l-4 border-red-500 mt-10 p-4 shadow-sm">
            <h1 className="p-2 text-md font-semibold text-red-600">
                There was an error with retrieving your achievements:
            </h1>
            <div className="mx-2 mb-4">
                <h2 className="text-sm font-semibold">
                    Please check the status of each service below
                </h2>
                <div className="text-sm">
                    <div className="p-2 divide-y">
                        {Object.keys(errorStatusReasons).map((key) => (
                            <div className="py-2" key={`error-${key}`}>
                                <div className="flex">
                                    <StatusChecker
                                        status={serviceStatus[key]}
                                        loading={serviceStatus.loading}
                                    />
                                    <p className="ml-4 text-blue-600 dark:text-blue-400 text-md uppercase font-medium ">
                                        {errorStatusReasons[key].name}
                                    </p>
                                </div>
                                {!serviceStatus[key] && (
                                    <div className="ml-12">
                                        <h3>Reasons for this:</h3>
                                        <ul className="list-disc ml-5">
                                            {errorStatusReasons[
                                                key
                                            ].reasons.map(
                                                (
                                                    listItem: React.ReactNode,
                                                    index: number
                                                ) => (
                                                    <li
                                                        key={`errorStatus-${key}-${index}`}
                                                    >
                                                        {listItem}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
