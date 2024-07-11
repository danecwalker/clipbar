<script lang="ts">
  import { getChartContext } from "./ChartContainer.svelte";

  let { width, height, padding, chartType } = getChartContext();

  export let dashed = false;
  export let color = "hsl(0, 0%, 80%)";
  export let lineWidth = 1;
  export let opacity = 1;
</script>

<g id="lines">
  <line
    id="hline"
    x1={0}
    x2={$width - padding.right - padding.left}
    y1={0}
    y2={0}
    width={100}
    height={100}
    stroke="{color}"
    stroke-width={lineWidth}
    stroke-dasharray={dashed ? "5,5" : "0"}
    opacity={opacity}
    class="transition-opacity duration-100 ease-in-out"
  />

  <line
    id = "vline"
    x1={0}
    x2={0}
    y1={0}
    y2={$height - padding.bottom - padding.top}
    width={100}
    height={100}
    stroke="{color}"
    stroke-dasharray={dashed ? "5,5" : "0"}
    stroke-width={lineWidth}
    opacity={opacity}
    class="transition-opacity duration-100 ease-in-out"
  />
</g>