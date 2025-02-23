import { Settings } from 'lucide-react';
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
				<div className='mx-auto w-full max-w-sm'>
					<DrawerHeader>
						<DrawerTitle>{t.settings}</DrawerTitle>
					</DrawerHeader>
					<div className='p-4 pb-8'>
						<div className='grid gap-4'>
							<div className='grid gap-2'>
								<Label>{t.currency}</Label>
								<Select
									value={props.currency}
									onValueChange={props.setCurrency}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='USD'>
											US Dollar
										</SelectItem>
										<SelectItem value='EUR'>
											Euro
										</SelectItem>
										<SelectItem value='GBP'>
											British Pound
										</SelectItem>
										<SelectItem value='PLN'>
											Polish Złoty
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='grid gap-2'>
								<Label>{t.language}</Label>
								<Select
									value={props.language}
									onValueChange={props.setLanguage}>
									<SelectTrigger>
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
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
