import React, { useRef, useState } from 'react';
import Kr1 from './components/Kr1';
import { Kr1Utils } from './kr1.utils';


export default function Kr1Task2() {
  const kr1Utils = useRef(new Kr1Utils());
  const props = useRef(kr1Utils.current.taskSecond());

  return <>
    <Kr1 { ...props.current } />
  </>;
}
