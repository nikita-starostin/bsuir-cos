import { genArray } from '../kr1/kr1.functions';


export class Kr2Utils {
  doJob(N = 512) {
    const signal = this.getSignal(N);
    const movingAverage = this.getMovingAverage(signal);
    const fourthDegreeParabola = this.getFourthDegreeParabola(signal);
    const mediumMedian = this.getMediumMedian(signal);

    return {
      original: {
        signal,
        ...this.getFourierDiscret(N, signal)
      },
      movingAverage: {
        signal: movingAverage,
        ...this.getFourierDiscret(N, movingAverage)
      },
      fourthDegreeParabola: {
        signal: fourthDegreeParabola,
        ...this.getFourierDiscret(N, fourthDegreeParabola)
      },
      mediumMedian: {
        signal: mediumMedian,
        ...this.getFourierDiscret(N, mediumMedian)
      }
    };
  }

  getSignal(N = 512) {
    const b1 = 100;
    const b2 = 0.01;
    const signal = genArray(
      N,
      i => {
        const a = b1 * Math.sin(2 * Math.PI * i / N);
        let b = 0;
        for (let j = 50; j <= 70; ++j) {
          b += Math.random() * b2 * Math.sin(2 * Math.PI * j * i / N);
        }
        console.log(a, b);
        return a + b;
      }
    );

    return signal;
  }

  getMovingAverage(signal: number[]) {
    const size = 9;
    const result = [];
    for (let i = 0; i < signal.length; ++i) {
      let sum = 0;
      for (let j = i; j < i + size; ++j) {
        sum += signal[j] || signal[i];
      }
      result.push(sum / size);
    }

    return result;
  }

  getFourthDegreeParabola(signal: number[]) {
    const result = [];
    for (let i = 0; i < signal.length; ++i) {
      const x1 = signal[i - 3] || signal[i];
      const x2 = signal[i - 2] || signal[i];
      const x3 = signal[i - 1] || signal[i];
      const x4 = signal[i];
      const x5 = signal[i + 1] || signal[i];
      const x6 = signal[i + 2] || signal[i];
      const x7 = signal[i + 3] || signal[i];
      const sum = 5 * x1 - 30 * x2 + 75 * x3 + 131 * x4 + 75 * x5 - 30 * x6 + 5 * x7;
      result.push(sum / 231);
    }

    return result;
  }

  getMediumMedian(signal: number[]) {
    const size = 5;
    const result = [];
    for (let i = 0; i < signal.length; ++i) {
      const arr = [];
      for (let j = i; j < i + size; ++j) {
        arr.push(signal[j] || signal[i]);
      }
      arr.sort((a, b) => a - b);
      result.push(arr[Math.floor(arr.length / 2)]);
    }
    return result;
  }

  getFourierDiscret(N: number, signal: number[]) {
    const amplitudes = genArray(N, i => {
      let a = 0;
      for (let j = 0; j < N; ++j) {
        a += signal[j] * Math.cos(2 * Math.PI * i * j / N);
      }
      return a / N;
    });

    const phases = genArray(N, i => {
      let a = 0;
      for (let j = 0; j < N; ++j) {
        a += signal[j] * Math.sin(2 * Math.PI * i * j / N);
      }
      return a / N;
    });

    return { amplitudes, phases };
  }
}
