import functionPlot from 'function-plot';
import { useEffect, useRef, useState } from 'react';
import { Ipr2Utils } from './ipr2.utils';


function draw(task1Ref: React.MutableRefObject<HTMLDivElement | null>, task2Points: number[][]) {
  functionPlot({
    target: task1Ref.current!,
    width: 1400,
    height: 800,
    yAxis: {
      domain: [ 0, 200 ],
      label: 'Error'
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
  const task2Ref = useRef<HTMLDivElement | null>(null);
  const task3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mValues = ipr2Utils.getMArray();
    const errors2 = ipr2Utils.taskSecond();
    const errors3 = ipr2Utils.taskThird();

    const task2Points = mValues.map((p, i) => ([ p, errors2[i] ]));
    const task3Points = mValues.map((p, i) => ([ p, errors3[i] ]));
    draw(task2Ref, task2Points);
    draw(task3Ref, task3Points);
  }, []);

  return <>
    <h1>Ipr2 - скролить вниз, чтобы увидеть все графики</h1>
    <h2>Задание 2</h2>
    <div ref={task2Ref} />
    <h2>Задание 3</h2>
    <div ref={task3Ref} />
  </>;
}
