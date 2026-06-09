'use client';

import React, { useState, useEffect } from 'react';
import { Building, Home, Key, Scale, TrendingUp, Briefcase, ArrowRight, CheckCircle, X, Send, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface SelectorOption {
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
}

interface InteractiveSelectorProps {
  options?: SelectorOption[];
  title?: string;
  subtitle?: string;
}

const defaultOptions: SelectorOption[] = [
  {
    title: 'Продажа недвижимости',
    description: 'Профессиональная продажа на лучших условиях рынка',
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
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973',
    icon: <Home size={22} className="text-[#D4AF37]" />,
  },
  {
    title: 'Покупка недвижимости',
    description: 'Подберём идеальный объект под ваши потребности',
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
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070',
    icon: <Key size={22} className="text-[#D4AF37]" />,
  },
  {
    title: 'Аренда недвижимости',
    description: 'Сдача и подбор арендной недвижимости быстро и надёжно',
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
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070',
    icon: <Building size={22} className="text-[#D4AF37]" />,
  },
  {
    title: 'Коммерческая недвижимость',
    description: 'Офисы, торговые площади и склады для вашего бизнеса',
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
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069',
    icon: <Briefcase size={22} className="text-[#D4AF37]" />,
  },
  {
    title: 'Инвестиционные объекты',
    description: 'Выгодные инвестиции с высокой доходностью',
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
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=2070',
    icon: <TrendingUp size={22} className="text-[#D4AF37]" />,
  },
  {
    title: 'Сопровождение сделок',
    description: 'Полное юридическое сопровождение на всех этапах',
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
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070',
    icon: <Scale size={22} className="text-[#D4AF37]" />,
  },
];

export default function InteractiveSelector({
  options = defaultOptions,
  title = 'Наши услуги',
  subtitle = 'Полный спектр услуг для решения любых задач в сфере недвижимости',
}: InteractiveSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<SelectorOption | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleDetailsClick = (e: React.MouseEvent, option: SelectorOption) => {
    e.stopPropagation();
    setSelectedService(option);
    setDetailModalOpen(true);
  };

  const handleOrderClick = () => {
    setDetailModalOpen(false);
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

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 150 * i);
      timers.push(timer);
    });
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [options]);

  // ─── Service Detail Modal ────────────────────────────────────────────────
  const DetailModal = () => (
    <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
      <DialogContent className="bg-[#111] border-[#D4AF37]/20 text-white max-w-2xl p-0 overflow-hidden">
        {/* Hero image */}
        {selectedService && (
          <>
            <div className="relative h-48 md:h-56 overflow-hidden">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/60 to-transparent" />
              {/* Icon overlay */}
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center backdrop-blur-sm">
                  {selectedService.icon}
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 -mt-2">
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl font-bold text-white">
                  {selectedService.title}
                </DialogTitle>
                <DialogDescription className="text-white/50 text-sm">
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>

              {/* Detailed description */}
              <p className="text-white/70 text-sm md:text-base leading-relaxed mt-4">
                {selectedService.detailedDescription}
              </p>

              {/* Features */}
              <div className="mt-5">
                <h4 className="text-[#D4AF37] text-sm font-semibold tracking-wider uppercase mb-3">
                  Что входит в услугу
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedService.features.map((feature, i) => (
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
                  onClick={() => setDetailModalOpen(false)}
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
  );

  // ─── Order Service Modal ────────────────────────────────────────────────
  const OrderModal = () => (
    <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
      <DialogContent className="bg-[#111] border-[#D4AF37]/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Заказать услугу
          </DialogTitle>
          <DialogDescription className="text-white/50 text-sm">
            {selectedService?.title && (
              <>
                Услуга: <span className="text-[#D4AF37]">{selectedService.title}</span>
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
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
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
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#D4AF37]/50" />
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
  );

  // ─── "Подробнее" button (shared) ──────────────────────────────────────
  const DetailsButton = ({ option }: { option: SelectorOption }) => (
    <button
      onClick={(e) => handleDetailsClick(e, option)}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D4AF37] text-black text-xs font-semibold hover:bg-[#F1D28A] transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.4)] whitespace-nowrap pointer-events-auto"
    >
      Подробнее
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  );

  // ─── Mobile layout ────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="relative flex flex-col items-center w-full bg-[#0B0B0B] font-sans text-white py-8">
        {/* Header — always visible, not affected by stagger animation */}
        <div className="w-full px-6 mb-8 text-center" style={{ opacity: 1 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-medium tracking-[0.2em] uppercase">
              Что мы предлагаем
            </span>
            <div className="h-px w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
            {title.split(' ').map((word, i) =>
              i === title.split(' ').length - 1 ? (
                <span key={i} className="gold-text">
                  {' '}{word}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-sm text-white/60 max-w-md mx-auto">{subtitle}</p>
        </div>

        {/* Mobile: vertical card list */}
        <div className="w-full px-4 flex flex-col gap-3">
          {options.map((option, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ease-in-out"
                style={{
                  backgroundImage: `url('${option.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: isActive ? '160px' : '64px',
                  opacity: animatedOptions.includes(index) ? 1 : 0,
                  transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-30px)',
                  border: `1.5px solid ${isActive ? '#D4AF37' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isActive
                    ? '0 8px 30px rgba(212,175,55,0.15)'
                    : '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'all 0.5s ease-in-out',
                }}
                onClick={() => handleOptionClick(index)}
              >
                {/* Dark overlay */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center h-full px-4 gap-3">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width: '36px',
                      height: '36px',
                      background: isActive ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.08)',
                      border: `1.5px solid ${isActive ? '#D4AF37' : 'rgba(255,255,255,0.15)'}`,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {option.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-semibold text-sm text-white transition-all duration-500"
                      style={{
                        opacity: 1,
                        color: isActive ? '#F1D28A' : 'rgba(255,255,255,0.8)',
                      }}
                    >
                      {option.title}
                    </div>
                    <div
                      className="text-xs text-white/50 transition-all duration-500 overflow-hidden"
                      style={{
                        maxHeight: isActive ? '40px' : '0',
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      {option.description}
                    </div>
                    {/* Подробнее button - mobile */}
                    <div
                      className="mt-2 transition-all duration-500"
                      style={{
                        maxHeight: isActive ? '40px' : '0',
                        opacity: isActive ? 1 : 0,
                        overflow: 'hidden',
                      }}
                    >
                      <DetailsButton option={option} />
                    </div>
                  </div>
                  {/* Gold indicator */}
                  {isActive && (
                    <div className="flex-shrink-0 w-1.5 h-8 rounded-full bg-[#D4AF37]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <DetailModal />
        <OrderModal />
      </div>
    );
  }

  // ─── Desktop layout ───────────────────────────────────────────────────
  return (
    <div className="relative flex flex-col items-center w-full bg-[#0B0B0B] font-sans text-white py-10">
      {/* Header — always visible, not affected by stagger animation */}
      <div className="w-full max-w-4xl px-6 mb-6 text-center" style={{ opacity: 1 }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
            Что мы предлагаем
          </span>
          <div className="h-px w-12 bg-[#D4AF37]" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
          {title.split(' ').map((word, i) =>
            i === title.split(' ').length - 1 ? (
              <span key={i} className="gold-text">
                {' '}{word}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h2>
        <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto">{subtitle}</p>
      </div>

      <div className="h-8" />

      {/* Options Container */}
      <div className="flex w-full max-w-[1000px] h-[420px] mx-auto items-stretch overflow-hidden relative px-4">
        {options.map((option, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className="relative flex flex-col justify-end overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: isActive ? 'auto 110%' : 'auto 130%',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                minWidth: '50px',
                minHeight: '80px',
                margin: '0 2px',
                borderRadius: '12px',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: isActive ? '#D4AF37' : 'rgba(255,255,255,0.06)',
                backgroundColor: '#111',
                boxShadow: isActive
                  ? '0 20px 60px rgba(212,175,55,0.12), 0 8px 20px rgba(0,0,0,0.4)'
                  : '0 10px 30px rgba(0,0,0,0.3)',
                flex: isActive ? '5 1 0%' : '0.8 1 0%',
                zIndex: isActive ? 10 : 1,
                willChange: 'flex-grow, box-shadow, background-size, background-position',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onClick={() => handleOptionClick(index)}
            >
              {/* Bottom gradient shadow */}
              <div
                className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                style={{
                  bottom: isActive ? '0' : '-50px',
                  height: '140px',
                  boxShadow: isActive
                    ? 'inset 0 -140px 140px -120px #000, inset 0 -100px 100px -80px rgba(0,0,0,0.8)'
                    : 'inset 0 -140px 0px -120px #000, inset 0 -100px 0px -80px rgba(0,0,0,0.8)',
                }}
              />

              {/* Top vignette for inactive panels */}
              {!isActive && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
                  }}
                />
              )}

              {/* Number indicator */}
              <div
                className="absolute top-3 left-3 flex items-center justify-center rounded-full transition-all duration-500"
                style={{
                  width: '28px',
                  height: '28px',
                  background: isActive ? 'rgba(212,175,55,0.9)' : 'rgba(255,255,255,0.08)',
                  border: `1.5px solid ${isActive ? '#D4AF37' : 'rgba(255,255,255,0.12)'}`,
                  opacity: isActive ? 0 : 0.7,
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.7)',
                  zIndex: 5,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Label with icon, info and button */}
              <div
                className="absolute left-0 right-0 bottom-4 flex flex-col justify-end z-10 px-4 gap-3 w-full"
              >
                {/* Title row */}
                <div className="flex items-center justify-start gap-3">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width: '44px',
                      height: '44px',
                      background: isActive ? 'rgba(212,175,55,0.2)' : 'rgba(11,11,11,0.85)',
                      border: `2px solid ${isActive ? '#D4AF37' : 'rgba(255,255,255,0.12)'}`,
                      backdropFilter: 'blur(10px)',
                      boxShadow: isActive
                        ? '0 0 20px rgba(212,175,55,0.15)'
                        : '0 1px 4px rgba(0,0,0,0.18)',
                    }}
                  >
                    {option.icon}
                  </div>
                  <div className="text-white whitespace-nowrap relative overflow-hidden">
                    <div
                      className="font-bold text-base md:text-lg transition-all duration-700 ease-in-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                        color: '#F1D28A',
                      }}
                    >
                      {option.title}
                    </div>
                    <div
                      className="text-sm text-white/60 transition-all duration-700 ease-in-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                        transitionDelay: '0.1s',
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                </div>

                {/* Подробнее button - desktop */}
                <div
                  className="transition-all duration-700 ease-in-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(15px)',
                    transitionDelay: '0.2s',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <DetailsButton option={option} />
                </div>
              </div>

              {/* Gold accent line at bottom when active */}
              <div
                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-700"
                style={{
                  background: isActive
                    ? 'linear-gradient(90deg, #D4AF37, #F1D28A, #D4AF37)'
                    : 'transparent',
                  opacity: isActive ? 1 : 0,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex items-center gap-2 mt-6">
        {options.map((_, index) => (
          <button
            key={index}
            className="rounded-full transition-all duration-300"
            style={{
              width: activeIndex === index ? '24px' : '8px',
              height: '8px',
              background: activeIndex === index ? '#D4AF37' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer',
            }}
            onClick={() => handleOptionClick(index)}
          />
        ))}
      </div>

      <DetailModal />
      <OrderModal />
    </div>
  );
}
