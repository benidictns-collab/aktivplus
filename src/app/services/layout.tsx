import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Услуги — Актив Плюс',
  description: 'Полный спектр услуг на рынке недвижимости: продажа, покупка, аренда, юридическое сопровождение сделок.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
