<script lang="ts">
  import { getChartContext } from "./ChartContainer.svelte";

  let { width, padding, data, xScale, yScale } = getChartContext();

  let withTicks = false;
  let offset = 0;
</script>

{#each $yScale.ticks(5) as tick}
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
    class="text-xs"
    fill="hsl(0, 0%, 50%)"
  >
    {tick}
  </text>
  {/if}
{/each}