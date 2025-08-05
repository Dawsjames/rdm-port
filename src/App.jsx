import { BrowserRouter } from "react-router-dom";
import { Hero } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Hero />
        </div>

        {/* Add more sections here as you build them */}
        <div className="h-screen bg-gray-900 flex items-center justify-center">
          <h2 className="text-white text-4xl">About Section</h2>
        </div>

        <div className="h-screen bg-gray-800 flex items-center justify-center">
          <h2 className="text-white text-4xl">Portfolio Section</h2>
        </div>

        <div className="h-screen bg-gray-700 flex items-center justify-center">
          <h2 className="text-white text-4xl">Contact Section</h2>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
