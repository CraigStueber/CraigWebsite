import { Route, Routes } from "react-router-dom";
import "./App.css";

import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import { CharacterProvider } from "./context/CharacterContext";

import { SessionProvider } from "./context/SessionContext";
import HomePage from "./pages/HomePage/HomePage";
function App() {
  return (
    <>
      <CharacterProvider>
        <SessionProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/pp" element={<PrivacyPolicy />} />
          </Routes>
        </SessionProvider>
      </CharacterProvider>
    </>
  );
}

export default App;
