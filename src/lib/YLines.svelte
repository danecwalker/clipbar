<script lang="ts">
  import { getChartContext } from "./ChartContainer.svelte";

  let { width, padding, data, xScale, yScale } = getChartContext();

  export let withTicks = false;
  export let offset = 0;
  export let ticks = 5;
  export let step: number | ((d: any) => boolean) | undefined = undefined;
  export let formatter: undefined | ((label: any) => string) = undefined;
</script>

{#each $yScale.ticks(ticks, step) as tick}
  <line
    x1={0}
    x2={$width - padding.right - padding.left}
    y1={$yScale(tick)}
    y2={$yScale(tick)}
    stroke="hsl(0, 0%, 10%)"
  />

  {#if withTicks}
  <text
    x={-offset}
    y={$yScale(tick)}
    text-anchor="end"
    dominant-baseline="middle"
    font-size="0.6rem"
    fill="hsl(0, 0%, 50%)"
  >
    {#if formatter}{formatter(tick)}{:else}
    {tick}
    {/if}
  </text>
  {/if}
{/each}