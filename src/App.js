import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import SerieDetails from "./components/SerieDetails";
import EpisodeDetails from "./components/EpisodeDetails";
import ListAmis from "./components/ListAmis";
import RequetAmi from "./components/RequetAmi";
import ShowProfil from "./components/ShowProfil";
import SearchUser from "./components/SearchUser";
import MesSeries from "./components/MesSeries";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mes_series" element={<MesSeries/>} />
        <Route path="/series/:id" element={<SerieDetails/>} />
        <Route path="/episode/:id" element={<EpisodeDetails/>} />
        <Route path="/amis" element={<ListAmis/>} />
        <Route path="/demandes" element={<RequetAmi/>} />
        <Route path="/profil/:id" element={<ShowProfil/>} />
        <Route path="/chercher" element={<SearchUser/>} />
      </Routes>
    </>
  );
}

export default App;