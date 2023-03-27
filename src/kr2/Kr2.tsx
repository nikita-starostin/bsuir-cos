import { useEffect, useRef } from 'react';
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
  }, []);

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
  const signals = useRef(kr2Utils.current.doJob());

  return <>
    <h1>Kr2 - скролить вниз, чтобы увидеть все графики</h1>
    <h2>Исходный</h2>
    <Signal { ...signals.current.original }
            signalDomain={[-1500, 1500]}
            amplitudesDomain={[-8, 8]}
            phasesDomain={[-20, 60]}
    />
    <h2>Скользящее окно</h2>
    <Signal { ...signals.current.movingAverage }
            signalDomain={[-120, 120]}
            amplitudesDomain={[-8, 8]}
            phasesDomain={[-10, 10]}
    />
    <h2>Парабола четвёртой степени</h2>
    <Signal { ...signals.current.fourthDegreeParabola }
            signalDomain={[-1500, 1500]}
            amplitudesDomain={[-8, 8]}
            phasesDomain={[-35, 35]}
    />
    <h2>Медианная фильтрация</h2>
    <Signal { ...signals.current.mediumMedian }
            signalDomain={[-600, 600]}
            amplitudesDomain={[-20, 20]}
            phasesDomain={[-15, 15]}
    />
  </>;
}
