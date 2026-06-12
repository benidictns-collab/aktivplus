'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const contacts = [
  { icon: MapPin, title: 'Адрес', value: 'г. Ростов-на-Дону, ул. Обороны д. 49/22', link: null },
  { icon: Phone, title: 'Телефон', value: '+7 (900) 120-13-15', link: 'tel:+79001201315' },
  { icon: Mail, title: 'Email', value: 'info@aktivplus-agency.ru', link: 'mailto:info@aktivplus-agency.ru' },
  { icon: Clock, title: 'Режим работы', value: 'Пн-Пт: 9:00-19:00, Сб: 10:00-16:00', link: null },
];

export default function ContactsPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    toast({ title: 'Сообщение отправлено!', description: 'Мы ответим вам в ближайшее время.' });
  };

  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="relative py-20 md:py-32 bg-[#0B0B0B] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">Контакты</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Свяжитесь <span className="gold-text">с нами</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contacts.map((contact) => (
              <div
                key={contact.title}
                className="p-6 rounded-2xl bg-[#141414] border border-white/5 hover:border-[#D4AF37]/30 transition-all text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4">
                  <contact.icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{contact.title}</h3>
                {contact.link ? (
                  <a href={contact.link} className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-white/60 text-sm">{contact.value}</p>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden h-[400px] md:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.7!2d39.7!3d47.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDEzJzQ4LjAiTiAzOcKwNDInMDAuMCJF!5e0!3m2!1sru!2sru!4v1700000000000!5m2!1sru!2sru"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(80%) contrast(1.2)' }}
                allowFullScreen
                loading="lazy"
                title="Карта"
              />
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-[#141414] rounded-2xl border border-white/5 p-8">
                <h2 className="text-2xl font-bold text-white mb-2">Напишите нам</h2>
                <p className="text-white/50 mb-6">Заполните форму и мы ответим в ближайшее время</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Ваше имя" className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" required />
                  <Input placeholder="Телефон" type="tel" className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" required />
                  <Input placeholder="Email" type="email" className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" />
                  <Textarea placeholder="Сообщение" className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] min-h-[120px] text-white placeholder:text-white/30 resize-none" />
                  <Button type="submit" className="w-full bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-12" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : <><Send className="w-4 h-4 mr-2" />Отправить сообщение</>}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
