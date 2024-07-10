<script lang="ts">
	import { spring } from "svelte/motion";
	import { getChartContext } from "./ChartContainer.svelte";
	import { onMount } from "svelte";

  let { height, padding, data, xScale, yScale, keys, labelKey } = getChartContext();

  export let dataKey: string;
  export let color: string = `hsl(var(--chart-${$keys.size%5+1}))`;

  keys.update(keys => {
    keys.add(dataKey);
    return keys;
  });

  let progress = spring(1);

  onMount(() => {
    progress.set(0);
  });
</script>

{#if dataKey}
  <path
    stroke={color}
    />
{/if}