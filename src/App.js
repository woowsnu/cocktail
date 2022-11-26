import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cocktails from "./pages/cocktails/Cocktails";
import Cocktail from "./pages/cocktails/Cocktail";
import SearchResult from "./pages/search/SearchResult";
import Layout from "./UI/Layout";
import MyCocktail from "./pages/myCocktail/MyCocktail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="/cocktail/:id" element={<Cocktail />} />
          <Route path="/search/:keyword" element={<SearchResult />} />
          <Route path="/myCocktail" element={<MyCocktail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
