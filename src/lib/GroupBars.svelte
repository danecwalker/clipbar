<script lang="ts">
	import { getChartContext } from "./ChartContainer.svelte";

  let { height, padding, data, xScale, yScale, keys } = getChartContext();

  export let dataKeys: string[];
  export let colors: { [key: string]: string } = {};
  export let gap = 0;
  $: gapWidth = $xScale.bandwidth() * gap;

  keys.update(keys => {
    dataKeys.forEach(key => keys.add(key));
    return keys;
  });
</script>

{#if dataKeys.length > 0}
  {#each $data as d}
    {#each dataKeys as dataKey, i}
      <rect
      x={$xScale(d.label) + i * (($xScale.bandwidth() - (gapWidth * (dataKeys.length - 1))) / dataKeys.length + gapWidth)}
      y={$yScale(d[dataKey])}
      width={($xScale.bandwidth() - (gapWidth * (dataKeys.length - 1))) / dataKeys.length}
      height={Math.max(0, $height - padding.bottom - padding.top - $yScale(d[dataKey]))}
      fill={colors[dataKey] || "steelblue"}
      rx={4}
      ry={4}
    />
    {/each}
  {/each}
{/if}