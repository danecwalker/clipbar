<script lang="ts">
	import { spring } from "svelte/motion";
	import { getChartContext } from "./ChartContainer.svelte";
	import { onMount } from "svelte";

  let { height, padding, data, xScale, yScale, keys, labelKey } = getChartContext();

  export let dataKeys: string[];
  export let colors: { [key: string]: string } = {};
  export let gap = 0;
  $: gapWidth = $xScale.bandwidth() * gap;

  keys.update(keys => {
    dataKeys.forEach(key => keys.add(key));
    return keys;
  });

  let progress = spring(1)

  onMount(() => {
    progress.set(0);
  });
  
</script>

{#if dataKeys.length > 0}
  {#each $data as d,j}
    {#each dataKeys as dataKey, i}
      <rect
      x={$xScale(d[labelKey]) + i * (($xScale.bandwidth() - (gapWidth * (dataKeys.length - 1))) / dataKeys.length + gapWidth)}
      y={$yScale(d[dataKey]) + ($height - padding.bottom - padding.top - $yScale(d[dataKey])) * $progress}
      width={($xScale.bandwidth() - (gapWidth * (dataKeys.length - 1))) / dataKeys.length}
      height={Math.max(0, ($height - padding.bottom - padding.top - $yScale(d[dataKey])) - (($height - padding.bottom - padding.top - $yScale(d[dataKey])) * $progress))}
      fill={colors[dataKey] || `hsl(var(--chart-${i%5+1}))`}
      rx={4}
      ry={4}
    />
    {/each}
  {/each}
{/if}