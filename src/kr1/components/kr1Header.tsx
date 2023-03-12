import React from 'react';
import { Link } from 'wouter';


export default function Kr1Header() {
  return <>
    <h1>Kr1 - скролить вниз, чтобы увидеть все графики</h1>
    <div style={ { display: 'flex', gap: '10px' } }>
      <Link href="/kr1/2">
        <a>Задание 2</a>
      </Link>
      <Link href="/kr1/3">
        <a>Задание 3</a>
      </Link>
      <Link href="/kr1/4">
        <a>Задание 4</a>
      </Link>
      <Link href="/kr1/5">
        <a>Задание 5</a>
      </Link>
    </div>
  </>;
}
