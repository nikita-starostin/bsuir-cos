import functionPlot from 'function-plot';
import { useEffect, useRef, useState } from 'react';
import { Height } from '../constants';
import { Ipr2Utils } from './ipr2.utils';


function draw(
  task1Ref: React.MutableRefObject<HTMLDivElement | null>,
  task2Points: number[][],
  yLabel: string,
  yDomain = [ 0, 200 ]
) {
  functionPlot({
    target: task1Ref.current!,
    width: 1400,
    height: Height,
    yAxis: {
      domain: yDomain,
      label: yLabel
    },
    xAxis: {
      domain: [ 0, 200 ],
      label: 'M'
    },
    data: [
      {
        points: task2Points,
        fnType: 'points',
        graphType: 'polyline'
      }
    ]
  });
}

export default function Ipr2() {
  const [ ipr2Utils ] = useState(new Ipr2Utils());
  const task2Skz1Ref = useRef<HTMLDivElement | null>(null);
  const task2Skz2Ref = useRef<HTMLDivElement | null>(null);
  const task2AmplitudeRef = useRef<HTMLDivElement | null>(null);
  const task3Skz1Ref = useRef<HTMLDivElement | null>(null);
  const task3Skz2Ref = useRef<HTMLDivElement | null>(null);
  const task3AmplitudeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mValues = ipr2Utils.getMArray();
    const errors2 = ipr2Utils.taskSecond();
    const errors3 = ipr2Utils.taskThird();

    const task2Skz1Points = mValues.map((p, i) => ([ p, errors2[i].skz1Error ]));
    const task2Skz2Points = mValues.map((p, i) => ([ p, errors2[i].skz2Error ]));
    const task2AmplitudePoints = mValues.map((p, i) => ([ p, errors2[i].amplitude ]));
    const task3Skz1Points = mValues.map((p, i) => ([ p, errors3[i].skz1Error ]));
    const task3Skz2Points = mValues.map((p, i) => ([ p, errors3[i].skz2Error ]));
    const task3AmplitudePoints = mValues.map((p, i) => ([ p, errors3[i].amplitude ]));
    draw(task2Skz1Ref, task2Skz1Points, 'skz1', [ -0.5, 0.5 ]);
    draw(task2Skz2Ref, task2Skz2Points, 'skz2', [ -0.5, 0.5 ]);
    draw(task2AmplitudeRef, task2AmplitudePoints, 'Amplitude');
    draw(task3Skz1Ref, task3Skz1Points, 'skz1', [ -0.5, 0.5 ]);
    draw(task3Skz2Ref, task3Skz2Points, 'skz2', [ -0.2, 0.8 ]);
    draw(task3AmplitudeRef, task3AmplitudePoints, 'Amplitude');
  }, []);

  return <>
    <h1>Ipr2 - скролить вниз, чтобы увидеть все графики</h1>
    <h2>Задание 2</h2>
    <h3>СКЗ 1</h3>
    <div ref={ task2Skz1Ref }/>
    <h3>СКЗ 2</h3>
    <div ref={ task2Skz2Ref }/>
    <h3>Амплитуда</h3>
    <div ref={ task2AmplitudeRef }/>
    <h2>Задание 3</h2>
    <h3>СКЗ 1</h3>
    <div ref={ task3Skz1Ref }/>
    <h3>СКЗ 2</h3>
    <div ref={ task3Skz2Ref }/>
    <h3>Амплитуда</h3>
    <div ref={ task3AmplitudeRef }/>
  </>;
}
