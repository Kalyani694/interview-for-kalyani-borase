import React from 'react'; 
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
const options = [
  { value: "all", label: "All Launches" },
  { value: "upcoming", label: "Upcoming Launches" },
  { value: "success", label: "Successful Launches" },
  { value: "failed", label: "Failed Launches" },
];

const FilterButtons = ({ activeTab, onChange }) => {
  const [open, setOpen] = useState(false);
  const current = options.find((opt) => opt.value === activeTab);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <CiFilter size={20} /> {current?.label || "All Launches"}
          <svg
            className="ml-2 -mr-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${
                  activeTab === option.value
                    ? "bg-gray-100 font-medium"
                    : "text-gray-700"
                } hover:bg-gray-100`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButtons;
