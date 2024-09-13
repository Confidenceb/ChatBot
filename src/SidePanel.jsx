import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleList,
  faEllipsis,
  faSearch,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

function SidePanel() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const itemsToday = [
    "Chat-bot ReactJS Tailwind",
    "What is the currrent weather of Lagos state?",
  ];
  const itemsYesterday = ["Chat-bot ReactJS Tailwind", "What is Programming?"];

  return (
    <>
      {/* Fixed Toggle Icon Button */}
      <button
        className="fixed top-4 left-4 hover:bg-gray-800 text-white p-2 z-50 rounded-md"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      >
        <FontAwesomeIcon icon={faRectangleList} />
      </button>

      <div className="flex h-screen">
        {/* Collapsible Panel */}
        <div
          className={`transition-width duration-300 pt-16 h-full overflow-y-auto ${
            isPanelOpen ? "w-64" : "w-0"
          } bg-gray-950 text-white`}
        >
          <div className="p-4">
            {/* Top Icons/Sections */}
            {/* <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faSearch} />
                <span className="text-sm">Search</span>
              </div>
              <div className="flex items-center space-x-2">
                <FontAwesomeIcon icon={faCogs} />
                <span className="text-sm">Settings</span>
              </div>
              {/* Add more icons and sections as needed 
            </div>
            */}

            {/* <hr className="my-4 border-gray-700" /> */}

            {/* Today Section */}
            <div className="mb-6">
              <div className="font-bold text-sm mb-2">Today</div>
              <ul className="space-y-2">
                {itemsToday.map((item, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`flex justify-between items-center text-sm py-1 cursor-pointer p-2 rounded-md ${
                      hoveredIndex === index ? "bg-gray-900" : ""
                    }`}
                  >
                    <span>{item}</span>
                    {hoveredIndex === index && (
                      <FontAwesomeIcon icon={faEllipsis} />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Yesterday Section */}
            <div>
              <div className="font-bold text-sm mb-2">Yesterday</div>
              <ul className="space-y-2">
                {itemsYesterday.map((item, index) => (
                  <li
                    key={index}
                    onMouseEnter={() =>
                      setHoveredIndex(index + itemsToday.length)
                    }
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`flex justify-between items-center text-sm py-1 cursor-pointer p-2 rounded-md ${
                      hoveredIndex === index + itemsToday.length
                        ? "bg-gray-900"
                        : ""
                    }`}
                  >
                    <span>{item}</span>
                    {hoveredIndex === index + itemsToday.length && (
                      <FontAwesomeIcon icon={faEllipsis} />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SidePanel;
