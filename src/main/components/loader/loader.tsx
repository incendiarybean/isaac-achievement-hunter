import { LoaderComponent } from "@types";

export const LoadingStatus = ({ stage, message }: LoaderComponent) => {
    const completed = Math.ceil((stage / 3) * 100);

    return (
        <div className={`p-4`}>
            <div className="text-lg font-normal dark:font-extralight tracking-wide border-b border-zinc-600 mb-2 flex justify-between items-end">
                <h1>Loading...</h1> <p className="text-xs mr-1">{message}</p>
            </div>
            <div className="relative rounded-full w-full bg-slate-300 dark:bg-zinc-600 shadow-inner h-8 p-1 items-center flex overflow-hidden ">
                <p className="absolute right-4 text-xs">{completed}%</p>
                <div
                    className="overflow-hidden transition-width ease-in-out duration-1000 h-full bg-gradient-to-r from-lime-400 to-lime-500 rounded-full shadow min-w-[1.55rem]"
                    style={{ width: `${completed}%` }}
                />
            </div>
        </div>
    );
};

export default LoadingStatus;
