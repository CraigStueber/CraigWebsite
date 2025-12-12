import React from "react";
import "./RightPanel.styles.css";
import ChatbotIntro from "./ChatbotIntro";
import ChatContainer from "../../chatbot/ChatContainer";

export default function RightPanel() {
  return (
    <div className="right-panel">
      <ChatbotIntro />
      <ChatContainer />
    </div>
  );
}
