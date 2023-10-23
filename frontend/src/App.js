import "./App.css";
import Home from "./components/HomePage/Home";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/404Page/PageNotFound";
function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
