import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import Profil from "./components/Profil";
import Sortie from "./components/Sortie";
import Logout from "./components/Logout";
import Login from "./components/Login";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/Header";


function App() {
  const {isLoading, error } = useAuth0();

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/event" element={<EventList/>} />
        <Route path="/event/:uid" element={<EventDetails/>} /> 
        <Route path="/account/*" element={<AccountRoutes />} />
      </Routes>
    </>
  );
}


  function AccountRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    );
  }


export default App;
