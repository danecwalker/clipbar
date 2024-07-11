export interface ScaleFn {
  (d: any): number;
  bandwidth: () => number;
  padding: (p: number) => ScaleFn;
  innerPadding: (p: number) => ScaleFn;
  ticks: (n?: number, step?: number | ((d: any) => boolean)) => any[];
  invert: (d: number) => any;
  domain: () => any[];
};

export const scaleBand = (domain: (string | number)[], range: [number, number]): ScaleFn => {
  const step = (range[1] - range[0]) / domain.length;

  const scale = (d: string) => {
    return range[0] + domain.indexOf(d) * step;
  }

  scale.invert = (d: number) => {
    const index = Math.floor((d - range[0]) / step);
    return domain[index];
  }

  scale.domain = () => domain;

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

  scale.ticks = (n: number = 10, step: number | ((d: any) => boolean) | undefined = undefined) => {
    // n is the number of ticks
    // we want to return n ticks that are evenly spaced and positioned in the middle of each band
    if (step === undefined) {
      step = domain.length / n;
    }

    if (typeof step === 'function') {
      const ticks = [];
      for (let i = 0; i < domain.length; i++) {
        if (step(domain[i])) {
          ticks.push(domain[i]);
        }
      }
      return ticks;
    } else {
      const ticks = [];
      for (let i = 0; i < n; i++) {
        ticks.push(domain[Math.floor(i * step!)]);
      }

      return ticks;
    }
  }

  return scale;
}

export const scaleLinear = (domain: [number, number], range: [number, number]): ScaleFn => {
  const [domainMin, domainMax] = domain;
  const [rangeMin, rangeMax] = range;
  const scale = (d: number) => {
    return rangeMin + (d - domainMin) / (domainMax - domainMin) * (rangeMax - rangeMin);
  };

  scale.invert = (d: number) => {
    return domainMin + (d - rangeMin) / (rangeMax - rangeMin) * (domainMax - domainMin);
  }

  scale.domain = () => domain;

  scale.ticks = (n: number = 10, step: number | ((d: any) => boolean) | undefined = undefined) => {
    if (step === undefined) {
      step = (domainMax - domainMin) / (n - 1);
    }
    if (typeof step === 'function') {
      const ticks = [];
      for (let i = 0; i < domain.length; i++) {
        if (step(domain[i])) {
          ticks.push(domain[i]);
        }
      }
      return ticks;
    } else {
      const ticks = [];
      for (let i = 0; i < n; i++) {
        ticks.push(domainMin + i * step!);
      }
      return ticks;
    }
  }

  scale.bandwidth = () => { throw new Error('scaleLinear does not have a bandwidth method') };
  scale.padding = () => { throw new Error('scaleLinear does not have a padding method') };
  scale.innerPadding = () => { throw new Error('scaleLinear does not have an innerPadding method') };

  return scale;
}

export const extent = (data: any[], accessor: (d: any) => number[]): [number, number] => {
  let min = Infinity;
  let max = -Infinity;
  for (const d of data) {
    const value = accessor(d);
    min = Math.min(min, Math.min(...value));
    max = Math.max(max, Math.max(...value));
  }
  return [min, max];
}

export const pad = (domain: [number, number], padding: number): [number, number] => {
  const [min, max] = domain;
  const diff = max - min;
  return [min - diff * padding, max + diff * padding];
}