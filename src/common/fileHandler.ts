import { appLocalDataDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api";

export const readFile = (fileName: string): Promise<string> =>
    new Promise<string>(async (resolve, reject) =>
        invoke<string>("read_file", {
            fileName: `${await appLocalDataDir()}${fileName}`,
        })
            .then((fileContent: string) => resolve(fileContent))
            .catch((e: Error) => reject(e))
    );

export const writeFile = (fileName: string, fileContent: string): Promise<boolean> =>
    new Promise<boolean>(async (resolve, reject) =>
        invoke<boolean>("write_file", {
            fileName: `${await appLocalDataDir()}${fileName}`,
            fileContent,
        })
            .then((success: boolean) => resolve(success))
            .catch((e: Error) => reject(e))
    );

export const existingFile = (fileName: string): Promise<boolean> =>
    new Promise<boolean>(async (resolve, reject) =>
        invoke<boolean>("existing_file", {
            fileName: `${await appLocalDataDir()}${fileName}`,
        })
            .then((exists: boolean) => resolve(exists))
            .catch((e: Error) => reject(e))
    );

export const removeFile = (fileName: string): Promise<boolean> =>
    new Promise<boolean>(async (resolve, reject) =>
        invoke<boolean>("remove_file", { fileName: `${await appLocalDataDir()}${fileName}` })
            .then((deleted: boolean) => resolve(deleted))
            .catch((e: Error) => reject(e))
    );
