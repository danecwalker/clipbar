<script lang="ts">
	import Bar from "$lib/Bar.svelte";
	import BarChart from "$lib/BarChart.svelte";
	import Card from "$lib/Card.svelte";
	import CardContent from "$lib/CardContent.svelte";
	import CardFooter from "$lib/CardFooter.svelte";
	import CardHeader from "$lib/CardHeader.svelte";
	import CardTool from "$lib/CardTool.svelte";
	import ChartContainer from "$lib/ChartContainer.svelte";
	import GroupBars from "$lib/GroupBars.svelte";
	import Line from "$lib/Line.svelte";
	import LineChart from "$lib/LineChart.svelte";
	import StackedBars from "$lib/StackedBars.svelte";
	import XLines from "$lib/XLines.svelte";
	import YLines from "$lib/YLines.svelte";


	const chartData = [
		{ month: "January", desktop: 186, mobile: 80, other: 45 },
		{ month: "February", desktop: 305, mobile: 200, other: 100 },
		{ month: "March", desktop: 237, mobile: 120, other: 150 },
		{ month: "April", desktop: 73, mobile: 190, other: 50 },
		{ month: "May", desktop: 209, mobile: 130, other: 100 },
		{ month: "June", desktop: 214, mobile: 140, other: 160 },
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
			<Card>
				<CardTool slot="tool" />
				<CardHeader slot="header" title="Bar Chart" />
				<CardContent slot="content">
					<ChartContainer data={chartData} labelKey="month" class="min-h-[200px] w-full" padding={{
						top: 10,
						right: 0,
						bottom: 32,
						left: 0,
					}}>
						<BarChart>
							<YLines />
							<XLines offset={12} formatter={(l) => l.slice(0,3)} />
							<Bar dataKey={"desktop"} />
							<!-- <Bar dataKey="desktop" color={"hsl(220 70% 50%)"} /> -->
						</BarChart>
					</ChartContainer>
				</CardContent>
				<CardFooter slot="footer" />
			</Card>

			<Card>
				<CardTool slot="tool" />
				<CardHeader slot="header" />
				<CardContent slot="content">
					<ChartContainer data={chartData} labelKey="month" class="min-h-[200px] w-full" padding={{
						top: 10,
						right: 0,
						bottom: 32,
						left: 0,
					}}>
						<BarChart>
							<YLines />
							<XLines offset={12} formatter={(l) => l.slice(0,3)} />
							<GroupBars dataKeys={["desktop", "mobile"]} gap={0.1} />
							<!-- <Bar dataKey="desktop" color={"hsl(220 70% 50%)"} /> -->
						</BarChart>
					</ChartContainer>
				</CardContent>
				<CardFooter slot="footer" />
			</Card>
			
			<Card>
				<CardTool slot="tool" />
				<CardHeader slot="header" title="Bar Chart - Stacked" />
				<CardContent slot="content">
					<ChartContainer data={chartData} labelKey="month" class="min-h-[200px] w-full" padding={{
						top: 10,
						right: 0,
						bottom: 32,
						left: 0,
					}}>
						<BarChart>
							<YLines />
							<XLines offset={12} formatter={(l) => l.slice(0,3)} />
							<StackedBars dataKeys={["desktop", "mobile", "other"]} />
							<!-- <Bar dataKey="desktop" color={"hsl(220 70% 50%)"} /> -->
						</BarChart>
					</ChartContainer>
				</CardContent>
				<CardFooter slot="footer" />
			</Card>

			<Card>
				<CardTool slot="tool" chartType="Line" />
				<CardHeader slot="header" title="Bar Chart - Stacked" />
				<CardContent slot="content">
					<ChartContainer data={chartData} labelKey="month" class="min-h-[200px] w-full" padding={{
						top: 10,
						right: 0,
						bottom: 32,
						left: 0,
					}}>
						<LineChart>
							<YLines />
							<!-- <Bar dataKey="desktop" color={"hsl(220 70% 50%)"} /> -->
							 <Line dataKey="desktop" color={"hsl(220 70% 50%)"} />
						</LineChart>
					</ChartContainer>
				</CardContent>
				<CardFooter slot="footer" />
			</Card>
		</div>
	</div>
</div>
