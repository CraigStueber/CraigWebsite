import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Wyrmspire from "./pages/Wyrmspire/Wyrmspire";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wyrmspire" element={<Wyrmspire />} />
        <Route path="/pp" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}

export default App;
