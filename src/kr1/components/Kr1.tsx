import React, { useEffect, useRef } from 'react';
import { draw, toPoints } from '../kr1.functions';
import Kr1Header from './kr1Header';


export default function Kr1({
  signal,
  restored,
  amplitudes,
  phases
}: { signal: number[], restored: number[], amplitudes: number[], phases: number[] }) {
  const signalRef = useRef<HTMLDivElement | null>(null);
  const amplitudesRef = useRef<HTMLDivElement | null>(null);
  const restoredRef = useRef<HTMLDivElement | null>(null);
  const phasesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    draw(signalRef, toPoints(signal), [ -200, 200 ]);
    draw(amplitudesRef, toPoints(amplitudes), [ -20, 30000 ]);
    draw(restoredRef, toPoints(restored), [ -50000, 50000 ]);
    draw(phasesRef, toPoints(phases), [ -5, 5 ]);
  }, []);

  return <>
    <Kr1Header/>
    <h3>Сигнал</h3>
    <div ref={ signalRef }></div>
    <h3>Восстановленный</h3>
    <div ref={ restoredRef }></div>
    <h3>Амплитуды</h3>
    <div ref={ amplitudesRef }></div>
    <h3>Фазы</h3>
    <div ref={ phasesRef }></div>
  </>;
}
