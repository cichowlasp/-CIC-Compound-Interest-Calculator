'use client';

import { translations } from '@/lib/translations';

interface CustomTooltipProps {
	active?: boolean;
	payload?: Array<{
		value: number;
		payload: {
			year: number;
		};
	}>;
	language: string;
	formatter: (value: number) => string;
}

export function CustomTooltip({
	active,
	payload,
	formatter,
	language,
}: CustomTooltipProps) {
	if (active && payload && payload.length) {
		const totalPrincipal = payload[0].value;
		const totalInterest = payload[1].value;
		const total = totalPrincipal + totalInterest;
		const principalPercent = (totalPrincipal / total) * 100;
		const interestPercent = (totalInterest / total) * 100;

		const t = translations[language as keyof typeof translations];

		return (
			<div className='rounded-lg border bg-background p-2 sm:p-3 shadow-sm'>
				<div className='text-xs sm:text-sm font-medium mb-1 sm:mb-2'>
					{t.year} {payload[0].payload.year}
				</div>
				<div className='space-y-0.5 sm:space-y-1'>
					<div className='flex items-center gap-1.5 sm:gap-2'>
						<div className='h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#FF8B7B]' />
						<span className='text-xs sm:text-sm text-muted-foreground'>
							{t.principal}: {formatter(totalPrincipal)} (
							{principalPercent.toFixed(1)}%)
						</span>
					</div>
					<div className='flex items-center gap-1.5 sm:gap-2'>
						<div className='h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#2DD4BF]' />
						<span className='text-xs sm:text-sm text-muted-foreground'>
							{t.interest}: {formatter(totalInterest)} (
							{interestPercent.toFixed(1)}%)
						</span>
					</div>
					<div className='pt-0.5 sm:pt-1 text-xs sm:text-sm font-medium'>
						{t.total}: {formatter(total)}
					</div>
				</div>
			</div>
		);
	}
	return null;
}
