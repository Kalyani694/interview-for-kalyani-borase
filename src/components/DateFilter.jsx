import React from 'react'; 
import { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, subMonths } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { CiCalendar } from "react-icons/ci";

const presets = [
  { label: "Past week", range: () => [addDays(new Date(), -7), new Date()] },
  { label: "Past month", range: () => [subMonths(new Date(), 1), new Date()] },
  {
    label: "Past 3 months",
    range: () => [subMonths(new Date(), 3), new Date()],
  },
  {
    label: "Past 6 months",
    range: () => [subMonths(new Date(), 6), new Date()],
  },
  { label: "Past year", range: () => [subMonths(new Date(), 12), new Date()] },
  {
    label: "Past 2 years",
    range: () => [subMonths(new Date(), 24), new Date()],
  },
];

export default function DateFilter({ onSelect }) {
  const [show, setShow] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: subMonths(new Date(), 6),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const applyPreset = (fn) => {
    const [start, end] = fn();
    const updated = [{ startDate: start, endDate: end, key: "selection" }];
    setRange(updated);
    onSelect(start, end);
    setShow(false);
  };

  const applyCustomRange = () => {
    const { startDate, endDate } = range[0];
    onSelect(startDate, endDate);
    setShow(false);
  };

  return (
    <div className="relative inline-block text-left w-full sm:w-auto">
      {/* Toggle Button */}
      <button
        onClick={() => setShow(!show)}
        className="flex items-center space-x-2 text-sm text-gray-700 font-medium hover:underline"
      >
        <CiCalendar size={20} />
        <span>Last 6 Months</span>
      </button>

      {/* Dropdown Panel */}
      {show && (
        <div className="absolute z-50 mt-2 bg-white border rounded-lg shadow-lg w-full sm:w-[700px] max-w-[95vw] p-4 flex flex-col sm:flex-row gap-4">
          {/* Left: Presets */}
          <div className="flex flex-row sm:flex-col text-sm sm:min-w-[140px] border-b sm:border-b-0 sm:border-r sm:pr-4 gap-2 sm:gap-0 pb-2 sm:pb-0">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p.range)}
                className="text-left py-1 px-2 rounded hover:bg-gray-100 hover:text-blue-600 w-full"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Right: Calendar */}
          <div className="flex-1 overflow-auto">
            <DateRange
              ranges={range}
              onChange={(item) => setRange([item.selection])}
              months={2}
              direction="horizontal"
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              className="max-w-full"
            />
            <div className="text-right mt-3">
              <button
                onClick={applyCustomRange}
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
