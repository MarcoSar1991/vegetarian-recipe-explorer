import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import Favorites from "./pages/Favorites.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
