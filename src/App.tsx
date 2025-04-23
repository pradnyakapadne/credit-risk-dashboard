import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import "antd/dist/reset.css";
import { ConfigProvider, theme } from "antd";


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Dashboard isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </ConfigProvider>
  );
}

export default App;
