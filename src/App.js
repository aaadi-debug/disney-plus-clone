import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail';
import Login from './components/Login';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path="/detail/:id"> <Detail /> </Route>
        <Route path="/login"> <Login /> </Route>
        <Route path="/"> <Home /> </Route>
      </Switch>
    </BrowserRouter>

    </div>
  );
}

export default App;
