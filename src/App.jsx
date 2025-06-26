import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Wyrmspire from "./pages/Wyrmspire/Wyrmspire";
import Login from "./components/Login/Login";
import { CharacterProvider } from "./context/CharacterContext";
function App() {
  return (
    <>
      <CharacterProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wyrmspire" element={<Wyrmspire />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pp" element={<PrivacyPolicy />} />
        </Routes>
      </CharacterProvider>
    </>
  );
}

export default App;
