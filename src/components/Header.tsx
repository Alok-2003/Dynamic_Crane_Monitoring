// Header.jsx
import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className={`p-4 ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <img className="w-8" src="/crane.png" alt="Crane Logo" />
          </div>
          <h1 className="text-2xl font-bold">Crane Live Monitoring</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
