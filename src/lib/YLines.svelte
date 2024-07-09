<script lang="ts">
  import { getChartContext } from "./ChartContainer.svelte";

  let { width, padding, data, xScale, yScale } = getChartContext();


</script>

{#each $yScale.ticks(5) as tick}
  {console.log("t", tick)}
  {console.log("yt", $yScale(tick))}
  <line
    x1={0}
    x2={$width - padding.right - padding.left}
    y1={$yScale(tick)}
    y2={$yScale(tick)}
    stroke="hsl(0, 0%, 50%)"
  />

  <text
    x={-10}
    y={$yScale(tick)}
    text-anchor="end"
    dominant-baseline="middle"
    class="text-xs"
    fill="hsl(0, 0%, 50%)"
  >
    {tick}
  </text>
{/each}