'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const currencies = [
	{ code: 'USD', symbol: '$', label: 'US Dollar' },
	{ code: 'EUR', symbol: '€', label: 'Euro' },
	{ code: 'GBP', symbol: '£', label: 'British Pound' },
	{ code: 'PLN', symbol: 'zł', label: 'Polish Złoty' },
];

const languages = [
	{ code: 'en', label: 'English' },
	{ code: 'pl', label: 'Polski' },
];

interface NavbarProps {
	currency: string;
	onCurrencyChange: (currency: string) => void;
	language: string;
	onLanguageChange: (language: string) => void;
}

import { Calculator } from 'lucide-react';

export function Navbar({
	currency,
	onCurrencyChange,
	language,
	onLanguageChange,
}: NavbarProps) {
	return (
		<nav className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-muted/20'>
			<div className='container mx-auto px-4 h-16 flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<Calculator className='h-6 w-6 text-teal-400' />
					<span className='font-semibold text-sm md:text-lg'>
						Compound Calculator
					</span>
				</div>

				<div className='flex items-center gap-4'>
					<Select value={currency} onValueChange={onCurrencyChange}>
						<SelectTrigger className='w-[120px]'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{currencies.map((curr) => (
								<SelectItem key={curr.code} value={curr.code}>
									{curr.symbol} {curr.code}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select value={language} onValueChange={onLanguageChange}>
						<SelectTrigger className='w-[120px]'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{languages.map((lang) => (
								<SelectItem key={lang.code} value={lang.code}>
									{lang.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</nav>
	);
}
