import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CraneDropdownProps {
  cranes?: number[];
  onSelect?: (crane: number) => void;
}

const CraneDropdown: React.FC<CraneDropdownProps> = ({ cranes = [1, 2, 3, 4, 5], onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (num: number) => {
    setSelected(num);
    setOpen(false);
    if (onSelect) onSelect(num);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left z-50">
      <button
        onClick={() => setOpen((prev) => !prev)}
        type="button"
        className="inline-flex z-50 justify-between items-center w-40 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
      >
        {selected ? `Crane ${selected}` : 'Select Crane'}
        <ChevronDown className="ml-2 h-5 w-5" />
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          {cranes.map((num) => (
            <button
              key={num}
              onClick={() => handleSelect(num)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {`Crane ${num}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CraneDropdown;
