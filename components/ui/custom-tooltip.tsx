'use client';

interface CustomTooltipProps {
	active?: boolean;
	payload?: Array<{
		value: number;
		payload: {
			year: number;
		};
	}>;
}

export function CustomTooltip({ active, payload }: CustomTooltipProps) {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	if (active && payload && payload.length) {
		const totalPrincipal = payload[0].value;
		const totalInterest = payload[1].value;
		const total = totalPrincipal + totalInterest;
		const principalPercent = (totalPrincipal / total) * 100;
		const interestPercent = (totalInterest / total) * 100;

		return (
			<div className='rounded-lg border bg-background p-3 shadow-sm'>
				<div className='text-sm font-medium mb-2'>
					Year {payload[0].payload.year}
				</div>
				<div className='space-y-1'>
					<div className='flex items-center gap-2'>
						<div className='h-2 w-2 rounded-full bg-[#FF8B7B]' />
						<span className='text-sm text-muted-foreground'>
							Principal: {formatter.format(totalPrincipal)} (
							{principalPercent.toFixed(1)}%)
						</span>
					</div>
					<div className='flex items-center gap-2'>
						<div className='h-2 w-2 rounded-full bg-[#2DD4BF]' />
						<span className='text-sm text-muted-foreground'>
							Interest: {formatter.format(totalInterest)} (
							{interestPercent.toFixed(1)}%)
						</span>
					</div>
					<div className='pt-1 text-sm font-medium'>
						Total: {formatter.format(total)}
					</div>
				</div>
			</div>
		);
	}
	return null;
}
