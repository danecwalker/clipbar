<script lang="ts">
	import { spring } from "svelte/motion";
	import { getChartContext } from "./ChartContainer.svelte";
	import { onMount } from "svelte";
	import type { Readable } from "svelte/store";

  let { height, padding, data, xScale, yScale, keys, labelKey, chartType } = getChartContext();
  chartType.set("stacked");
  
  export let dataKeys: string[];
  export let colors: { [key: string]: string } = {};

  keys.update(keys => {
    dataKeys.forEach(key => keys.add(key));
    return keys;
  });

  let progress = spring(1)

  onMount(() => {
    progress.set(0);
  });

  const sum = (data: number[]): number => data.reduce((acc, d) => acc + d, 0);
  
</script>

{#if dataKeys.length > 0}
  {#each $data as d,j}
    {#each dataKeys.reverse() as dataKey, i}
      {#if i === dataKeys.length - 1}
        <rect
          x={$xScale(d[labelKey])}
          y={($yScale(d[dataKey])) + ($height - padding.bottom - padding.top - $yScale(d[dataKey])) * $progress}
          width={$xScale.bandwidth()}
          height={Math.max(0, ($height - padding.bottom - padding.top - $yScale(d[dataKey])) - (($height - padding.bottom - padding.top - $yScale(d[dataKey])) * $progress))}
          fill={colors[dataKey] || `hsl(var(--chart-${((dataKeys.length - 1)-i)%5+1}))`}
        />
      {:else}
        <rect
          x={$xScale(d[labelKey])}
          y={($yScale(d[dataKey]) - ($height - padding.bottom - padding.top - $yScale(sum(dataKeys.slice(i+1).map(k => d[k]))))) + ($height - padding.bottom - padding.top - $yScale(sum(dataKeys.slice(i).map(k => d[k])))) * $progress}
          width={$xScale.bandwidth()}
          height={Math.max(0, ($height - padding.bottom - padding.top - $yScale(sum(dataKeys.slice(i).map(k => d[k]))))) - ($height - padding.bottom - padding.top - $yScale(sum(dataKeys.slice(i).map(k => d[k])))) * $progress}
          fill={colors[dataKey] || `hsl(var(--chart-${((dataKeys.length - 1)-i)%5+1}))`}
          rx={i === 0 ? 4 : 0}
          ry={i === 0 ? 4 : 0}
        />
      {/if}
    {/each}
  {/each}
{/if}