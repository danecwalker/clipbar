<script lang="ts">
	import { getChartContext } from "./ChartContainer.svelte";

  let { width, height, padding, chartType, xScale, yScale, data, labelKey } = getChartContext();
  chartType.set("candle");
  let svg: SVGSVGElement;

  let in_chart = false;
  let current = {
    open: 0,
    close: 0,
    high: 0,
    low: 0,
  }

  const mouseEnter = () => {
    in_chart = true;
  }

  const mouseLeave = () => {
    in_chart = false;
  }

  let prev_x: number, prev_y: number = 0;

  const mouseMove = (ev: MouseEvent) => {
    if (!svg) return;
    let clientX = ev.clientX;
    let clientY = ev.clientY;
    if (in_chart) {
      let pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      let hline = document.getElementById("hline");
      let vline = document.getElementById("vline");
      let t = pt.matrixTransform(svg.getScreenCTM()?.inverse())
      let x = $xScale.invert(t.x - padding.left);
      let y = Math.min($yScale.domain()[1], Math.max($yScale.domain()[0], $yScale.invert(t.y - padding.top)));
      hline?.setAttribute("transform", `translate(0, ${$yScale(y)})`);
      if (x !== undefined) vline?.setAttribute("transform", `translate(${$xScale(x) + $xScale.bandwidth()/2}, 0)`);
      
      if (prev_x !== x && x !== undefined) {
        prev_x = x;
        prev_y = y;

        let cdata = $data.find(d => d[labelKey] === x);
        current = {
          open: cdata[1],
          high: cdata[2],
          low: cdata[3],
          close: cdata[4],
        }
      }
    }
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg
  bind:this={svg}
  viewBox="0 0 {$width} {$height}"
  width={$width}
  height={$height}
  on:mouseenter={mouseEnter}
  on:mouseleave={mouseLeave}
  on:mousemove={mouseMove}
>
  <g transform="translate({padding.left}, {padding.top})">
    <slot {in_chart} {current} ><!-- optional fallback --></slot>
    <use href="#lines" />
  </g>
</svg>