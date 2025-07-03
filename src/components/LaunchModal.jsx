import React from 'react'; 
import { IoMdClose } from "react-icons/io";
import { FaWeebly } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { PiArticleNyTimesFill } from "react-icons/pi";
export default function LaunchModal({ launch, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative overflow-y-auto max-h-[90vh]">
       <button
  onClick={onClose}
  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
  aria-label="Close modal"
>
  <IoMdClose size={20} />
</button>


        <div className="p-5 space-y-4">
          {/* Header: Image + Name + Rocket + Status */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={
                  launch.links?.patch?.small || "https://via.placeholder.com/80"
                }
                alt={launch.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
              <div>
                <h2 className="text-base sm:text-lg font-semibold">
                  {launch.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {launch.rocket || "Falcon 9"}
                </p>
                <div className="flex items-center gap-3 mt-2 text-lg text-gray-600">
                  <a href={launch.links?.webcast} target="_blank" rel="noreferrer" data-testid="icon-weebly">
    <FaWeebly className="text-blue-500 text-xl hover:scale-110" />
  </a>
  <a href={launch.links?.youtube} target="_blank" rel="noreferrer" data-testid="icon-youtube">
    <CiYoutube className="text-red-500 text-xl hover:scale-110" />
  </a>
  <a href={launch.links?.article} target="_blank" rel="noreferrer" data-testid="icon-article">
    <PiArticleNyTimesFill className="text-gray-700 text-xl hover:scale-110" />
  </a>
                </div>
              </div>
            </div>

            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusStyle(
                launch
              )}`}
            >
              {getStatusText(launch)}
            </span>
          </div>

          {/* Description */}
          {launch.details && (
            <p className="text-sm text-gray-700">
              {launch.details}{" "}
              {launch.links?.wikipedia && (
                <a
                  href={launch.links.wikipedia}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Wikipedia
                </a>
              )}
            </p>
          )}

          {/* Info Grid */}
          <div className="grid gap-y-5 text-sm text-gray-700">
            <div className="grid grid-cols-2 gap-x-16">
              <span className="font-medium text-gray-600">Flight Number:</span>
              <span>{launch.flight_number}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-16">
              <span className="font-medium text-gray-600">Mission Name:</span>
              <span>{launch.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-16">
              <span className="font-medium text-gray-600">Rocket Type:</span>
              <span>{launch.rocket?.type || "v1.0"}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-16">
              <span className="font-medium text-gray-600">Rocket Name:</span>
              <span>{launch.rocket?.name || "Falcon 9"}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-16">
              <span className="font-medium text-gray-600">Manufacturer:</span>
              <span>{launch.manufacturer || "SpaceX"}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-16">
              <span className="font-medium text-gray-600">Nationality:</span>
              <span>{launch.nationality || "SpaceX"}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-16">
              <span className="font-medium text-gray-600">Launch Date:</span>
              <span>{new Date(launch.date_utc).toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-16">
              <span className="font-medium text-gray-600">Payload Type:</span>
              <span>{launch.payloads?.[0]?.type || "N/A"}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-16">
              <span className="font-medium text-gray-600">Orbit:</span>
              <span>{launch.payloads?.[0]?.orbit || "LEO"}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-16">
              <span className="font-medium text-gray-600">Launch Site:</span>
              <span>{launch.launchpad || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusText(launch) {
  if (launch.upcoming) return "Upcoming";
  if (launch.success) return "Success";
  return "Failed";
}

function getStatusStyle(launch) {
  if (launch.upcoming) return "bg-yellow-100 text-yellow-800";
  if (launch.success) return "bg-green-100 text-green-800";
  return "bg-red-100 text-red-800";
}
