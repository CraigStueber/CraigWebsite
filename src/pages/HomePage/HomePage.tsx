import React from "react";
import "./HomePage.styles.css";
import { PersonaProvider } from "./context/chatbot/personaContext";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";

export default function HomePage() {
  return (
    <PersonaProvider>
      <div className="homepage-container">
        <LeftPanel />
        <RightPanel />
      </div>
    </PersonaProvider>
  );
}
