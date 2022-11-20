import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cocktails from "./routes/Cocktails";
import Cocktail from "./routes/Cocktail.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cocktails />}/>
        <Route path="/:id" element={<Cocktail />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
