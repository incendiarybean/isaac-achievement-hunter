import { ServiceStatus, SteamDetails } from "@types";
import { useEffect, useState } from "react";

export const ServiceStatusHandler = (steamDetails: SteamDetails): ServiceStatus => {
    const [serviceStatus, setServiceStatus] = useState<ServiceStatus>({
        loading: true,
        api: false,
        steamApi: false,
        steamAccount: false,
    });

    // TODO -> Refactor this
    useEffect(() => {
        const { REACT_APP_IAH_ENDPOINT } = process.env;

        // Fetch API and return true/false
        const getStatus = (url: string) =>
            fetch(url)
                .then((res) => res.ok)
                .catch((e) => false);

        // Update serviceStatus with endpoint status
        const setStatus = async (): Promise<void> => {
            const status: ServiceStatus = {
                api: await getStatus(`${REACT_APP_IAH_ENDPOINT}/api/status`),
                steamApi: await getStatus(`${REACT_APP_IAH_ENDPOINT}/api/steam/achieve?gameId=250900`),
                steamAccount: await getStatus(
                    `${REACT_APP_IAH_ENDPOINT}/api/steam/achieve?gameId=250900${
                        steamDetails.steamUserId ? "&userId=" + steamDetails.steamUserId : ""
                    }`
                ),
                loading: false,
            };

            // Calculate if there's more than one failure, if no failures - reload
            const failures = Object.keys(status).filter((key: string) => key !== "loading" && status[key] === false).length;

            if (!failures) {
                window.location.reload();
            }

            setServiceStatus({
                ...status,
            });
        };

        setStatus();
    }, [steamDetails]);

    return serviceStatus;
};

export default ServiceStatusHandler;
