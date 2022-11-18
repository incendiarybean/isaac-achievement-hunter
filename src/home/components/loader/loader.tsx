import { LoaderComponent } from "@types";
import { Spinner } from "../common/common";

export const LoadingStatus = ({ stage, message }: LoaderComponent) => {
    const calc = Math.ceil((stage / 3) * 100);
    return (
        <div className="flex flex-col bg-white dark:bg-slate-900 rounded border-l-4 border-blue-400 mt-10 p-4 shadow-sm">
            <h1 className="p-2 text-md font-semibold text-blue-400">
                Loading...
            </h1>
            <div className="mx-2 mb-4">
                <h2 className="text-sm font-semibold">{message}</h2>
                <div className="text-sm">
                    <div className="p-2 flex items-center">
                        <Spinner />
                        <p className="ml-4 ">{calc}% Complete</p>
                    </div>
                    <div className="mx-2">
                        <div className="rounded-full h-4 w-full bg-slate-300 dark:bg-slate-700 shadow-inner">
                            <div
                                className="transition-width ease-in-out duration-500 h-full bg-blue-400 rounded-full shadow"
                                style={{ width: `${calc || 0}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingStatus;
