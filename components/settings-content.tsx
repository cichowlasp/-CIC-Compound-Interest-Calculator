import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { translations } from '@/lib/translations';

export function SettingsContent({
	currency,
	setCurrency,
	language,
	setLanguage,
}: {
	currency: string;
	setCurrency: (value: string) => void;
	language: string;
	setLanguage: (value: string) => void;
}) {
	const t = translations[language as keyof typeof translations];

	return (
		<div className='mx-auto w-full max-w-sm'>
			<SheetHeader className='mb-4'>
				<SheetTitle>{t.settings}</SheetTitle>
			</SheetHeader>
			<div className='p-4 pb-8'>
				<div className='grid gap-4'>
					<div className='grid gap-2'>
						<Label>{t.currency}</Label>
						<Select value={currency} onValueChange={setCurrency}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='USD'>{t.usd}</SelectItem>
								<SelectItem value='EUR'>{t.eur}</SelectItem>
								<SelectItem value='GBP'>{t.gbp}</SelectItem>
								<SelectItem value='PLN'>{t.pln}</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className='grid gap-2'>
						<Label>{t.language}</Label>
						<Select value={language} onValueChange={setLanguage}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='en'>English</SelectItem>
								<SelectItem value='pl'>Polski</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
}
