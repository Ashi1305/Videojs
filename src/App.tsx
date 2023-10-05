import React from "react";
import { Route, Routes } from "react-router-dom";
import SplashPage from "./components/Splash";
import HomePage from "./pages/Home";
import Player from "./pages/Player";

const App: React.FunctionComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </>
  );
};

export default App;
