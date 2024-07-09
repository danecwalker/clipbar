<script lang="ts">
	import { getChartContext } from "./ChartContainer.svelte";

  let { width, height, padding } = getChartContext();
</script>

<svg
  viewBox="0 0 {$width} {$height}"
  width={$width}
  height={$height}
>
  <g transform="translate({padding.left}, {padding.top})">
    <slot><!-- optional fallback --></slot>
  </g>
</svg>