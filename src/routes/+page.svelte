<script lang="ts">
	import Bar from "$lib/Bar.svelte";
import BarChart from "$lib/BarChart.svelte";
import ChartContainer from "$lib/ChartContainer.svelte";
	import GroupBars from "$lib/GroupBars.svelte";
	import XLines from "$lib/XLines.svelte";


	const chartData = [
		{ month: "January", desktop: 186, mobile: 80 },
		{ month: "February", desktop: 305, mobile: 200 },
		{ month: "March", desktop: 237, mobile: 120 },
		{ month: "April", desktop: 73, mobile: 190 },
		{ month: "May", desktop: 209, mobile: 130 },
		{ month: "June", desktop: 214, mobile: 140 },
	]

  let range = (i: number = 20) => Array.from({ length: i }, (_, i) => i);
</script>

<div class="w-full min-h-screen dark:bg-zinc-950 dark:text-white">
	<div class="w-full max-w-screen-lg mx-auto">
		<div class="flex justify-center items-center h-80 flex-col">
			<h1 class="text-4xl font-bold">Svcharts</h1>
			<p class="mt-4">A simple charting library for Svelte and SvelteKit powered by D3.js</p>
			<div class="mt-8 flex gap-2 justify-center items-center">
				<a
					href="#charts"
					class="dark:bg-white dark:hover:bg-zinc-200 text-white font-medium bg-zinc-950 dark:text-zinc-950 text-xs px-4 py-2 rounded-md"
					>Browse Charts</a
				>
				<a
					href="/docs"
					class="dark:text-white font-medium text-zinc-950 text-xs px-4 py-2 rounded-md dark:hover:bg-zinc-800 hover:bg-zinc-100"
					>Get Started</a
				>
			</div>
		</div>
	</div>

	<div class="w-full max-w-screen-xl mx-auto">
		<div class="w-full grid grid-cols-3 gap-4 p-4" id="charts">
			{#each range(1) as i}
			<div class="border border-zinc-800 rounded-xl overflow-hidden p-6">
				<ChartContainer data={chartData} labelKey="month" class="min-h-[200px] w-full" padding={{
					top: 10,
					right: 0,
					bottom: 20,
					left: 0,
				}}>
					<BarChart>
						<!-- <XLines /> -->
						<!-- <GroupBars dataKeys={["desktop", "mobile"]} colors={{
							desktop: "hsl(340 75% 55%)",
							mobile: "hsl(220 50% 50%)",
						}} gap={0.1} /> -->
						<Bar dataKey="desktop" color={"hsl(220 70% 50%)"} />
					</BarChart>
				</ChartContainer>
			</div>
			{/each}
			
		</div>
	</div>
</div>
