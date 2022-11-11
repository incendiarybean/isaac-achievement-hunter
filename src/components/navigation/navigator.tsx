import { useState } from "react";

export const Navigator = () => {
    const [account, openAccount] = useState(false);

    return (
        <div className="absolute top-0 bg-white p-2 border-b shadow-sm flex justify-between w-full h-12 items-center">
            <h1 className="text-sm uppercase text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md px-4 py-1">
                Isaac Achievement Hunter
            </h1>
            <div className="relative">
                <button
                    onClick={() => openAccount(!account)}
                    className="text-sm uppercase text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md px-4 py-1"
                >
                    Account
                </button>
                <div
                    hidden={!account}
                    className="absolute right-0 top-10 bg-white rounded-md p-4 shadow-md border-t w-96"
                >
                    <h1 className="text-md font-medium">
                        Optional Credentials
                    </h1>

                    <hr className="mb-4" />

                    <label className="flex items-center">
                        <span className="w-24 text-sm font-normal">
                            Steam API Key
                        </span>
                        <input className="w-56 border rounded-md placeholder:px-2 text-sm ml-2" />
                    </label>

                    <label className="flex items-center mt-2">
                        <span className="w-24 text-sm font-normal">
                            Steam User ID
                        </span>
                        <input className="w-56 border rounded-md placeholder:px-2 text-sm ml-2" />
                    </label>

                    <label className="flex items-center mt-2">
                        <span className="text-sm font-normal">
                            Remember Credentials?
                        </span>
                        <input
                            type="checkbox"
                            className="border rounded-md placeholder:px-2 text-sm ml-2"
                        />
                    </label>
                    <div className="flex flex-col">
                        <button className="uppercase text-sm my-2 w-full rounded-md border border-blue-500 px-4 text-blue-500 hover:text-blue-100 hover:bg-blue-600">
                            Save
                        </button>
                        <button className="uppercase text-sm my-1 w-full rounded-md border border-red-500 px-4 text-red-500 hover:text-red-100 hover:bg-red-600">
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            {/* <div>
                <input
                    className="border -mb-1 rounded-md placeholder:px-4 uppercase text-sm"
                    placeholder="Search"
                ></input>
                <select className="text-sm uppercase text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md px-4 py-1">
                    <option>Filter</option>
                </select>
            </div> */}
        </div>
    );
};

export default Navigator;
