import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Каталог объектов — Актив Плюс',
  description: 'Каталог премиальной недвижимости в Ростове-на-Дону. Квартиры, дома, таунхаусы, коммерческая недвижимость.',
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
