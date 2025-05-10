### 🕹️ Voice-Controlled Grid Navigation (React Native + TypeScript) 🎮✨
This project implements a voice-controlled 9×9 grid navigation app in React Native using TypeScript. It uses the Skia library for drawing the grid and a custom native module for voice recognition on both iOS and Android. 🎨🎧📱

## 📋 Features 📝🚀🔧
9×9 Grid Navigation:

A grid with visible lines and a movable dot. 🎯

Dot moves based on voice commands. 🗣️

Edge wrapping to keep the dot within the grid. 🔄

Voice Command Support:

Supports commands like "left", "right", "up", "down" (single step). ⬅️➡️⬆️⬇️

Multi-step commands like "move left by 3". 🏃‍♂️

Visual Feedback:

Displays current position coordinates. 📍

Shows 3 recent voice commands. 📝

Includes a recording status indicator. 🎙️

Reset Functionality:

Resets dot position and command history. 🔄

Native Voice Recognition:

Integrates with Android's SpeechRecognizer and iOS's AVSpeechRecognizer. 📱🎙️

## 🛠️ Implementation Approach 🔨⚙️🎯
Grid Drawing:

Created using react-native-skia for efficient and precise rendering. 🎨

Voice Command Handling:

Custom native bridge for voice recognition. 🌉

Supports basic and multi-step commands with precise grid movement. 🚶‍♂️🗺️

State Management:

React state for dot position and recent command history. 🔄📝

Edge Wrapping Logic:

Keeps the dot within the grid with seamless looping. 🔄🌍

Optimized Event Handling:

Efficiently handles voice inputs without lag. 🏃‍♂️💨

## 🚀 Setup and Running Instructions 🛠️📦📲
Prerequisites
Node.js (v18+) 🌳

Yarn or npm 💻

React Native CLI 🔧

Android Studio or Xcode 📱

1. Dependencies
   
     "@react-native-voice/voice": "^3.2.4",
    "@shopify/react-native-skia": "^2.0.0",
    "react": "19.0.0",
    "react-native": "0.79.2",
    "react-native-gesture-handler": "^2.25.0",
    "react-native-reanimated": "^3.17.5",
    "react-native-size-matters": "^0.4.2"

3. Install Dependencies
bash
Copy
Edit
yarn install
4. Link Native Modules (if needed)
bash
Copy
Edit
npx react-native link
5. Run the Application
Android:

bash
Copy
Edit
npx react-native run-android
iOS:

bash
Copy
Edit
npx react-native run-ios
5. Test Voice Commands
Make sure your emulator or device has microphone permissions enabled. 🎤

Use commands like "left", "right", "move down by 3" to control the dot. 🎮

6. Reset Button
Use the Reset button to clear the current position and command history. 🔄🔘

## 📂 Directory Structure 🗂️📁🛠️
css
Copy
Edit
VoiceControlGrid/
├── android/
├── ios/
├── src/
│   ├── components/
│   │   └── useVoiceControl.ts
│   │   └── VoiceControlledGrid.tsx
│   └── App.tsx
├── README.md
└── package.json
## 📝 Notes 📖💡🔧
Make sure to test on a real device or a well-configured emulator for voice recognition. 🎧📱

For iOS, ensure microphone permissions are correctly set in Info.plist. 🎤📜

## 📧 Support 💬📞💻
If you have any questions or run into issues, feel free to reach out. 💬
