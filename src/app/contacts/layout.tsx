import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Контакты — Актив Плюс',
  description: 'Свяжитесь с агентством премиальной недвижимости Актив Плюс в Ростове-на-Дону.',
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
