import "./App.css";
import ChatLayout from "./ChatLayout";
import SidePanel from "./SidePanel";

function App() {
  return (
    <div className="flex h-screen bg-gray-900">
      <SidePanel />
      <ChatLayout />
    </div>
  );
}

export default App;

// <button className="fixed top-4 right-16 bg-gray-600 text-white p-2 z-50 rounded-md">
//   <FontAwesomeIcon icon={faPenToSquare} />
// </button>;
