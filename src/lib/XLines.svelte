<script lang="ts">
  import { getChartContext } from "./ChartContainer.svelte";

  let { height, padding, data, xScale, yScale, chartType } = getChartContext();
  export let withLines = false;
  export let offset = 0;
  export let formatter: undefined | ((label: any) => string) = undefined;
</script>

{#each $xScale.ticks($data.length) as tick}
  {#if withLines}
    <line
      x1={$xScale(tick)}
      x2={$xScale(tick)}
      y1={0}
      y2={$height - padding.top - padding.bottom}
      stroke="hsl(0, 0%, 50%)"
    />
  {/if}
  <text
    x={$chartType !== "line" ? $xScale(tick) + $xScale.bandwidth() / 2 : $xScale(tick) + offset}
    y={$height - padding.top - padding.bottom + offset}
    text-anchor="middle"
    dominant-baseline="hanging"
    class="text-xs"
    fill="hsl(0, 0%, 50%)"
  >
    {#if formatter}{formatter(tick)}{:else}
    {tick}
    {/if}
  </text>
{/each}