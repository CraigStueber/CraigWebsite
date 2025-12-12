import { Route, Routes } from "react-router-dom";
import "./App.css";
import ResumePage from "./pages/ResumePage/ResumePage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Login from "./components/Login/Login";
import { CharacterProvider } from "./context/CharacterContext";
import MegansList from "./pages/MegansList";
import { SessionProvider } from "./context/SessionContext";
import HomePage from "./pages/HomePage/HomePage";
function App() {
  return (
    <>
      <CharacterProvider>
        <SessionProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resumepage" element={<ResumePage />} />
            <Route path="/login" element={<Login />} />
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
