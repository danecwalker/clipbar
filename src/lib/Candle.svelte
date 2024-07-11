<script lang="ts">
	import { spring } from "svelte/motion";
	import { getChartContext } from "./ChartContainer.svelte";
	import { onMount } from "svelte";

  let { height, padding, data, xScale, yScale, keys, labelKey } = getChartContext();

  export let dataKeys: {
    high: string | number;
    low: string | number;
    open: string | number;
    close: string | number;
  };

  keys.update(keys => {
    keys.add(dataKeys.low);
    keys.add(dataKeys.high);
    return keys;
  });
  export let pcolor: string = `hsl(var(--chart-${$keys.size%5+1}))`;
  export let ncolor: string = `hsl(var(--chart-${$keys.size%5+1}))`;

  let progress = spring(1);

  onMount(() => {
    progress.set(0);
  });
</script>

{#each $data as d, i}
  <g>
    <line
      x1={$xScale(d[labelKey]) + $xScale.bandwidth()/2}
      x2={$xScale(d[labelKey]) + $xScale.bandwidth()/2}
      y1={$yScale(d[dataKeys.low])}
      y2={$yScale(d[dataKeys.high])}
      stroke={d[dataKeys.open] < d[dataKeys.close] ? pcolor : ncolor}
    />
    <rect
      x={$xScale(d[labelKey])}
      y={$yScale(d[dataKeys.open] < d[dataKeys.close] ? d[dataKeys.close] : d[dataKeys.open])}
      width={$xScale.bandwidth()}
      height={Math.abs($yScale(d[dataKeys.open]) - $yScale(d[dataKeys.close]))}
      fill={d[dataKeys.open] < d[dataKeys.close] ? pcolor : ncolor}
    />
  </g>
{/each}