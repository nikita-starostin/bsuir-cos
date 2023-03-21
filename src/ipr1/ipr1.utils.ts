const harmonics = [
  {
    A: 6,
    F: Math.PI / 6,
    f: 1
  },
  {
    A: 6,
    F: Math.PI / 2,
    f: 2
  },
  {
    A: 6,
    F: Math.PI / 3,
    f: 3
  },
  {
    A: 6,
    F: Math.PI / 9,
    f: 4
  },
  {
    A: 6,
    F: 0,
    f: 5
  }
];

export class Ipr1Utils {
  f(n: number, A: number, f: number, N: number, F: number) {
    const angle = (2 * Math.PI * f * n) / N;
    return A * Math.sin(angle + F);
  }

  task2A(N = 512): [ number[][][], string[] ] {
    const A = 6;
    const f = 3;
    const FVariants = [
      2 * Math.PI,
      Math.PI / 6,
      Math.PI / 2,
      0,
      3 * Math.PI / 4
    ];
    const fVariantsTitles = [
      'φ=2π',
      'φ=π/6',
      'φ=π/2',
      'φ=0',
      'φ=3π/4'
    ];

    const results: number[][][] = [];

    for (let i = 0; i < FVariants.length; ++i) {
      results[i] = [];
      const F = FVariants[i];
      for (let j = 0; j < N; ++j) {
        results[i][j] = [ j, this.f(j, A, f, N, F) ];
      }
    }

    return [ results, fVariantsTitles ];
  }

  task2B(N = 512): [ number[][][], string[] ] {
    const A = 8;
    const F = Math.PI / 4;
    const fVariants = [
      2,
      4,
      3,
      7,
      5
    ];

    const fVariantsTitles = [
      'f1=2',
      'f2=4',
      'f3=3',
      'f4=7',
      'f5=5'
    ];

    const results: number[][][] = [];

    for (let i = 0; i < fVariants.length; ++i) {
      results[i] = [];
      const f = fVariants[i];
      for (let j = 0; j < N; ++j) {
        results[i][j] = [ j, this.f(j, A, f, N, F) ];
      }
    }

    return [ results, fVariantsTitles ];
  }

  task2C(N = 512): [ number[][][], string[] ] {
    const f = 5;
    const F = Math.PI / 4;
    const AVariants = [
      2,
      2,
      8,
      3,
      1
    ];

    const aVariantsTitles = [
      'A1=2',
      'A2=2',
      'A3=8',
      'A4=3',
      'A5=1'
    ];

    const results: number[][][] = [];

    for (let i = 0; i < AVariants.length; ++i) {
      results[i] = [];
      const A = AVariants[i];
      for (let j = 0; j < N; ++j) {
        results[i][j] = [ j, this.f(j, A, f, N, F) ];
      }
    }

    return [ results, aVariantsTitles ];
  }

  task3(N = 512): [ number[][][], string[] ] {
    const results: number[][][] = [];

    results[0] = [];
    for (let i = 0; i < N; ++i) {
      let sum = 0;
      for (let j = 0; j < harmonics.length; ++j) {
        const { A, f, F } = harmonics[j];
        sum += this.f(i, A, f, N, F);
      }
      results[0][i] = [ i, sum ];
    }

    return [ results, [] ];
  }

  task3PhaseChanged(N = 512): [number[][][], string[]] {
    const results: number[][][] = [];
    const { A, f } = harmonics[0];

    results[0] = [];
    for (let i = 0; i < N; ++i) {
      let sum = 0;
      for (let j = 0; j < harmonics.length; ++j) {
        const { F } = harmonics[j];
        sum += this.f(i, A, f, N, F);
      }
      results[0][i] = [ i, sum ];
    }

    return [ results, [] ];
  }

  task4(N = 512): [ number[][][], string[] ] {
    const startf = 4;
    const startF = Math.PI / 9;
    const startA = 6;

    const harmonicCount = 5;

    const getHarmonicParams = (n: number) => {
      return {
        f: startf + n * 0.1,
        F: startF + Math.PI * n * 0.01,
        A: startA + n * 0.1
      };
    };

    const results: number[][][] = [];
    results[0] = [];
    let counter = 0;
    for (let i = 0; i < N; ++i) {
      const sum = 0;
      for(let j = 0; j < harmonicCount; ++j) {
        const { f, F, A } = getHarmonicParams(counter);
        results[0][i] = [ i, this.f(i, A, f, N, F) ];
        counter++;
        if (counter === 101) {
          counter = -99;
        }
      }
    }

    return [ results, [] ];
  }
}
