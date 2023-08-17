import { useState } from "react";
import "./App.css";
import AddEmployeeComponent from "./components/AddEmployeeComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import { Route, Routes } from "react-router-dom";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";

function App() {
  return (
    <>
      <HeaderComponent />
      <div className="container">
        <Routes>
          <Route path="/" exact Component={ListEmployeeComponent} />

          <Route path="/newEmployee" Component={AddEmployeeComponent} />
          <Route
            path="/updateEmployee/:id"
            Component={UpdateEmployeeComponent}
          />
        </Routes>
        {/* <ListEmployeeComponent /> */}
      </div>
      <FooterComponent />
    </>
  );
}

export default App;
