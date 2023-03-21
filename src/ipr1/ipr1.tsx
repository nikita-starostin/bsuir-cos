import functionPlot from 'function-plot';
import { FunctionPlotAnnotation, FunctionPlotDatum, FunctionPlotOptions } from 'function-plot/dist/types';
import { useEffect, useRef, useState } from 'react';
import { Height } from '../constants';
import { Ipr1Utils } from './ipr1.utils';


function getTitles(fVariants: string[], data: number[][][]) {
  const titles: FunctionPlotAnnotation[] = [];
  fVariants.forEach((p, i) => {
    const yValue = data[i][0][1];
    const existingTitle = titles.find(p => p && Math.abs(p.y! - yValue) < 0.1);
    if (existingTitle) {
      existingTitle.text = existingTitle.text + ', ' + p;
    } else {
      titles[i] = {
        y: yValue,
        text: p
      };
    }
  });

  return titles.filter(p => !!p);
}

function Task({ data, variants, options }: { data: number[][][], variants: string[], options?: Partial<FunctionPlotOptions> }) {
  const plotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      const dataSets: FunctionPlotDatum[] = data
        .map(p => ({
          points: p,
          fnType: 'points',
          graphType: 'polyline'
        }));
      const titles = getTitles(variants, data);
      functionPlot({
        target: plotRef.current!,
        width: 1400,
        height: Height,
        yAxis: {
          domain: [ -9, 9 ]
        },
        xAxis: {
          domain: [ -50, 600 ]
        },
        annotations: titles,
        data: dataSets,
        ...options
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return <div ref={ plotRef }></div>;
}

export default function Ipr1() {
  const [ ipr1 ] = useState(new Ipr1Utils());
  const [ data1, variants1 ] = ipr1.task2A();
  const [ data2, variants2 ] = ipr1.task2B();
  const [ data3, variants3 ] = ipr1.task2C();
  const [ data4, variants4 ] = ipr1.task3();
  const [ data5, variants5 ] = ipr1.task4();

  return <>
    <h1>Ipr1 - скролить вниз, чтобы увидеть все графики</h1>
    <h2>Задание 2</h2>
    <h3>a) Меняется фаза</h3>
    <Task data={ data1 }
          variants={ variants1 }/>
    <h3>б) Меняется частота</h3>
    <Task data={ data2 }
          variants={ variants2 }/>
    <h3>в) Меняется амплитуда</h3>
    <Task data={ data3 }
          variants={ variants3 }/>
    <h2>Задание 3</h2>
    <Task data={ data4 }
          variants={ variants4 }
          options={ {
            yAxis: {
              domain: [ -20, 20 ]
            }
          } }/>
    <h2>Задание 4</h2>
    <Task data={ data5 }
          variants={ variants5 }
          options={ {
            yAxis: {
              domain: [ -50, 50 ]
            }
          } }/>
  </>;
}
