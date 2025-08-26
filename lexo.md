TravelApp (Expo + React Native + TypeScript)
// Skeleton project with Auth (JWT) + Trips list + Details
// -----------------------------
// INSTALIMI & NISJA (në terminal):
// 1) npx create-expo-app@latest travelapp-frontend -t expo-template-blank-typescript
// 2) cd travelapp-frontend
// 3) npm i @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
// 4) npm i axios @react-native-async-storage/async-storage
// 5) npm i react-hook-form zod @hookform/resolvers
// 6) npx expo install expo-status-bar
// 7) npm start (ose: npx expo start)
// Skano QR me Expo Go (iOS/Android) ose hap emulatorin.
// -----------------------------
// SHËNIM I RËNDËSISHËM për baseURL:
// - Nëse backend Node.js është në kompjuterin tënd lokal, përdor IP-në lokale të kompjuterit (jo "localhost")
// p.sh. http://192.168.1.5:3000 (duhet të jeni në të njëjtin Wi‑Fi me telefonin)
// - Në Android emulator: http://10.0.2.2:3000
// - Në iOS simulator: http://localhost:3000
// Vendose tek src/config.ts
// -----------------------------


Navigimi midis screens

Instalo dhe vendos React Navigation në app:
after register login 
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context 
npm install @react-native-async-storage/async-storage

