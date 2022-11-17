#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::fs;
use std::fs::File;
use std::path::Path;
use std::io::prelude::*;
use std::io;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![write_file, read_file, remove_file, file_exists])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn write_file(file_name: &str, json_string: &str) -> Result<bool, String> {
    let write = || -> Result<File, io::Error> {
      let mut file = File::create("./data/".to_owned() + file_name)?;
      file.write_all(format!("{}", json_string).as_bytes())?;
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
fn remove_file(file_name: &str) -> Result<String, String> {
    let remove = || -> Result<(), io::Error> {
      fs::remove_file("./data/".to_owned() + file_name)?;

      Ok(())
    };

    match remove() {
      Ok(_) => Ok("Success".into()),
      Err(e) => Err(e.kind().to_string())
    }
}

#[tauri::command]
fn file_exists(file_name: &str) -> bool {
    let exists = || -> Result<bool, io::Error> {
      let exists = Path::new(&("./data/".to_owned() + file_name)).try_exists()?;
      Ok(exists)
    };

    match exists() {
      Ok(exists) => exists,
      Err(_) => false
    }
}


