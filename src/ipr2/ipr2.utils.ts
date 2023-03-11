export class Ipr2Utils {
  f(n: number, N: number, fi = 0): number {
    return Math.sin(2 * Math.PI * n / N) + fi;
  }

  getMArray(N = 64): number[] {
    const start = N/4;
    const end = 2 * N;
    const step = 1;
    const result = [];
    for(let i = start; i<end; i += step) {
      result.push(i);
    }

    return result;
  }

  taskSecond(N = 64, fi = 0) {
    const MArray = this.getMArray(N);
    MArray.forEach(M => {
      let squareSum = 0;
      let fSum = 0;
      let sinSum = 0;
      let cosSum = 0;
      for(let n = 0; n < M; n++) {
        const f = this.f(n, N, fi);
        squareSum += Math.pow(f, 2);
        fSum += f;
        sinSum += f * Math.sin(2 * Math.PI * n / MArray.length);
        cosSum += f * Math.cos(2 * Math.PI * n / MArray.length);
      }

      const skz1 = Math.sqrt(squareSum / M);
      const skz2 = Math.sqrt(squareSum / M - Math.pow(fSum / M, 2))
      const amplitude = Math.sqrt(Math.pow(sinSum, 2) + Math.pow(cosSum, 2));
      const skz1Error = 0.707 - skz1;
      const skz2Error = 0.707 - skz2;
      const amplitudeError = 1 - amplitude;

      return { skz1, skz2, amplitude, skz1Error, skz2Error, amplitudeError }
    });

    return MArray;
  }

  taskThird(N = 64) {
    return this.taskSecond(N, 2 * Math.PI / 3);
  }
}
