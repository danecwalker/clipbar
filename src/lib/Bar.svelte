<script lang="ts">
	import { getChartContext } from "./ChartContainer.svelte";

  let { height, padding, data, xScale, yScale, keys } = getChartContext();

  export let dataKey: string;
  export let color: string = "steelblue";

  keys.update(keys => {
    keys.add(dataKey);
    return keys;
  });
</script>

{#if dataKey}
  {#each $data as d, i}
    <rect
      x={$xScale(d.label)}
      y={$yScale(d[dataKey])}
      width={Math.max(0, $xScale.bandwidth())}
      height={Math.max(0, $height - padding.bottom - padding.top - $yScale(d[dataKey]))}
      fill={color}
      rx={4}
      ry={4}
    />
  {/each}
{/if}