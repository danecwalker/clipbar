export interface ScaleFn {
  (d: any): number;
  bandwidth: () => number;
  padding: (p: number) => ScaleFn;
  innerPadding: (p: number) => ScaleFn;
  ticks: (n?: number) => any[];
};

export const scaleBand = (domain: string[], range: [number, number]): ScaleFn => {
  const step = (range[1] - range[0]) / domain.length;

  const scale = (d: string) => {
    return range[0] + domain.indexOf(d) * step;
  }

  scale.bandwidth = () => step;

  scale.padding = (p: number) => {
    // p is a padding value between 0 and 1
    const padding = step * p;
    const newStep = step - 2 * padding;
    const newRange: [number, number] = [range[0] + padding, range[1] - padding];
    const newScale = scaleBand(domain, newRange);
    newScale.bandwidth = () => newStep + padding;
    return newScale;
  }

  scale.innerPadding = (p: number) => {
    const padding = step * p;
    const totalPadding = padding * (domain.length - 1);
    const newStep = (range[1] - range[0] - totalPadding) / domain.length;
    const newRange: [number, number] = [range[0], range[1] + padding];
    const newScale = scaleBand(domain, newRange);
    newScale.bandwidth = () => newStep;
    return newScale;
  }

  scale.ticks = (n: number = 10) => {
    // n is the number of ticks
    // we want to return n ticks that are evenly spaced and positioned in the middle of each band
    const step = domain.length / n;
    const ticks = [];
    for (let i = 0; i < n; i++) {
      ticks.push(domain[Math.floor(i * step)]);
    }

    return ticks;
  }

  return scale;
}

export const scaleLinear = (domain: [number, number], range: [number, number]): ScaleFn => {
  const [domainMin, domainMax] = domain;
  const [rangeMin, rangeMax] = range;
  const scale = (d: number) => {
    return rangeMin + (d - domainMin) / (domainMax - domainMin) * (rangeMax - rangeMin);
  };

  scale.ticks = (n: number = 10) => {
    const step = (domainMax - domainMin) / (n - 1);
    const ticks = [];
    for (let i = 0; i < n; i++) {
      ticks.push(domainMin + i * step);
    }
    return ticks;
  }

  scale.bandwidth = () => { throw new Error('scaleLinear does not have a bandwidth method') };
  scale.padding = () => { throw new Error('scaleLinear does not have a padding method') };
  scale.innerPadding = () => { throw new Error('scaleLinear does not have an innerPadding method') };

  return scale;
}