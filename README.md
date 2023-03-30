# Smart-Locker-Core
React Native app for Smart Locker service

## Prerequisite
- An Android device with **Developer options** unlocked, **USB Debugging** turned on and NFC 
- An **Android Virtual Device** through **Android Studio** / **Android Emulator** (no NFC functionality)

## Setup
- Clone this repository through `git clone https://github.com/FukutoTojido/Smart-Locker-Core.git`

- After cloning the project, run `git submodule update --init --recursive` to initialize the submodules

- `cd Smart-Locker-Core && npm i`

> **Note**: The submodule currently still have some issues with the path, so a separate `git clone` to a different directory is required to work on the backend code.

## Running
- `npx react-native run-android` (this should automatically install the app directly on your device if you are connecting through USB, or else AVD will be opened)


### Android Debugging Steps
- Enable **USB Debugging** on your Android device
- Connect your Android device to your Mac through USB
- Run `adb devices` to check if your device is connected
- On your Android device, a prompt should appear asking you to allow USB debugging, click **OK**
- Run `npx react-native run-android` to start the app on your device

## API Base URL
```https://smart-locker-backend-hcttee6c3a-uc.a.run.app```