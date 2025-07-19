"use client";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function ProfilePage() {
  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used within AppProvider");

  const { theme } = context;
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'} p-4`}>
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          User Profile
        </h1>
        <div className={`p-6 rounded-lg border-2 ${theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-white'}`}>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Profile page content will go here...
          </p>
        </div>
      </div>
    </div>
  );
}
