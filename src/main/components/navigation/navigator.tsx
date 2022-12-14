import AutoUpdater from "../update/update";
import DesktopNav from "./widgets/desktop-nav";
import MobileNav from "./widgets/mobile-nav";
import type { NavigatorComponent } from "@types";
import { openBrowser } from "../../../common/utils";

export const Navigator = ({
    steamDetails,
    setSteamDetails,
}: NavigatorComponent) => {
    return (
        <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 md:z-50 md:border-b md:border-sky-500/10 dark:border-sky-100/10 bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
            <AutoUpdater />
            <div className="max-w-8xl mx-auto">
                <div className="py-4 border-b border-sky-900/10 px-8 md:border-0 dark:border-sky-300/10 mx-0">
                    <div className="z-40 flex justify-between items-center w-full">
                        <a
                            className="mr-3 flex-none w-auto overflow-hidden md:w-auto"
                            href="/"
                        >
                            <span className="">Isaac Achievement Hunter</span>
                        </a>
                        <button
                            className="ml-3 text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/10 rounded-full py-1 px-3 hidden sm:flex items-center hover:bg-sky-400/20"
                            onClick={() =>
                                openBrowser(
                                    "https://github.com/incendiarybean/isaac-achievement-hunter/releases/tag/v0.2.0"
                                )
                            }
                        >
                            <strong className="font-semibold">
                                IAH V0.2.1
                            </strong>
                        </button>
                        <DesktopNav
                            {...{
                                steamDetails,
                                setSteamDetails,
                            }}
                        />
                        <MobileNav
                            {...{
                                steamDetails,
                                setSteamDetails,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navigator;
