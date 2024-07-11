<script lang="ts">
	import Bar from '$lib/Bar.svelte';
	import BarChart from '$lib/BarChart.svelte';
	import Candle from '$lib/Candle.svelte';
	import CandleStickChart from '$lib/CandleStickChart.svelte';
	import Card from '$lib/Card.svelte';
	import CardContent from '$lib/CardContent.svelte';
	import CardFooter from '$lib/CardFooter.svelte';
	import CardHeader from '$lib/CardHeader.svelte';
	import CardTool from '$lib/CardTool.svelte';
	import ChartContainer from '$lib/ChartContainer.svelte';
	import GroupBars from '$lib/GroupBars.svelte';
	import Line from '$lib/Line.svelte';
	import LineChart from '$lib/LineChart.svelte';
	import StackedBars from '$lib/StackedBars.svelte';
	import XLines from '$lib/XLines.svelte';
	import YLines from '$lib/YLines.svelte';
	import CursorLines from '$lib/CursorLines.svelte';
	import DetailPane from '$lib/DetailPane.svelte';

	const chartData = [
		{ month: 'January', desktop: 186, mobile: 80, other: 45 },
		{ month: 'February', desktop: 305, mobile: 200, other: 100 },
		{ month: 'March', desktop: 237, mobile: 120, other: 150 },
		{ month: 'April', desktop: 73, mobile: 190, other: 50 },
		{ month: 'May', desktop: 209, mobile: 130, other: 100 },
		{ month: 'June', desktop: 214, mobile: 140, other: 160 }
	];

	const marketData = [
		[1720618200000, 229.3, 230.59, 229.25, 230.39, 2795358],
		[1720618500000, 230.37, 230.88, 229.91, 230.24, 1667911],
		[1720618800000, 230.24, 231.06, 230.24, 230.86, 1376776],
		[1720619100000, 230.85, 231.09, 230.53, 230.95, 1091886],
		[1720619400000, 230.94, 231.38, 230.61, 231.32, 1051461],
		[1720619700000, 231.32, 231.37, 230.95, 231.3, 927613],
		[1720620000000, 231.31, 231.72, 231.1, 231.31, 1252647],
		[1720620300000, 231.3, 231.68, 231.06, 231.26, 980074],
		[1720620600000, 231.27, 231.63, 231.26, 231.51, 748317],
		[1720620900000, 231.51, 231.55, 231.09, 231.19, 773872],
		[1720621200000, 231.19, 231.31, 230.79, 231, 880697],
		[1720621500000, 231, 231.17, 230.91, 231.1, 560557],
		[1720621800000, 231.11, 231.16, 230.41, 230.58, 727523],
		[1720622100000, 230.59, 230.97, 230.55, 230.82, 525478],
		[1720622400000, 230.81, 230.94, 230.51, 230.7, 603857],
		[1720622700000, 230.7, 230.92, 230.48, 230.86, 697445],
		[1720623000000, 230.86, 230.86, 230.59, 230.65, 501817],
		[1720623300000, 230.65, 230.68, 230.17, 230.29, 693215],
		[1720623600000, 230.29, 230.65, 230.11, 230.61, 617048],
		[1720623900000, 230.6, 230.83, 230.57, 230.64, 496388],
		[1720624200000, 230.64, 231.01, 230.53, 230.66, 504547],
		[1720624500000, 230.66, 230.92, 230.59, 230.91, 337947],
		[1720624800000, 230.91, 231.01, 230.78, 230.87, 352522],
		[1720625100000, 230.87, 231.05, 230.84, 231, 302751],
		[1720625400000, 231, 231.26, 231, 231.04, 413164],
		[1720625700000, 231.04, 231.25, 231, 231.08, 400099],
		[1720626000000, 231.04, 231.1, 230.96, 231.09, 282325],
		[1720626300000, 231.06, 231.22, 231.01, 231.02, 312956],
		[1720626600000, 231.03, 231.38, 231.01, 231.29, 396560],
		[1720626900000, 231.3, 231.4, 231.16, 231.28, 386820],
		[1720627200000, 231.29, 231.38, 231.25, 231.34, 287212],
		[1720627500000, 231.34, 231.42, 231.26, 231.3, 335943],
		[1720627800000, 231.3, 231.3, 231.04, 231.22, 304491],
		[1720628100000, 231.21, 232.48, 231.21, 232.36, 3338161],
		[1720628400000, 232.35, 232.74, 231.51, 231.58, 1897629],
		[1720628700000, 231.56, 232.28, 231.46, 232.2, 1112166],
		[1720629000000, 232.2, 232.42, 231.97, 232.19, 674663],
		[1720629300000, 232.2, 232.2, 231.69, 231.94, 621446],
		[1720629600000, 231.94, 232.03, 231.76, 231.93, 502350],
		[1720629900000, 231.93, 231.93, 231.22, 231.28, 786525],
		[1720630200000, 231.28, 231.31, 230.93, 231.03, 772988],
		[1720630500000, 231.01, 231.4, 230.95, 231.32, 590227],
		[1720630800000, 231.32, 231.34, 230.99, 231.12, 475306],
		[1720631100000, 231.13, 231.17, 230.71, 230.84, 619074],
		[1720631400000, 230.84, 231.07, 230.81, 230.97, 673888],
		[1720631700000, 230.96, 231.09, 230.87, 231.06, 354731],
		[1720632000000, 231.07, 231.2, 230.88, 231.18, 474801],
		[1720632300000, 231.18, 231.69, 231.16, 231.56, 636821],
		[1720632600000, 231.57, 231.87, 231.52, 231.6, 582621],
		[1720632900000, 231.61, 231.92, 231.57, 231.79, 358443],
		[1720633200000, 231.8, 232.1, 231.78, 232.08, 583442],
		[1720633500000, 232.09, 232.15, 231.67, 231.9, 498474],
		[1720633800000, 231.91, 232.04, 231.7, 232.03, 292287],
		[1720634100000, 232.04, 232.06, 231.82, 231.96, 249096],
		[1720634400000, 231.97, 232.09, 231.92, 232.07, 239230],
		[1720634700000, 232.07, 232.13, 231.87, 231.88, 301991],
		[1720635000000, 231.87, 231.95, 231.61, 231.86, 385074],
		[1720635300000, 231.86, 231.94, 231.63, 231.72, 270832],
		[1720635600000, 231.73, 232, 231.67, 231.9, 261208],
		[1720635900000, 231.91, 232.11, 231.9, 232.1, 312331],
		[1720636200000, 232.1, 232.15, 231.97, 231.98, 318118],
		[1720636500000, 231.98, 232.07, 231.89, 232.02, 284581],
		[1720636800000, 232.03, 232.05, 231.88, 231.96, 235052],
		[1720637100000, 231.97, 232.14, 231.94, 232.03, 298113],
		[1720637400000, 232.03, 232.05, 231.96, 232.02, 308718],
		[1720637700000, 232.03, 232.19, 231.95, 232.16, 441092],
		[1720638000000, 232.15, 232.15, 231.73, 231.8, 524125],
		[1720638300000, 231.8, 231.93, 231.69, 231.84, 423461],
		[1720638600000, 231.84, 231.97, 231.73, 231.85, 343746],
		[1720638900000, 231.83, 231.9, 231.73, 231.88, 312927],
		[1720639200000, 231.88, 231.95, 231.63, 231.65, 418535],
		[1720639500000, 231.65, 231.91, 231.65, 231.76, 353423],
		[1720639800000, 231.76, 232.01, 231.71, 232.01, 535780],
		[1720640100000, 232, 232.24, 231.99, 232.16, 525627],
		[1720640400000, 232.16, 232.42, 232.16, 232.4, 846784],
		[1720640700000, 232.41, 232.7, 232.39, 232.66, 953130],
		[1720641000000, 232.65, 232.93, 232.57, 232.67, 1699119],
		[1720641300000, 232.66, 233.08, 232.66, 232.91, 2555366]
	];

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
					<ChartContainer
						data={chartData}
						labelKey="month"
						class="min-h-[200px] w-full"
						padding={{
							top: 10,
							right: 0,
							bottom: 32,
							left: 0
						}}
					>
						<BarChart>
							<YLines />
							<XLines offset={12} formatter={(l) => l.slice(0, 3)} />
							<Bar dataKey={'desktop'} />
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
					<ChartContainer
						data={chartData}
						labelKey="month"
						class="min-h-[200px] w-full"
						padding={{
							top: 10,
							right: 0,
							bottom: 32,
							left: 0
						}}
					>
						<BarChart>
							<YLines />
							<XLines offset={12} formatter={(l) => l.slice(0, 3)} />
							<GroupBars dataKeys={['desktop', 'mobile']} gap={0.1} />
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
					<ChartContainer
						data={chartData}
						labelKey="month"
						class="min-h-[200px] w-full"
						padding={{
							top: 10,
							right: 0,
							bottom: 32,
							left: 0
						}}
					>
						<BarChart>
							<YLines />
							<XLines offset={12} formatter={(l) => l.slice(0, 3)} />
							<StackedBars dataKeys={['desktop', 'mobile', 'other']} />
							<!-- <Bar dataKey="desktop" color={"hsl(220 70% 50%)"} /> -->
						</BarChart>
					</ChartContainer>
				</CardContent>
				<CardFooter slot="footer" />
			</Card>

			<Card class="col-span-3">
				<CardTool slot="tool" chartType="Candlestick" />
				<CardHeader slot="header" title="Candlestick Chart" />
				<CardContent slot="content">
					<ChartContainer
						data={marketData}
						labelKey={0}
						class="min-h-[400px] w-full"
						padding={{
							top: 10,
							right: 20,
							bottom: 32,
							left: 50
						}}
					>
						<CandleStickChart let:in_chart let:current>
							<XLines
								offset={12}
								formatter={(l) => {
									let date = new Date(l);
									let formattedTime = date.toLocaleTimeString('en-AU', { hour: 'numeric', hour12: true, timeZone: 'America/New_York' });
									return formattedTime;
								}}
								step={(a) => {
									return a % 3600000 === 0;
								}}
							/>

							<YLines withTicks={true} offset={10} ticks={10} formatter={(l) => l.toFixed(2)} />

							<Candle
								dataKeys={{
									open: 1,
									high: 2,
									low: 3,
									close: 4
								}}
								pcolor="hsl(var(--chart-4))"
								ncolor="hsl(var(--chart-2))"
							/>
							<CursorLines opacity={in_chart ? 1 : 0} />
							<DetailPane opacity={in_chart ? 1 : 0} currentData={current} textPadding={2}/>
						</CandleStickChart>
					</ChartContainer>
				</CardContent>
				<CardFooter slot="footer" />
			</Card>
		</div>
	</div>
</div>
