import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Наши объекты — Актив Плюс',
  description: 'Портфолио объектов премиальной недвижимости Актив Плюс в Ростове-на-Дону.',
};

export default function ObjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
