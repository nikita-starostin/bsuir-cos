import { useRef } from "react";
import Kr1 from './components/Kr1';
import { Kr1Utils } from './kr1.utils';

export default function Kr1Task4() {
  const kr1Utils = useRef(new Kr1Utils());
  const props = useRef(kr1Utils.current.taskFourth());

  return <>
    <Kr1 { ...props.current } restoredDomain={[-100, 800]}/>
  </>;
}
