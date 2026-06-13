import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'О нас — Актив Плюс',
  description: 'Агентство премиальной недвижимости Актив Плюс. 17 лет на рынке Ростова-на-Дону.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
