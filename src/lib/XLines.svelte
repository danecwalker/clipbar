<script lang="ts">
  import { getChartContext } from "./ChartContainer.svelte";

  let { height, padding, data, xScale, yScale } = getChartContext();
  export let withLines = false;

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
    x={$xScale(tick) + $xScale.bandwidth() / 2}
    y={$height - padding.bottom}
    text-anchor="middle"
    dominant-baseline="middle"
    class="text-xs"
    fill="hsl(0, 0%, 50%)"
  >
    {tick}
  </text>
{/each}