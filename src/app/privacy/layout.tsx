import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — Актив Плюс',
  description: 'Политика конфиденциальности персональных данных агентства недвижимости Актив Плюс.',
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
