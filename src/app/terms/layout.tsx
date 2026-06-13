import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Пользовательское соглашение — Актив Плюс',
  description: 'Пользовательское соглашение сайта агентства недвижимости Актив Плюс.',
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
