import React from 'react';
import { Redirect, Route, Switch } from 'wouter';
import './App.css';
import Ipr1 from './ipr1/ipr1';
import Ipr2 from './ipr2/ipr2';


export default function App() {
  return (
    <>
      <Switch>
        <Route path="/ipr1">
          <Ipr1/>
        </Route>
        <Route path="/ipr2">
          <Ipr2/>
        </Route>
        <Route path="">
          <Redirect to="/ipr1"/>
        </Route>
      </Switch>
    </>
  );
}
