import functionPlot from 'function-plot';
import React from 'react';
import { Height } from '../constants';


export function draw(
  task1Ref: React.MutableRefObject<HTMLDivElement | null>,
  points: number[][],
  yDomain: [ number, number ]
) {
  functionPlot({
    target: task1Ref.current!,
    width: 1400,
    height: Height,
    yAxis: {
      domain: yDomain
    },
    xAxis: {
      domain: [ -40, 600 ]
    },
    data: [
      {
        points: points,
        fnType: 'points',
        graphType: 'polyline'
      }
    ]
  });
}

export function toPoints(arr: number[]) {
  return arr.map((v, i) => ([ i, v ]));
}

export function genArray<TOut>(size: number, generator: (i: number) => TOut): TOut[] {
  const res = [];
  for(let i = 0; i<size; ++i) {
    res.push(generator(i));
  }

  return res;
}
