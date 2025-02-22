'use client';

import * as React from 'react';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { CustomTooltip } from '@/components/ui/custom-tooltip';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface CalculationResult {
	year: number;
	totalPrincipal: number;
	totalInterest: number;
	balance: number;
}

export default function CompoundCalculator() {
	const [initialDeposit, setInitialDeposit] = React.useState(5000);
	const [years, setYears] = React.useState(5);
	const [rate, setRate] = React.useState(7);
	const [compoundFrequency, setCompoundFrequency] = React.useState('12');
	const [contributionAmount, setContributionAmount] = React.useState(100);
	const [contributionFrequency, setContributionFrequency] =
		React.useState('monthly');
	const [results, setResults] = React.useState<CalculationResult[]>([]);

	// Updated chart configuration with new colors and gradients
	const chartConfig = {
		totalPrincipal: {
			label: 'Total Principal',
			lineColor: '#FF8B7B', // Brighter coral color for the line
			gradientId: 'principalGradient',
			gradientColors: {
				start: '#FFD4CC',
				end: '#FFF5F3',
			},
		},
		totalInterest: {
			label: 'Total Interest',
			lineColor: '#2DD4BF', // Brighter teal color for the line
			gradientId: 'interestGradient',
			gradientColors: {
				start: '#CCFBF1',
				end: '#F0FDFA',
			},
		},
	};

	const calculateCompoundInterest = React.useCallback(() => {
		const n = Number(compoundFrequency); // compounds per year
		const r = rate / 100; // convert percentage to decimal
		const t = years;
		const p = initialDeposit;
		const pmt =
			contributionAmount * (contributionFrequency === 'monthly' ? 12 : 1);

		const data: CalculationResult[] = [];
		let totalPrincipal = p;

		for (let year = 0; year <= t; year++) {
			const compoundFactor = Math.pow(1 + r / n, n * year);
			const contributionFactor = (compoundFactor - 1) / (r / n);

			const futureValue =
				p * compoundFactor + (pmt / n) * contributionFactor;
			totalPrincipal += year > 0 ? pmt : 0;

			data.push({
				year: new Date().getFullYear() + year,
				totalPrincipal,
				balance: futureValue,
				totalInterest: futureValue - totalPrincipal,
			});
		}

		setResults(data);
	}, [
		initialDeposit,
		years,
		rate,
		compoundFrequency,
		contributionAmount,
		contributionFrequency,
	]);

	// Calculate initial results
	React.useEffect(() => {
		calculateCompoundInterest();
	}, [calculateCompoundInterest]);

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const preciseFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	// Get final balance safely
	const finalBalance =
		results.length > 0 ? results[results.length - 1].balance : 0;

	return (
		<div className='container mx-auto px-3 py-3 sm:p-6 max-w-6xl flex min-h-[calc(100vh-65px)] items-center'>
			<div className='grid gap-3 sm:gap-6 lg:gap-8 lg:grid-cols-[minmax(320px,400px)_1fr] w-full'>
				<Card className='order-1 lg:order-1 border-0 shadow-lg'>
					<CardHeader className='pb-3 sm:pb-4'>
						<CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
							<Calculator className='h-4 w-4 sm:h-5 sm:w-5' />
							Investment Details
						</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-3 sm:gap-4'>
						<div className='grid grid-cols-2 gap-3 sm:grid-cols-1'>
							<div className='grid gap-2'>
								<Label htmlFor='initial'>Initial deposit</Label>
								<div className='relative'>
									<span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
										$
									</span>
									<Input
										id='initial'
										type='number'
										value={initialDeposit}
										className='pl-7'
										onChange={(e) =>
											setInitialDeposit(
												Number(e.target.value)
											)
										}
									/>
								</div>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='years'>Years of growth</Label>
								<Input
									id='years'
									type='number'
									value={years}
									onChange={(e) =>
										setYears(Number(e.target.value))
									}
								/>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-3 sm:grid-cols-1'>
							<div className='grid gap-2'>
								<Label htmlFor='rate'>Rate of return (%)</Label>
								<Input
									id='rate'
									type='number'
									value={rate}
									onChange={(e) =>
										setRate(Number(e.target.value))
									}
								/>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='compound'>
									Compound frequency
								</Label>
								<Select
									value={compoundFrequency}
									onValueChange={setCompoundFrequency}>
									<SelectTrigger id='compound'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='1'>
											Annually
										</SelectItem>
										<SelectItem value='4'>
											Quarterly
										</SelectItem>
										<SelectItem value='12'>
											Monthly
										</SelectItem>
										<SelectItem value='365'>
											Daily
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className='grid grid-cols-2 gap-3 sm:grid-cols-1'>
							<div className='grid gap-2'>
								<Label htmlFor='contribution'>
									Contribution
								</Label>
								<div className='relative'>
									<span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
										$
									</span>
									<Input
										id='contribution'
										type='number'
										value={contributionAmount}
										className='pl-7'
										onChange={(e) =>
											setContributionAmount(
												Number(e.target.value)
											)
										}
									/>
								</div>
							</div>

							<div className='grid gap-2'>
								<Label>Frequency</Label>
								<ToggleGroup
									type='single'
									value={contributionFrequency}
									onValueChange={(value) => {
										if (value)
											setContributionFrequency(value);
									}}>
									<ToggleGroupItem
										value='monthly'
										className='flex-1'>
										Monthly
									</ToggleGroupItem>
									<ToggleGroupItem
										value='annually'
										className='flex-1'>
										Annually
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='order-2 lg:order-2 border-0 shadow-lg'>
					<CardHeader className='pb-2 sm:pb-4'>
						<CardTitle className='text-center space-y-1'>
							<div className='text-sm text-muted-foreground font-normal'>
								Total Balance
							</div>
							<div
								className='text-xl sm:text-3xl lg:text-4xl font-bold'
								style={{
									color: chartConfig.totalInterest.lineColor,
								}}>
								{preciseFormatter.format(finalBalance)}
							</div>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={chartConfig}
							className='h-[200px] sm:h-[300px] lg:h-[400px] w-full'>
							<AreaChart
								data={results}
								margin={{
									top: 5,
									right: 10,
									left: 10,
									bottom: 0,
								}}>
								<defs>
									<linearGradient
										id='principalGradient'
										x1='0'
										y1='0'
										x2='0'
										y2='1'>
										<stop
											offset='0%'
											stopColor={
												chartConfig.totalPrincipal
													.gradientColors.start
											}
											stopOpacity={0.6}
										/>
										<stop
											offset='100%'
											stopColor={
												chartConfig.totalPrincipal
													.gradientColors.end
											}
											stopOpacity={0.1}
										/>
									</linearGradient>
									<linearGradient
										id='interestGradient'
										x1='0'
										y1='0'
										x2='0'
										y2='1'>
										<stop
											offset='0%'
											stopColor={
												chartConfig.totalInterest
													.gradientColors.start
											}
											stopOpacity={0.6}
										/>
										<stop
											offset='100%'
											stopColor={
												chartConfig.totalInterest
													.gradientColors.end
											}
											stopOpacity={0.1}
										/>
									</linearGradient>
								</defs>
								<XAxis
									dataKey='year'
									tickLine={false}
									axisLine={false}
									tickMargin={10}
									stroke='#94a3b8'
									fontSize={12}
								/>
								<YAxis
									tickFormatter={(value) =>
										formatter.format(value)
									}
									tickLine={false}
									axisLine={false}
									tickMargin={10}
									stroke='#94a3b8'
									fontSize={12}
								/>
								<Area
									type='monotone'
									dataKey='totalPrincipal'
									stackId='1'
									stroke={
										chartConfig.totalPrincipal.lineColor
									}
									strokeWidth={2}
									fill={`url(#${chartConfig.totalPrincipal.gradientId})`}
									fillOpacity={1}
								/>
								<Area
									type='monotone'
									dataKey='totalInterest'
									stackId='1'
									stroke={chartConfig.totalInterest.lineColor}
									strokeWidth={2}
									fill={`url(#${chartConfig.totalInterest.gradientId})`}
									fillOpacity={1}
								/>
								<ChartTooltip content={<CustomTooltip />} />
							</AreaChart>
						</ChartContainer>
						<div className='mt-2 sm:mt-4 flex flex-row justify-center items-center gap-8 text-xs sm:text-sm'>
							{Object.entries(chartConfig).map(
								([key, config]) => (
									<div
										key={key}
										className='flex items-center gap-2'>
										<div
											className='h-3 w-3 rounded-full'
											style={{
												backgroundColor:
													config.lineColor,
											}}
										/>
										<span className='text-muted-foreground'>
											{config.label}
										</span>
									</div>
								)
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
