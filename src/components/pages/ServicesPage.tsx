'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Shield, Clock, UserCheck, FileText, Search, Handshake, X, Send, Home, Building, Key, Scale, TrendingUp, Briefcase, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { services } from '@/lib/data';
import ApplicationFormSection from '@/components/sections/ApplicationFormSection';
import { useNavigationStore } from '@/store/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

/* ─── Detailed service data ──────────────────────────────── */
const serviceDetails = [
  {
    id: 1,
    icon: Home,
    detailedDescription:
      'Мы обеспечиваем профессиональную продажу вашей недвижимости на максимально выгодных условиях. Наша команда проводит комплексную оценку объекта, профессиональную фотосъёмку, составляет эффективное рекламное объявление и размещает его на ведущих площадках. Персональный менеджер сопровождает сделку от начала до конца, обеспечивая юридическую чистоту и безопасность на каждом этапе. Мы гарантируем быстрый поиск покупателя и оптимальную цену для вашего объекта.',
    features: [
      'Бесплатная оценка объекта',
      'Профессиональная фотосъёмка и видеопрезентация',
      'Размещение на 50+ площадках',
      'Юридическая проверка покупателя',
      'Полное сопровождение сделки',
      'Гарантия безопасности расчётов',
    ],
  },
  {
    id: 2,
    icon: Key,
    detailedDescription:
      'Подберём для вас идеальный объект недвижимости, полностью соответствующий вашим пожеланиям и бюджету. Мы имеем доступ к закрытым предложениям и базе объектов, которые не представлены на открытом рынке. Наш эксперт проведёт тщательный анализ района, проверит юридическую чистоту объекта, организует просмотры в удобное для вас время и обеспечит лучшие условия покупки, включая помощь в получении ипотеки на выгодных условиях.',
    features: [
      'Доступ к закрытым предложениям',
      'Персональный подбор объектов',
      'Проверка юридической чистоты',
      'Организация просмотров 24/7',
      'Помощь в оформлении ипотеки',
      'Защита интересов покупателя',
    ],
  },
  {
    id: 3,
    icon: Building,
    detailedDescription:
      'Предоставляем полный спектр услуг по аренде недвижимости — как для собственников, так и для арендаторов. Для собственников: поиск надёжных арендаторов, проверка платёжеспособности, составление договора аренды с защитой ваших интересов. Для арендаторов: подбор объектов по заданным критериям, организация просмотров, помощь в оформлении документов. Работаем с жилой и коммерческой недвижимостью, обеспечивая безопасность и прозрачность каждой сделки.',
    features: [
      'Проверка надёжности арендаторов',
      'Составление юридически грамотного договора',
      'Подбор объектов по вашим критериям',
      'Контроль платежей и соблюдения условий',
      'Работа с жилой и коммерческой недвижимостью',
      'Оперативный поиск — от 1 дня',
    ],
  },
  {
    id: 4,
    icon: Briefcase,
    detailedDescription:
      'Специализируемся на сделках с коммерческой недвижимостью в Ростове-на-Дону. Помогаем найти оптимальное помещение для вашего бизнеса — от небольших офисов до крупных торговых центров и складских комплексов. Проводим анализ локации, оцениваем потенциал объекта, проверяем соответствие зонированию и нормативным требованиям. Обеспечиваем полное юридическое сопровождение сделки, включая проверку правоустанавливающих документов и согласование условий аренды или покупки.',
    features: [
      'Подбор офисов, магазинов, складов',
      'Анализ локации и трафика',
      'Проверка зонирования и разрешений',
      'Согласование условий аренды',
      'Юридическая проверка документов',
      'Помощь в переоборудовании помещений',
    ],
  },
  {
    id: 5,
    icon: TrendingUp,
    detailedDescription:
      'Помогаем инвесторам найти наиболее выгодные объекты для вложения капитала в недвижимость Ростова-на-Дону. Проводим детальный анализ рынка, оцениваем потенциальную доходность, рассчитываем сроки окупаемости и прогнозируем рост стоимости. Предлагаем доступ к эксклюзивным инвестиционным проектам на ранних стадиях строительства с максимальной маржинальностью. Формируем инвестиционный портфель с учётом ваших целей и допустимого уровня риска.',
    features: [
      'Анализ доходности и окупаемости',
      'Доступ к проектам на ранних стадиях',
      'Формирование инвестиционного портфеля',
      'Прогноз роста стоимости объектов',
      'Документальное сопровождение инвестиций',
      'Мониторинг объектов после покупки',
    ],
  },
  {
    id: 6,
    icon: Scale,
    detailedDescription:
      'Обеспечиваем полное юридическое сопровождение сделок с недвижимостью любой сложности. Наши юристы проверяют правовую чистоту объекта, анализируют историю перехода прав, выявляют обременения и скрытые риски. Составляем и согласовываем все необходимые документы, проводим безопасные расчёты через банковские ячейки или аккредитивы. Представляем ваши интересы в Росреестре, БТИ и других государственных органах. Гарантируем юридическую безопасность каждой сделки.',
    features: [
      'Проверка юридической чистоты объекта',
      'Анализ истории перехода прав',
      'Выявление обременений и рисков',
      'Составление и согласование документов',
      'Безопасные расчёты через банк',
      'Регистрация в Росреестре',
    ],
  },
];

const workStages = [
  { icon: Search, title: 'Консультация', desc: 'Бесплатная консультация и определение ваших потребностей' },
  { icon: FileText, title: 'Подбор объектов', desc: 'Подбираем объекты, соответствующие вашим критериям' },
  { icon: Shield, title: 'Проверка', desc: 'Тщательная юридическая и техническая проверка объекта' },
  { icon: Handshake, title: 'Сделка', desc: 'Оформление и подписание всех необходимых документов' },
  { icon: CheckCircle, title: 'Передача', desc: 'Передача ключей и полное завершение сделки' },
];

const serviceAdvantages = [
  'Бесплатная консультация',
  'Индивидуальный подход',
  'Полное юридическое сопровождение',
  'Гарантия безопасности сделки',
  'Доступ к закрытым предложениям',
  'Персональный менеджер 24/7',
];

export default function ServicesPage() {
  const { navigate } = useNavigationStore();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const activeService = serviceDetails.find(s => s.id === selectedService);
  const activeServiceData = services.find(s => s.id === selectedService);

  const handleCardClick = (serviceId: number) => {
    setSelectedService(serviceId);
  };

  const handleOrderClick = () => {
    setSelectedService(null);
    setOrderModalOpen(true);
    setIsSuccess(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="relative py-20 md:py-32 bg-[#0B0B0B] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/service-sale.jpg"
            alt="Услуги"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">Услуги</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Наши <span className="gold-text">услуги</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Полный спектр услуг для решения любых задач в сфере недвижимости
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const detail = serviceDetails.find(d => d.id === service.id);
              const Icon = detail?.icon || Building;
              return (
                <div
                  key={service.id}
                  onClick={() => handleCardClick(service.id)}
                  className="premium-card group relative overflow-hidden rounded-2xl bg-[#141414] border border-white/5 cursor-pointer hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="w-10 h-10 rounded-full bg-[#D4AF37] text-black text-sm font-bold flex items-center justify-center">
                        {String(service.id).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center backdrop-blur-sm">
                        <Icon className="w-4 h-4 text-[#D4AF37]" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{service.description}</p>
                    <div className="flex items-center gap-2 text-[#D4AF37] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                      Подробнее
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Почему <span className="gold-text">выбирают нас</span>
              </h2>
              <p className="text-white/60 mb-8">
                Мы предоставляем комплексный подход к решению любых задач в сфере недвижимости
              </p>
              <div className="space-y-4">
                {serviceAdvantages.map((adv) => (
                  <div key={adv} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <span className="text-white/80">{adv}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/images/service-buy.jpg"
                  alt="Преимущества"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Stages */}
      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Этапы <span className="gold-text">работы</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {workStages.map((stage, i) => (
              <div
                key={stage.title}
                className="text-center p-6 rounded-2xl bg-[#141414] border border-white/5 relative"
              >
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4">
                  <stage.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="text-[#D4AF37] text-sm font-bold mb-2">0{i + 1}</div>
                <h3 className="text-white font-semibold mb-2">{stage.title}</h3>
                <p className="text-white/50 text-sm">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <ApplicationFormSection />

      {/* ─── Service Detail Modal ──────────────────────────────── */}
      <Dialog open={selectedService !== null} onOpenChange={(open) => { if (!open) setSelectedService(null); }}>
        <DialogContent className="bg-[#111] border-[#D4AF37]/20 text-white max-w-2xl p-0 overflow-hidden">
          {activeService && activeServiceData && (
            <>
              {/* Hero image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={activeServiceData.image}
                  alt={activeServiceData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/60 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center backdrop-blur-sm">
                    <activeService.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <span className="text-[#D4AF37] text-xs font-bold tracking-wider uppercase">0{activeService.id}</span>
                </div>
              </div>

              <div className="px-6 pb-6 -mt-2">
                <DialogHeader>
                  <DialogTitle className="text-xl md:text-2xl font-bold text-white">
                    {activeServiceData.title}
                  </DialogTitle>
                  <DialogDescription className="text-white/50 text-sm">
                    {activeServiceData.description}
                  </DialogDescription>
                </DialogHeader>

                {/* Detailed description */}
                <p className="text-white/70 text-sm md:text-base leading-relaxed mt-4">
                  {activeService.detailedDescription}
                </p>

                {/* Features */}
                <div className="mt-5">
                  <h4 className="text-[#D4AF37] text-sm font-semibold tracking-wider uppercase mb-3">
                    Что входит в услугу
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {activeService.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleOrderClick}
                    className="flex-1 bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-11 text-sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Заказать услугу
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 border-white/10 text-white/70 hover:text-white hover:border-white/30 h-11 text-sm"
                  >
                    Закрыть
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ─── Order Service Modal ──────────────────────────────── */}
      <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
        <DialogContent className="bg-[#111] border-[#D4AF37]/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">
              Заказать услугу
            </DialogTitle>
            <DialogDescription className="text-white/50 text-sm">
              {activeServiceData?.title && (
                <>
                  Услуга: <span className="text-[#D4AF37]">{activeServiceData.title}</span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Заявка отправлена!</h3>
              <p className="text-white/50 text-sm">
                Мы свяжемся с вами в ближайшее время
              </p>
              <Button
                onClick={() => setOrderModalOpen(false)}
                className="mt-6 bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-10"
              >
                Отлично
              </Button>
            </div>
          ) : (
            <form onSubmit={handleOrderSubmit} className="space-y-4 mt-2">
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
                <Input
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-10 text-white placeholder:text-white/30 text-sm"
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
                <Input
                  placeholder="Телефон"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-10 text-white placeholder:text-white/30 text-sm"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
                <Input
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-10 text-white placeholder:text-white/30 text-sm"
                />
              </div>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-[#D4AF37]/50" />
                <Textarea
                  placeholder="Комментарий к заявке"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="pl-10 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] min-h-[80px] text-white placeholder:text-white/30 resize-none text-sm"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-11"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Отправить заявку
                  </>
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
