import React, { useRef } from 'react';
import Kr1 from './components/Kr1';
import Kr1Header from './components/kr1Header';
import { Kr1Utils } from './kr1.utils';


export default function Kr1Task3() {
  const kr1Utils = useRef(new Kr1Utils());
  const props = useRef(kr1Utils.current.taskThird());

  return <>
    <Kr1Header/>
    <h2>Задание 3</h2>
    <Kr1 { ...props.current } />
  </>;
}
