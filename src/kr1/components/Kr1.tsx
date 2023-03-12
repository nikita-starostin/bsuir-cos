import React, { useEffect, useRef } from 'react';
import { draw, toPoints } from '../kr1.functions';
import Kr1Header from './kr1Header';


export default function Kr1({
  signal,
  signalLabel = 'Сигнал',
  signalDomain = [ -200, 200 ],
  restored,
  restoredLabel = 'Восстановленный',
  restoredDomain = [ -50000, 50000 ],
  amplitudes,
  amplitudesLabel = 'Амплитуды',
  amplitudesDomain = [ -20, 30000 ],
  phases,
  phasesLabel = 'Фазы',
  phasesDomain = [ -5, 5 ]
}: {
  signal: number[],
  restored: number[],
  amplitudes: number[],
  phases: number[],
  restoredDomain?: [ number, number ],
  signalLabel?: string,
  restoredLabel?: string,
  amplitudesLabel?: string,
  phasesLabel?: string,
  signalDomain?: [number, number],
  phasesDomain?: [number, number],
  amplitudesDomain?: [number, number],
}) {
  const signalRef = useRef<HTMLDivElement | null>(null);
  const amplitudesRef = useRef<HTMLDivElement | null>(null);
  const restoredRef = useRef<HTMLDivElement | null>(null);
  const phasesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    draw(signalRef, toPoints(signal), signalDomain);
    draw(amplitudesRef, toPoints(amplitudes), amplitudesDomain);
    draw(restoredRef, toPoints(restored), restoredDomain);
    draw(phasesRef, toPoints(phases), phasesDomain);
  }, []);

  return <>
    <Kr1Header/>
    <h3>{signalLabel}</h3>
    <div ref={ signalRef }></div>
    <h3>{restoredLabel}</h3>
    <div ref={ restoredRef }></div>
    <h3>{amplitudesLabel}</h3>
    <div ref={ amplitudesRef }></div>
    <h3>{phasesLabel}</h3>
    <div ref={ phasesRef }></div>
  </>;
}
