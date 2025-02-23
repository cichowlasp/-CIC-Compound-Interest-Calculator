'use client';

import * as React from 'react';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';
import { Calculator } from 'lucide-react';
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
import { translations } from '@/lib/translations';
import { MobileSettings } from './mobile-settings';

interface CalculationResult {
	year: number;
	totalPrincipal: number;
	totalInterest: number;
	balance: number;
}

// Add these interfaces and constants at the top after other imports
interface CalculatorState {
	initialDeposit: number;
	years: number;
	rate: number;
	compoundFrequency: string;
	contributionAmount: number;
	contributionFrequency: string;
	currency: string;
	language: string;
	theme: string;
}

const STORAGE_KEY = 'calculator-state';

// Add this function after interfaces
const getStoredState = (): CalculatorState | null => {
	if (typeof window === 'undefined') return null;
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored ? JSON.parse(stored) : null;
};

// Update the component's initial state

export default function CompoundCalculator() {
	const [initialDeposit, setInitialDeposit] = React.useState(
		() => getStoredState()?.initialDeposit ?? 5000
	);
	const [years, setYears] = React.useState(
		() => getStoredState()?.years ?? 5
	);
	const [rate, setRate] = React.useState(() => getStoredState()?.rate ?? 7);
	const [compoundFrequency, setCompoundFrequency] = React.useState(
		() => getStoredState()?.compoundFrequency ?? '12'
	);
	const [contributionAmount, setContributionAmount] = React.useState(
		() => getStoredState()?.contributionAmount ?? 100
	);
	const [contributionFrequency, setContributionFrequency] = React.useState(
		() => getStoredState()?.contributionFrequency ?? 'monthly'
	);
	const [currency, setCurrency] = React.useState(
		() => getStoredState()?.currency ?? 'USD'
	);
	const [language, setLanguage] = React.useState(
		() => getStoredState()?.language ?? 'en'
	);
	const [theme, setTheme] = React.useState(
		() => getStoredState()?.theme ?? 'light'
	);
	const [isLoading, setIsLoading] = React.useState(true);

	// Add this effect to save state changes
	React.useEffect(() => {
		const state: CalculatorState = {
			initialDeposit,
			years,
			rate,
			compoundFrequency,
			contributionAmount,
			contributionFrequency,
			currency,
			language,
			theme,
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		setIsLoading(false);
	}, [
		initialDeposit,
		years,
		rate,
		compoundFrequency,
		contributionAmount,
		contributionFrequency,
		currency,
		language,
		theme,
	]);

	React.useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark');
	}, [theme]);

	const [results, setResults] = React.useState<CalculationResult[]>([]);
	const t = translations[language as keyof typeof translations];

	// Updated chart configuration with new colors and gradients
	const chartConfig = {
		totalPrincipal: {
			label: t.totalPrincipal,
			lineColor: '#FF8B7B', // Brighter coral color for the line
			gradientId: 'principalGradient',
			gradientColors: {
				start: '#FFD4CC',
				end: '#FFF5F3',
			},
		},
		totalInterest: {
			label: t.totalInterest,
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

	const preciseFormatter = new Intl.NumberFormat(
		language === 'en' ? 'en-US' : 'pl-PL',
		{
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}
	);

	const formatAxisValue = (value: number) => {
		const compactFormatter = new Intl.NumberFormat(
			language === 'en' ? 'en-US' : 'pl-PL',
			{
				style: 'currency',
				currency: currency,
				notation: 'compact',
				maximumFractionDigits: 1,
			}
		);
		return compactFormatter.format(value);
	};
	const getCurrencySymbol = (value: number) => {
		const compactFormatter = new Intl.NumberFormat(
			language === 'en' ? 'en-US' : 'pl-PL',
			{
				style: 'currency',
				currency: currency,
				notation: 'standard',
			}
		);
		return compactFormatter.format(value);
	};

	// Get final balance safely
	const finalBalance =
		results.length > 0 ? results[results.length - 1].balance : 0;

	if (isLoading) {
		return (
			<div className='w-screen h-dvh flex items-center justify-center bg-gradient-to-br from-background via-muted/5 to-background'>
				<div className='animate-pulse'>
					<Calculator className='h-8 w-8 text-muted-foreground' />
				</div>
			</div>
		);
	}

	return (
		<>
			<div className='fixed bottom-4 right-4 z-50'>
				<MobileSettings
					currency={currency}
					setCurrency={setCurrency}
					language={language}
					setLanguage={setLanguage}
					theme={theme}
					setTheme={setTheme}
				/>
			</div>
			<div className='container px-3 py-3 sm:p-6 w-screen h-dvh flex bg-gradient-to-br from-background via-muted/5 to-background'>
				<div className='w-screen h-full flex flex-col gap-4 lg:flex-row md:flex'>
					{/* First container */}
					<div className='basis-1/2 sm:basis-2/5 lg:basis-1/3 w-full backdrop-blur-xl bg-background/80 rounded-2xl border border-muted/20 shadow-[0_0_15px_rgba(0,0,0,0.05)] p-4 sm:p-6 h-full overflow-hidden'>
						<div className='pb-3 sm:pb-4 border-b border-muted/10 flex-shrink-0'>
							<div className='flex items-center gap-2 text-base sm:text-lg font-bold'>
								<Calculator className='h-4 w-4 sm:h-5 sm:w-5' />
								{t.investmentDetails}
							</div>
						</div>
						<div className='pt-2 grid gap-3 sm:gap-4 overflow-y-auto px-1 pb-1'>
							<div className='grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1'>
								<div className='grid gap-2'>
									<Label htmlFor='initial'>
										{t.initialDeposit}
									</Label>
									<div className='relative'>
										<span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
											{currency}
										</span>
										<Input
											id='initial'
											type='number'
											min='0'
											step='100'
											value={initialDeposit}
											className='pl-12'
											onChange={(e) => {
												const value = Math.max(
													0,
													Number(e.target.value)
												);
												setInitialDeposit(value);
											}}
										/>
									</div>
								</div>

								<div className='grid gap-2'>
									<Label htmlFor='years'>
										{t.yearsOfGrowth}
									</Label>
									<Input
										id='years'
										type='number'
										min='1'
										max='100'
										value={years}
										onChange={(e) => {
											const value = Math.min(
												100,
												Math.max(
													1,
													Number(e.target.value)
												)
											);
											setYears(value);
										}}
									/>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1'>
								<div className='grid gap-2'>
									<Label htmlFor='rate'>
										{t.rateOfReturn}
									</Label>
									<div className='relative'>
										<Input
											id='rate'
											type='number'
											min='0'
											value={rate}
											onChange={(e) => {
												const value = Math.min(
													100,
													Math.max(
														0,
														Number(e.target.value)
													)
												);
												setRate(value);
											}}
										/>
										<span className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
											%
										</span>
									</div>
								</div>

								<div className='grid gap-2'>
									<Label htmlFor='compound'>
										{t.compoundFrequency}
									</Label>
									<Select
										value={compoundFrequency}
										onValueChange={setCompoundFrequency}>
										<SelectTrigger id='compound'>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='1'>
												{t.annually}
											</SelectItem>
											<SelectItem value='4'>
												{t.quarterly}
											</SelectItem>
											<SelectItem value='12'>
												{t.monthly}
											</SelectItem>
											<SelectItem value='365'>
												{t.daily}
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className='grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1'>
								<div className='grid gap-2'>
									<Label htmlFor='contribution'>
										{t.contribution}
									</Label>
									<div className='relative'>
										<span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
											{currency}
										</span>
										<Input
											id='contribution'
											type='number'
											min='0'
											step='100'
											value={contributionAmount}
											className='pl-12'
											onChange={(e) => {
												const value = Math.max(
													0,
													Number(e.target.value)
												);
												setContributionAmount(value);
											}}
										/>
									</div>
								</div>

								<div className='grid gap-2'>
									<Label>{t.frequency}</Label>
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
											{t.monthly}
										</ToggleGroupItem>
										<ToggleGroupItem
											value='annually'
											className='flex-1'>
											{t.annually}
										</ToggleGroupItem>
									</ToggleGroup>
								</div>
							</div>
						</div>
					</div>

					{/* Second container */}
					<div className='basis-1/2 sm:basis-3/5 lg:basis-2/3 w-full backdrop-blur-xl bg-background/80 rounded-2xl border border-muted/20 shadow-[0_0_15px_rgba(0,0,0,0.05)] p-4 sm:p-6 h-full flex flex-col overflow-hidden'>
						<div className='pb-2 sm:pb-4 border-b border-muted/10'>
							<div className='text-center space-y-1'>
								<div className='text-sm text-muted-foreground font-normal'>
									{t.totalBalance}
								</div>
								<div className='text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#2DD4BF] to-[#22d3ee] bg-clip-text text-transparent'>
									{preciseFormatter.format(finalBalance)}
								</div>
							</div>
						</div>
						<div className='pt-4 flex-grow flex flex-col min-h-0'>
							<ChartContainer
								config={chartConfig}
								className='flex-grow w-full min-h-0'>
								<AreaChart
									data={results}
									margin={{
										top: 20,
										right: 15,
										left: 15,
										bottom: 20,
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
										tickFormatter={formatAxisValue}
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
										stroke={
											chartConfig.totalInterest.lineColor
										}
										strokeWidth={2}
										fill={`url(#${chartConfig.totalInterest.gradientId})`}
										fillOpacity={1}
									/>
									<ChartTooltip
										content={
											<CustomTooltip
												formatter={getCurrencySymbol}
												language={language}
											/>
										}
									/>
								</AreaChart>
							</ChartContainer>
							<div className='mt-2 sm:mt-4 flex flex-row justify-center items-center gap-8 text-xs sm:text-sm flex-shrink-0'>
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
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
