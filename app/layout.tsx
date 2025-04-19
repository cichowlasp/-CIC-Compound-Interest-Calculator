import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Compound Interest Calculator | Free Investment Growth Tool',
	description:
		'Calculate how your investments grow with our free compound interest calculator. Plan your financial future with accurate projections for any investment period.',
	keywords:
		'compound interest calculator, investment calculator, financial planning tool, retirement calculator, investment growth, kalkulator procentu składanego, kalkulator inwestycyjny, narzędzie do planowania finansowego, kalkulator emerytalny, wzrost inwestycji',
	openGraph: {
		title: 'Compound Interest Calculator | Free Investment Growth Tool',
		description:
			'Calculate how your investments grow with our free compound interest calculator. Plan your financial future with accurate projections.',
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Compound Interest Calculator | Free Investment Growth Tool',
		description:
			'Calculate how your investments grow with our free compound interest calculator.',
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body
				suppressHydrationWarning={true}
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
