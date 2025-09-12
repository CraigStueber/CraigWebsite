import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Wyrmspire from "./pages/Wyrmspire/Wyrmspire";
import Login from "./components/Login/Login";
import LongrockCasino from "./pages/LongrockCasino/LongrockCasino";
import { CharacterProvider } from "./context/CharacterContext";
import ArmWrestlingGame from "./pages/ArmWrestlingGame/ArmWrestlingGame";
import MegansList from "./pages/MegansList";
import { SessionProvider } from "./context/SessionContext";
function App() {
  return (
    <>
      <CharacterProvider>
        <SessionProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wyrmspire" element={<Wyrmspire />} />
            <Route path="/login" element={<Login />} />
            <Route path="/longrock-casino" element={<LongrockCasino />} />
            <Route path="/arm-wrestling-game" element={<ArmWrestlingGame />} />
            {/* Privacy Policy Route */}
            <Route path="/pp" element={<PrivacyPolicy />} />
            <Route path="/meganslist" element={<MegansList />} />
          </Routes>
        </SessionProvider>
      </CharacterProvider>
    </>
  );
}

export default App;
