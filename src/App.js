import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Home } from "./Components/Home";
import './Assets/style.css'
// Usuários

import { Users } from "./Components/Users/Users";
import { EditUser } from "./Components/Users/EditUser";
import { AddUser } from "./Components/Users/AddUser";

//Companias

import { Companies } from "./Components/Companies/Companies";
import { AddCompany } from "./Components/Companies/AddCompany";
import { EditCompany } from "./Components/Companies/EditCompany";

//unidades

import { Units } from "./Components/Units/Units";
import { AddUnit } from "./Components/Units/AddUnit";
import { EditUnit } from "./Components/Units/EditUnit";

import { Assets } from "./Components/Assets/Assets";
import { EditAsset } from "./Components/Assets/EditAsset";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <main className="appBody">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/assets" component={Assets} />
            <Route path="/editasset/:id" component={EditAsset} />
            <Route path="/users" component={Users} />
            <Route path="/adduser" component={AddUser} />
            <Route path="/edituser/:id" component={EditUser} /> 
            <Route path="/companies" component={Companies} />
            <Route path="/addcompany" component={AddCompany} />
            <Route path="/editcompany/:id" component={EditCompany} />
            <Route path="/units" component={Units} />
            <Route path="/addunit" component={AddUnit} />
            <Route path="/editunit/:id" component={EditUnit} />

          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
