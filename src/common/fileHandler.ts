import { invoke } from "@tauri-apps/api";

export const readFile = (fileName: string): Promise<string> =>
    new Promise<string>((resolve, reject) =>
        invoke<string>("read_file", {
            fileName,
        })
            .then((fileContent: string) => resolve(fileContent))
            .catch((e: Error) => reject(e))
    );

export const writeFile = (
    fileName: string,
    fileContent: string
): Promise<boolean> =>
    new Promise<boolean>((resolve, reject) =>
        invoke<boolean>("write_file", {
            fileName,
            fileContent,
        })
            .then((success: boolean) => resolve(success))
            .catch((e: Error) => reject(e))
    );

export const existingFile = (fileName: string): Promise<boolean> =>
    new Promise<boolean>((resolve, reject) =>
        invoke<boolean>("existing_file", {
            fileName,
        })
            .then((exists: boolean) => resolve(exists))
            .catch((e: Error) => reject(e))
    );

export const removeFile = (fileName: string): Promise<boolean> =>
    new Promise<boolean>((resolve, reject) =>
        invoke<boolean>("remove_file", { fileName })
            .then((deleted: boolean) => resolve(deleted))
            .catch((e: Error) => reject(e))
    );
