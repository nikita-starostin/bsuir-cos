import React, { useRef } from 'react';
import Kr1 from './components/Kr1';
import Kr1Header from './components/kr1Header';
import { Kr1Utils } from './kr1.utils';


export default function Kr1Task5() {
  const kr1Utils = useRef(new Kr1Utils());
  const props = useRef(kr1Utils.current.taskFifth());

  return <>
    <Kr1Header/>
    <h2>Задание 5</h2>
    <Kr1 signal={ props.current.signal }
         phases={ props.current.restoredHf }
         phasesLabel={ 'ВЧ-фильтр' }
         phasesDomain={[-3000, 3000]}
         restored={ props.current.restoredLf }
         restoredLabel={ 'НЧ-фильтр' }
         restoredDomain={ [ -14000, 12000 ] }
         amplitudes={ props.current.restoredBp }
         amplitudesLabel={ 'Полосовой фильтр' }
         amplitudesDomain={ [ -30000, 30000 ] }
    />
  </>;
}
