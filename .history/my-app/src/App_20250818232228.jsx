import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import OnboardingScreen from './components/screens/OnboardingScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';

const App = () => {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen">
      {/* Phone Mockup Frame */}
      <div className="relative w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-4 border-gray-800">
        <div className="absolute top-0 left-0 w-full h-full">
            <HashRouter>
            <Routes>
                <Route path="/" element={<OnboardingScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            </HashRouter>
        </div>
      </div>
    </div>
  );
};

export default App;