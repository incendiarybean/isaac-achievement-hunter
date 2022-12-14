import { invoke } from "@tauri-apps/api";

export const openBrowser = async (url: string) => {
    await invoke("open_browser", {
        siteName: url,
    });
};
