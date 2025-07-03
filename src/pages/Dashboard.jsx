import React from 'react'; 
import { useEffect, useState } from "react";
import { getAllLaunches } from "../services/spacexAPI";
import logo from "../assets/Logo.png";
import DateFilter from "../components/DateFilter";
import FilterTabs from "../components/FilterButtons";
import LaunchModal from "../components/LaunchModal";

export default function Dashboard() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  const launchesPerPage = 12;

  const handleDateFilter = (start, end) => {
    setDateRange({ start, end });
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);
      let data = await getAllLaunches();

      if (activeTab === "upcoming") {
        data = data.filter((launch) => launch.upcoming);
      } else if (activeTab === "past") {
        data = data.filter((launch) => !launch.upcoming);
      }

      setLaunches(data);
      setLoading(false);
    };

    fetchLaunches();
  }, [activeTab]);

  const filteredLaunches = launches.filter((launch) => {
    if (!dateRange.start || !dateRange.end) return true;
    const launchDate = new Date(launch.date_utc);
    return launchDate >= dateRange.start && launchDate <= dateRange.end;
  });

  const totalPages = Math.ceil(filteredLaunches.length / launchesPerPage);
  const paginatedLaunches = filteredLaunches.slice(
    (currentPage - 1) * launchesPerPage,
    currentPage * launchesPerPage
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img src={logo} alt="SpaceX Logo" className="w-40 sm:w-48" />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <DateFilter onSelect={handleDateFilter} />
        <FilterTabs
          activeTab={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left font-semibold text-gray-700 whitespace-nowrap">
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Launched (UTC)</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Mission</th>
              <th className="px-4 py-3">Orbit</th>
              <th className="px-4 py-3">Launch Status</th>
              <th className="px-4 py-3">Rocket</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-20 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-6 w-6 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Loading launches...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedLaunches.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12 text-gray-500">
                  No results found for the specified filter
                </td>
              </tr>
            ) : (
              paginatedLaunches.map((launch, index) => (
                <tr
                  key={launch.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedLaunch(launch)}
                >
                  <td className="px-4 py-3">
                    {(currentPage - 1) * launchesPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(launch.date_utc).toLocaleString("en-GB")}
                  </td>
                  <td className="px-4 py-3">{launch.launchpad || "N/A"}</td>
                  <td className="px-4 py-3">{launch.name}</td>
                  <td className="px-4 py-3">
                    {launch.payloads?.[0]?.orbit || "LEO"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        launch
                      )}`}
                    >
                      {getStatusText(launch)}
                    </span>
                  </td>
                  <td className="px-4 py-3">{launch.rocket || "Falcon 9"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Modal */}
        {selectedLaunch && (
          <LaunchModal
            launch={selectedLaunch}
            onClose={() => setSelectedLaunch(null)}
          />
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-end mt-6">
          <div className="flex items-center space-x-1 text-sm text-gray-600 flex-wrap">
            {/* Previous */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                Math.abs(currentPage - page) <= 1
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              }

              // Dots
              if (
                (page === currentPage - 2 && page > 2) ||
                (page === currentPage + 2 && page < totalPages - 1)
              ) {
                return (
                  <span key={`dots-${page}`} className="px-2">
                    ...
                  </span>
                );
              }

              return null;
            })}

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helpers
const getStatusText = (launch) => {
  if (launch.upcoming) return "Upcoming";
  if (launch.success) return "Success";
  return "Failed";
};

const getStatusStyle = (launch) => {
  if (launch.upcoming) return "bg-yellow-100 text-yellow-800";
  if (launch.success) return "bg-green-100 text-green-800";
  return "bg-red-100 text-red-800";
};
