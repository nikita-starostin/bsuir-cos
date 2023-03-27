import { useEffect, useRef, useState } from 'react';
import { draw, toPoints } from '../kr1/kr1.functions';
import { Kr2Utils } from './kr2.utils';


function Signal({
  signal,
  amplitudes,
  phases,
  signalDomain,
  amplitudesDomain,
  phasesDomain
}: {
  signal: number[],
  amplitudes: number[],
  phases: number[],
  signalDomain: [ number, number ],
  amplitudesDomain: [ number, number ],
  phasesDomain: [ number, number ]
}) {
  const signalRef = useRef<HTMLDivElement | null>(null);
  const amplitudesRef = useRef<HTMLDivElement | null>(null);
  const phasesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    draw(signalRef, toPoints(signal), signalDomain);
    draw(amplitudesRef, toPoints(amplitudes), amplitudesDomain);
    draw(phasesRef, toPoints(phases), phasesDomain);
  }, [signal, amplitudes, phases]);

  return <>
    <h3>Сигнал</h3>
    <div ref={ signalRef }></div>
    <h3>Амплитуды</h3>
    <div ref={ amplitudesRef }></div>
    <h3>Фазы</h3>
    <div ref={ phasesRef }></div>
  </>;
}

export default function Kr2() {
  const kr2Utils = useRef(new Kr2Utils());
  const [ b1, setB1 ] = useState(100);
  const [ b2, setB2 ] = useState(0.001);
  const [ signals, setSignals ] = useState(kr2Utils.current.doJob(b1, b2));
  const firstRenderRef = useRef(true);

  useEffect(() => {
    console.log(firstRenderRef.current);
    if(!firstRenderRef.current) {
      setSignals(kr2Utils.current.doJob(b1, b2));
    } else {
      firstRenderRef.current = false;
    }
  }, [ b1, b2 ]);

  return <>
    <h1>Kr2 - скролить вниз, чтобы увидеть все графики</h1>
    <p>
      Графики обновляются автоматически при обновлении b1, b2.
    </p>
    <div>
      <label style={ { fontWeight: 'bold' } }
             htmlFor="b1Input">
        b1:
      </label>
      <input value={ b1 }
             id="b1Input"
             type="number"
             onChange={ e => setB1(+e.target.value) }/>
    </div>
    <div>
      <label style={ { fontWeight: 'bold' } }
             htmlFor="b2Input">
        b2:
      </label>
      <input value={ b2 }
             id="b2Input"
             type="number"
             onChange={ e => setB2(+e.target.value) }/>
    </div>
    <h2>Исходный</h2>
    <Signal { ...signals.original }
            signalDomain={ [ -200, 200 ] }
            amplitudesDomain={ [ -8, 8 ] }
            phasesDomain={ [ -60, 60 ] }
    />
    <h2>Скользящее окно</h2>
    <Signal { ...signals.movingAverage }
            signalDomain={ [ -120, 120 ] }
            amplitudesDomain={ [ -2, 4 ] }
            phasesDomain={ [ -60, 60 ] }
    />
    <h2>Парабола четвёртой степени</h2>
    <Signal { ...signals.fourthDegreeParabola }
            signalDomain={ [ -200, 200 ] }
            amplitudesDomain={ [ -1, 1 ] }
            phasesDomain={ [ -60, 60 ] }
    />
    <h2>Медианная фильтрация</h2>
    <Signal { ...signals.mediumMedian }
            signalDomain={ [ -200, 200 ] }
            amplitudesDomain={ [ -2, 2 ] }
            phasesDomain={ [ -60, 60 ] }
    />
  </>;
}
