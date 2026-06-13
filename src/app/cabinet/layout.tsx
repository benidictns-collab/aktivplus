import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Личный кабинет — Актив Плюс',
  description: 'Личный кабинет клиента агентства недвижимости Актив Плюс. Избранное, заявки, сообщения.',
};

export default function CabinetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
