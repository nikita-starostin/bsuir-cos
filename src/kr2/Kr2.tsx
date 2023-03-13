import { useEffect, useRef } from 'react';
import { draw, toPoints } from '../kr1/kr1.functions';
import { Kr2Utils } from './kr2.utils';


function Signal({ signal, amplitudes, phases }: { signal: number[], amplitudes: number[], phases: number[] }) {
  const signalRef = useRef<HTMLDivElement | null>(null);
  const amplitudesRef = useRef<HTMLDivElement | null>(null);
  const phasesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    draw(signalRef, toPoints(signal), [ -2500, 2500 ]);
    draw(amplitudesRef, toPoints(amplitudes), [ -20, 20 ]);
    draw(phasesRef, toPoints(phases), [ -100, 100 ]);
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
    <Signal {...signals.current.original } />
    <h2>Скользящее окно</h2>
    <Signal {...signals.current.movingAverage } />
    <h2>Парабола четвёртой степени</h2>
    <Signal {...signals.current.fourthDegreeParabola } />
    <h2>Медианная фильтрация</h2>
    <Signal {...signals.current.mediumMedian } />
  </>;
}
