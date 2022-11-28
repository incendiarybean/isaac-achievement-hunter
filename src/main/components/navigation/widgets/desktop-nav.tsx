import { createRef, useState } from "react";

import Customisation from "./customisation";
import { ExternalClickHandler } from "../../../../hooks/externalClickHandler";
import { GitHubIcon } from "../../common/common";
import type { NavigationComponent } from "@types";

const DesktopNav = ({ steamDetails, setSteamDetails }: NavigationComponent) => {
    const [settingsOpen, setSettingsOpen] = useState(false);

    const accountElement = createRef<HTMLDivElement>();
    ExternalClickHandler(accountElement, setSettingsOpen);

    return (
        <div className="hidden sm:flex items-center ml-auto">
            <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                <ul className="flex space-x-4">
                    <li>
                        <div ref={accountElement} className="relative">
                            <button
                                onClick={() => setSettingsOpen(!settingsOpen)}
                                className={`${
                                    settingsOpen &&
                                    "border-b border-sky-400 text-sky-500"
                                } px-2 hover:text-sky-500 dark:hover:text-sky-400`}
                            >
                                Settings
                            </button>
                            <div
                                hidden={!settingsOpen}
                                className="animate-fadeIn absolute right-0 top-12"
                            >
                                <div>
                                    <Customisation
                                        {...{
                                            steamDetails,
                                            setSteamDetails,
                                            setSettingsOpen,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <a
                            className="px-2 hover:text-sky-500 dark:hover:text-sky-400"
                            href="https://benweare.co.uk/api/docs"
                        >
                            API Docs
                        </a>
                    </li>
                    <li className="flex items-center">
                        <a
                            href="https://github.com/incendiarybean/isaac-achievement-hunter"
                            className="px-2 block text-slate-400 hover:text-skysky-500 dark:hover:text-sky-500"
                        >
                            <span className="sr-only">
                                Isaac Achievement Hunter - Github
                            </span>
                            <GitHubIcon />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default DesktopNav;
