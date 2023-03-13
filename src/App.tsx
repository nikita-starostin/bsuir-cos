import React from 'react';
import { Link, Redirect, Route, Switch } from 'wouter';
import './App.css';
import Ipr1 from './ipr1/ipr1';
import Ipr2 from './ipr2/ipr2';
import Kr1Task2 from './kr1/kr1Task2';
import Kr1Task3 from './kr1/kr1Task3';
import Kr1Task4 from './kr1/kr1Task4';
import Kr1Task5 from './kr1/kr1Task5';
import Kr2 from './kr2/Kr2';


export default function App() {
  return (
    <>
      <div style={ { display: 'flex', gap: '10px' } }>
        <Link href="/ipr1">
          <a>Ipr 1</a>
        </Link>
        <Link href="/ipr2">
          <a>Ipr 2</a>
        </Link>
        <Link href="/kr1/2">
          <a>Kr 1</a>
        </Link>
        <Link href="/kr2">
          <a>Kr 2</a>
        </Link>
      </div>
      <Switch>
        <Route path="/ipr1">
          <Ipr1/>
        </Route>
        <Route path="/ipr2">
          <Ipr2/>
        </Route>
        <Route path="/kr1/2">
          <Kr1Task2/>
        </Route>
        <Route path="/kr1/3">
          <Kr1Task3/>
        </Route>
        <Route path="/kr1/4">
          <Kr1Task4/>
        </Route>
        <Route path="/kr1/5">
          <Kr1Task5/>
        </Route>
        <Route path="/kr1">
          <Redirect to="/kr1/2"/>
        </Route>
        <Route path="/kr2">
          <Kr2/>
        </Route>
        <Route path="">
          <Redirect to="/ipr1"/>
        </Route>
      </Switch>
    </>
  );
}
