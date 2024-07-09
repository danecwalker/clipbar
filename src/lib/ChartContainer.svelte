<script context="module" lang="ts">
	import { getContext, setContext } from "svelte";
	import { derived, writable, type Readable, type Writable } from "svelte/store";

  const key = {};

  export type ChartContext = {
    data: Writable<any[]>;
    xScale: Readable<ScaleBandFn>;
    yScale: Readable<ScaleLinearFn>;

    keys: Writable<Set<string>>;
    width: Writable<number>;
    height: Writable<number>;
    padding: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };

  export const getChartContext = () => {
    return getContext<ChartContext>(key);
  };
</script>

<script lang="ts">
  import * as d3 from "d3";
	import { scaleBand, scaleLinear, type ScaleBandFn, type ScaleLinearFn } from "./utils/scales";

  let _class: string = "";
  export { _class as class }; 

  export let width = writable<number>(0);
  export let height = writable<number>(0);
  export let labelKey: string;

  export let padding = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  };

  let _initialData: any[];
  export { _initialData as data };

  let _keys = writable<Set<string>>(new Set());

  const data = writable<any[]>(_initialData);
  const xScale = derived([data, width], ([$data, $width]) => {
    return scaleBand($data.map(d => d[labelKey]), [0, $width - padding.right - padding.left]).innerPadding(0.1);
  });
  const yScale = derived([data, height, _keys], ([$data, $height, $keys]) => {
    return scaleLinear([0, d3.max($data, d => Math.max(...([...$keys].map(k => d[k]))))!], [$height - padding.bottom - padding.top, 0]);
  });

  

  setContext<ChartContext>(key, {
    data,
    xScale,
    yScale,
    keys: _keys,

    width,
    height,
    padding
  });
</script>

<div
  class={_class}
  bind:clientWidth={$width}
  bind:clientHeight={$height}
>
  <slot>No Chart Specified</slot>
</div>