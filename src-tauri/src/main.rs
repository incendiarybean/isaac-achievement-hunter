#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;
use std::fs::File;
use std::path::Path;
use std::io::prelude::*;
use std::io;
use webbrowser;


fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![write_file, read_file, remove_file, existing_file, open_browser])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn write_file(file_name: &str, file_content: &str) -> Result<bool, String> {
    let write = || -> Result<File, io::Error> {
      let mut file = File::create("./data/".to_owned() + file_name)?;
      file.write_all(format!("{}", file_content).as_bytes())?;
      Ok(file)
    };

    match write() {
      Ok(_file) => Ok(true),
      Err(e) => Err(e.kind().to_string())
    }
}

#[tauri::command]
fn read_file(file_name: &str) -> Result<String, String> {
    let read = || -> Result<String, io::Error> {
      let mut file = File::open("./data/".to_owned() + file_name)?;
      let mut contents = String::new();
      file.read_to_string(&mut contents)?;

      Ok(contents)
    };

    match read() {
      Ok(contents) => Ok(contents),
      Err(e) => Err(e.kind().to_string())
    }
}

#[tauri::command]
fn remove_file(file_name: &str) -> Result<bool, String> {
    let remove = || -> Result<bool, io::Error> {
      fs::remove_file("./data/".to_owned() + file_name)?;

      Ok(true)
    };

    match remove() {
      Ok(status) => Ok(status),
      Err(e) => Err(e.kind().to_string())
    }
}

#[tauri::command]
fn existing_file(file_name: &str) -> Result<bool, String> {
    let exists = || -> Result<bool, io::Error> {
      let exists = Path::new(&("./data/".to_owned() + file_name)).try_exists()?;

      Ok(exists)
    };

    match exists() {
      Ok(exists) => Ok(exists),
      Err(e) => Err(e.kind().to_string())
    }
}

#[tauri::command]
fn open_browser(site_name: &str) -> Result<bool, String> {
    let browse = || -> Result<bool, io::Error> {
      webbrowser::open(site_name)?;
      Ok(true)
    };

    match browse() {
      Ok(_) => Ok(true),
      Err(e) => Err(e.kind().to_string())
    }
}



