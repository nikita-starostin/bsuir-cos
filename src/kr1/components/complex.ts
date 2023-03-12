import { genArray } from '../kr1.functions';


export class Complex {
  constructor(public r: number, public i: number = 0) {}

  public static add(a: Complex, b: Complex): Complex {
    return new Complex(a.r + b.r, a.i + b.i);
  }

  public static subtract(a: Complex, b: Complex) {
    return new Complex(a.r - b.r, a.i - b.i);
  }

  public static multiply(a: Complex, b: Complex) {
    return new Complex(a.r * b.r - a.i * b.i, a.r * b.i + a.i * b.r);
  }

  public static fromArray(arr: number[]): Complex[] {
    return genArray(arr.length, (i) => new Complex(i));
  }

  public magnitude(): number {
    return Math.sqrt(this.r * this.r + this.i * this.i);
  }

  public phase(): number {
    return Math.atan2(this.i, this.r);
  }
}
