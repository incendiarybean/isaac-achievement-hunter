import { ErrorComponent, ErrorStatusInfo, ServiceStatus } from "@types";

import ServiceStatusHandler from "../../../hooks/serviceStatusHandler";
import { StatusChecker } from "../common/common";
import { invoke } from "@tauri-apps/api";

const Error = ({ steamDetails }: ErrorComponent) => {
    const serviceStatus: ServiceStatus = ServiceStatusHandler(steamDetails);

    const errorStatusInfo: ErrorStatusInfo = {
        api: {
            name: "Web API",
            reasons: [
                <span>The Web API is currently down.</span>,
                <span>You're using a proxy service that has blocked this request.</span>,
                <span>An Administrator has blocked this request.</span>,
            ],
        },
        steamApi: {
            name: "Steam API",
            reasons: [<span>The Steam API is currently down.</span>, <span>The Web API is currently down.</span>],
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
        <div className="mt-10 rounded flex flex-col bg-slate-100 border border-slate-300 dark:border-zinc-900/60 dark:bg-zinc-900/60 border-l-4 border-l-amber-500 dark:border-l-amber-500 shadow p-2">
            <h1 className="p-2 text-md font-bold tracking-wide leading-relaxed text-amber-500 dark:text-amber-500">
                There was an error with retrieving your achievements:
            </h1>
            <div className="mx-2 mb-4">
                <h2 className="text-sm font-semibold">Please check the status of each service below.</h2>
                <div className="text-sm">
                    <div className="p-2 divide-y">
                        {Object.keys(errorStatusInfo).map((key) => (
                            <div className="py-2" key={`error-${key}`}>
                                <div className="flex">
                                    <StatusChecker status={serviceStatus[key]} loading={serviceStatus.loading} />
                                    <p className="ml-4 text-sky-600 dark:text-sky-400 text-md uppercase font-medium ">
                                        {errorStatusInfo[key].name}
                                    </p>
                                </div>
                                {!serviceStatus[key] && (
                                    <div className="ml-12">
                                        <h3>Reasons for this:</h3>
                                        <ul className="list-disc ml-5">
                                            {errorStatusInfo[key].reasons.map((listItem: React.ReactNode, index: number) => (
                                                <li key={`errorStatus-${key}`}>{listItem}</li>
                                            ))}
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
