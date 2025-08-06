import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FairHire - Честные технические собеседования | Защита от списывания',
  description: 'FairHire - революционное B2B решение для проведения честных технических интервью. Полный контроль над процессом собеседования, защита от списывания, мониторинг в реальном времени.',
  keywords: 'технические интервью, собеседования, HR, найм, защита от списывания, мониторинг кандидатов',
  openGraph: {
    title: 'FairHire - Честные технические собеседования',
    description: 'Революционное решение для проведения честных технических интервью с полным контролем процесса',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FairHire - Честные технические собеседования',
    description: 'Революционное решение для проведения честных технических интервью с полным контролем процесса',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}