import {
	Settings,
	Moon,
	Sun,
	Github,
	Linkedin,
	Instagram,
	Globe,
} from 'lucide-react';

import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { translations } from '@/lib/translations';

export function MobileSettings(props: {
	currency: string;
	setCurrency: (value: string) => void;
	language: string;
	setLanguage: (value: string) => void;
	theme: string;
	setTheme: (value: string) => void;
}) {
	const t = translations[props.language as keyof typeof translations];

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button className='p-3 rounded-full bg-background/80 backdrop-blur-xl border border-muted/20 shadow-lg hover:bg-accent transition-colors'>
					<Settings className='h-5 w-5' />
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<div className='mx-auto w-full max-w-sm md:max-w-lg'>
					<DrawerHeader className='sm:text-center'>
						<DrawerTitle className='sm:text-xl md:text-2xl'>
							{t.settings}
						</DrawerTitle>
					</DrawerHeader>
					<div className='p-4 pb-8 sm:p-6 md:p-8 sm:pb-10'>
						<div className='grid gap-6 md:gap-8'>
							<div className='grid gap-4 sm:gap-6'>
								<div className='grid gap-2 sm:gap-3'>
									<Label className='sm:text-sm md:text-base'>
										{t.theme}
									</Label>
									<div className='flex gap-2'>
										<button
											onClick={() =>
												props.setTheme(
													props.theme === 'dark'
														? 'light'
														: 'dark'
												)
											}
											className='w-full flex items-center justify-between px-4 py-2 sm:py-3 rounded-md border hover:bg-accent'>
											<span className='flex items-center gap-2'>
												{props.theme === 'dark' ? (
													<Moon className='h-4 w-4 md:h-5 md:w-5' />
												) : (
													<Sun className='h-4 w-4 md:h-5 md:w-5' />
												)}
												{props.theme === 'dark'
													? t.dark
													: t.light}
											</span>
										</button>
									</div>
								</div>
								<div className='grid gap-2 sm:gap-3'>
									<Label className='sm:text-sm md:text-base'>
										{t.currency}
									</Label>
									<Select
										value={props.currency}
										onValueChange={props.setCurrency}>
										<SelectTrigger className='sm:py-3'>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='USD'>
												{t.usd}
											</SelectItem>
											<SelectItem value='EUR'>
												{t.eur}
											</SelectItem>
											<SelectItem value='GBP'>
												{t.gbp}
											</SelectItem>
											<SelectItem value='PLN'>
												{t.pln}
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className='grid gap-2 sm:gap-3'>
									<Label className='sm:text-sm md:text-base'>
										{t.language}
									</Label>
									<Select
										value={props.language}
										onValueChange={props.setLanguage}>
										<SelectTrigger className='sm:py-3'>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='en'>
												English
											</SelectItem>
											<SelectItem value='pl'>
												Polski
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							<div className='mt-4 pt-4 border-t'>
								<div className='relative mt-4'>
									<div className='absolute -inset-0.5 bg-gradient-to-r from-[#2DD4BF] to-[#22d3ee] rounded-lg blur-sm opacity-75'></div>
									<div className='relative p-4 md:p-5 rounded-lg bg-background border border-muted/20 shadow-sm z-10'>
										<div className='flex flex-col items-center text-center'>
											<p className='font-medium text-base md:text-lg'>
												Piotr Cichowlas
											</p>
											<p className='text-muted-foreground mt-1 text-sm md:text-base'>
												{t.author}
											</p>
											<div className='flex gap-3 mt-4'>
												<a
													href='https://portfolio.cichowlasp.org'
													target='_blank'
													rel='noopener noreferrer'
													className='p-2 md:p-3 rounded-md bg-background border border-muted/20 hover:bg-accent/50 transition-colors'
													aria-label='Portfolio'>
													<Globe className='h-4 w-4 md:h-5 md:w-5' />
												</a>
												<a
													href='https://github.com/cichowlasp'
													target='_blank'
													rel='noopener noreferrer'
													className='p-2 md:p-3 rounded-md bg-background border border-muted/20 hover:bg-accent/50 transition-colors'
													aria-label='GitHub'>
													<Github className='h-4 w-4 md:h-5 md:w-5' />
												</a>
												<a
													href='https://linkedin.com/in/piotr-cichowlas'
													target='_blank'
													rel='noopener noreferrer'
													className='p-2 md:p-3 rounded-md bg-background border border-muted/20 hover:bg-accent/50 transition-colors'
													aria-label='LinkedIn'>
													<Linkedin className='h-4 w-4 md:h-5 md:w-5' />
												</a>
												<a
													href='https://instagram.com/cichowlasp'
													target='_blank'
													rel='noopener noreferrer'
													className='p-2 md:p-3 rounded-md bg-background border border-muted/20 hover:bg-accent/50 transition-colors'
													aria-label='Instagram'>
													<Instagram className='h-4 w-4 md:h-5 md:w-5' />
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
