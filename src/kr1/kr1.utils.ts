import { Complex } from './components/complex';
import { genArray } from './kr1.functions';


export class Kr1Utils {
  f(i: number, N: number) {
    const a = 2 * Math.PI * 20 * i / N;
    const b = Math.PI / 4;
    return 100 * Math.cos(a - b);
  }

  taskSecond(N = 512) {
    const signal = Array.from({ length: N }, (v, i) => this.f(i, N));
    const { amplitudes, phases } = this.getFourierDiscret(N, signal);
    const restored = this.getRestored(N, amplitudes, phases);

    return {
      signal,
      amplitudes,
      phases,
      restored
    };
  }

  taskThird(N = 512) {
    const signal = this.getPolyharmonicSignal(N);
    const { amplitudes, phases } = this.getFourierDiscret(N, signal);
    const restored = this.getRestored(N, amplitudes, phases);

    return {
     amplitudes,
     phases,
     signal,
     restored
    }
  }

  taskFourth(N = 512) {
    const signal = this.getPolyharmonicSignal(N)
    const { amplitudes, phases } = this.getFourierFast(N, signal);
    const restored = this.getRestored(N, amplitudes, phases);

    return {
      amplitudes,
      phases,
      signal,
      restored
    }
  }

  private getPolyharmonicSignal(N: number) {
    const randomAmplitudes = [ 2, 3, 5, 9, 10, 12, 15 ];
    const randomPhases = [ Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 3 * Math.PI / 4, Math.PI ];
    const harmonicCount = 30;

    const harmonicAmplitudes = genArray(
      harmonicCount,
      () => randomAmplitudes[Math.floor(Math.random() * (randomAmplitudes.length - 1))]
    );

    const harmonicPhases = genArray(
      harmonicCount,
      () => randomPhases[Math.floor(Math.random() * (randomPhases.length - 1))]
    );

    const signal = genArray(
      N,
      (i) => {
        let sum = 0;
        for (let j = 1; j <= harmonicCount; ++j) {
          sum += harmonicAmplitudes[j - 1] *
            Math.cos(2 * Math.PI * j * i / N - harmonicPhases[j - 1]);
        }

        return sum;
      }
    );
    return signal;
  }


  private getFourierFast(N: number, signal: number[]) {
    const complex = Complex.fromArray(signal);
    const fourier = this.getFourierTable(complex);
    const amplitudes = fourier.map((v) => v.magnitude() * 2 / N);
    const phases = fourier.map((v) => v.phase());

    return {
      amplitudes,
      phases
    };
  }

  private getFourierTable(arr: Complex[]): Complex[] {
    const res: Complex[] = [];
    const N = arr.length;
    if(N == 2) {
      res.push(Complex.add(arr[0], arr[1]))
      res.push(Complex.subtract(arr[0], arr[1]))
    } else {
      const even: Complex[] = [];
      const odd: Complex[] = [];

      for(let i = 0; i<N/2; ++i) {
        even.push(arr[2 * i]);
        odd.push(arr[2 * i + 1]);
      }

      const evenArr = this.getFourierTable(even);
      const oddArr = this.getFourierTable(odd);

      for(let i = 0; i<N/2; ++i) {
        const w = i % N === 0
          ? new Complex(1, 0)
          : new Complex(Math.cos(-2 * Math.PI * i / N), Math.sin(-2 * Math.PI * i / N));
        res.push(Complex.add(evenArr[i], Complex.multiply(w, oddArr[i])));
        res.push(Complex.subtract(evenArr[i], Complex.multiply(w, oddArr[i])));
      }
    }

    return res;
  }

  private getFourierDiscret(N: number, signal: number[]) {
    const amplitudes = [];
    const phases = [];

    for (let i = 0; i < N / 2 - 1; ++i) {
      let sumR = 0;
      let sumI = 0;

      for (let j = 0; j < N; ++j) {
        sumR += signal[j] * Math.cos(2 * Math.PI * i * j / N);
        sumI += signal[j] * Math.sin(2 * Math.PI * i * j / N);
      }

      amplitudes.push(Math.sqrt(sumR * sumR + sumI * sumI));
      phases.push(Math.atan2(sumI, sumR));
    }

    return {
      amplitudes,
      phases
    };
  }

  private getRestored(N: number, amplitudes: any[], phases: any[]) {
    const restored = [];
    for (let i = 0; i < N; ++i) {
      let sum = amplitudes[0] / 2;

      for (let j = 1; j < N / 2 - 1; ++j) {
        sum += amplitudes[j] * Math.cos(2 * Math.PI * j * i / N - phases[j]);
      }

      restored.push(sum);
    }
    return restored;
  }
}
