import { invoke } from "@tauri-apps/api";

/**
 * Simple function to open the user's native default browser
 * @param url - String, url of where you wish the browser to take the user
 */
export const openBrowser = async (url: string) => {
    await invoke("open_browser", {
        siteName: url,
    });
};
