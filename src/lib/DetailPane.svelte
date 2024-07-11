<script lang="ts">
	import { onMount } from "svelte";
  import { getChartContext } from "./ChartContainer.svelte";

  let { width, height, padding, chartType, data } = getChartContext();

  export let currentData = {
    open: 0,
    high: 0,
    low: 0,
    close: 0,
  }; 
  export let opacity = 1;
  export let textPadding = 0;

  onMount(() => {
    const texts = document.getElementById("detailPane")?.getElementsByTagName('text');
    let yPosition = 0;

    if (texts) {
      for (let i = 0; i < texts.length; i++) {
        let text = texts[i];
        text.setAttribute("y", (yPosition + textPadding).toString());
        yPosition += text.getBBox().height + textPadding;
      }
    }
  });
</script>

<g id="detailPane">
  <text
    fill="hsl(0, 0%, 100%)"
    font-size="10"
    font-family="sans-serif"
    y="0"
    opacity={opacity}
    class="transition-opacity duration-100 ease-in-out"
  >
    O: {currentData.open}
  </text>
  <text
    fill="hsl(0, 0%, 100%)"
    font-size="10"
    font-family="sans-serif"
    y="10"
    opacity={opacity}
    class="transition-opacity duration-100 ease-in-out"
  >
    H: {currentData.high}
  </text>
  <text
    fill="hsl(0, 0%, 100%)"
    font-size="10"
    font-family="sans-serif"
    y="20"
    opacity={opacity}
    class="transition-opacity duration-100 ease-in-out"
  >
    L: {currentData.low}
  </text>
  <text
    fill="hsl(0, 0%, 100%)"
    font-size="10"
    font-family="sans-serif"
    y="30"
    opacity={opacity}
    class="transition-opacity duration-100 ease-in-out"
  >
    C: {currentData.close}
  </text>
</g>