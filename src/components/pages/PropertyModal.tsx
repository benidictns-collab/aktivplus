'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Maximize,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
  Building,
  Car,
  PaintBucket,
  Sun,
  Calendar,
  GraduationCap,
  TreePine,
  ShoppingBag,
  Bus,
  Heart,
  Send,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useNavigationStore } from '@/store/navigation';
import { useToast } from '@/hooks/use-toast';

interface PropertyDB {
  id: number;
  title: string;
  price: string;
  area: string;
  rooms: string;
  district: string;
  type: string;
  dealType: string;
  status: string;
  description: string;
  images: string[];
  address: string;
  floor: string | null;
  parking: string | null;
  renovation: string | null;
  balcony: string | null;
  year: string | null;
  schools: string;
  gardens: string;
  shops: string;
  transport: string;
  parks: string;
  medicine: string;
  manager: { id: string; name: string | null; email: string; phone: string | null };
  createdAt: string;
  updatedAt: string;
}

export default function PropertyModal() {
  const { isPropertyModalOpen, selectedPropertyId, closePropertyModal } = useNavigationStore();
  const { toast } = useToast();
  const [currentImage, setCurrentImage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [property, setProperty] = useState<PropertyDB | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isPropertyModalOpen && selectedPropertyId) {
      setIsLoading(true);
      setCurrentImage(0);
      setShowForm(false);
      fetch(`/api/properties/${selectedPropertyId}`)
        .then(r => r.json())
        .then(data => {
          if (data.property) setProperty(data.property);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setProperty(null);
    }
  }, [isPropertyModalOpen, selectedPropertyId]);

  if (!isPropertyModalOpen) return null;
  if (isLoading) {
    return (
      <Dialog open={isPropertyModalOpen} onOpenChange={(open) => !open && closePropertyModal()}>
        <DialogContent className="max-w-[500px] bg-[#0B0B0B] border-[#D4AF37]/20 p-0 rounded-2xl">
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  if (!property) return null;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Заявка на просмотр отправлена!', description: 'Менеджер свяжется с вами для подтверждения.' });
    setShowForm(false);
  };

  const characteristics = [
    { icon: Maximize, label: 'Площадь', value: property.area },
    { icon: BedDouble, label: 'Комнат', value: property.rooms },
    { icon: Building, label: 'Этаж', value: property.floor || '—' },
    { icon: Car, label: 'Парковка', value: property.parking || '—' },
    { icon: PaintBucket, label: 'Отделка', value: property.renovation || '—' },
    { icon: Sun, label: 'Балкон', value: property.balcony || '—' },
    { icon: Calendar, label: 'Год', value: property.year || '—' },
  ];

  const infraItems = [
    { icon: GraduationCap, label: 'Школы', value: property.schools },
    { icon: TreePine, label: 'Детские сады', value: property.gardens },
    { icon: ShoppingBag, label: 'Магазины', value: property.shops },
    { icon: Bus, label: 'Транспорт', value: property.transport },
    { icon: TreePine, label: 'Парки', value: property.parks },
    { icon: Heart, label: 'Медицина', value: property.medicine },
  ].filter(item => item.value);

  const managerName = property.manager?.name || property.manager?.email || 'Менеджер';
  const managerInitials = property.manager?.name
    ? property.manager.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'МН';
  const managerPhone = property.manager?.phone || '+7 (863) 000-00-01';

  return (
    <Dialog open={isPropertyModalOpen} onOpenChange={(open) => !open && closePropertyModal()}>
      <DialogContent
        className="max-w-[95vw] sm:max-w-[900px] md:max-w-[1100px] lg:max-w-[1280px] max-h-[92vh] overflow-y-auto bg-[#0B0B0B] border-[#D4AF37]/20 p-0 rounded-2xl"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{property.title}</DialogTitle>
        <div className="relative">
          {/* Close button */}
          <button
            onClick={closePropertyModal}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* ─── Top: Image Gallery ─── */}
          {property.images && property.images.length > 0 && (
            <div className="relative h-[250px] sm:h-[320px] md:h-[400px] lg:h-[460px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={property.images[currentImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Thumbnails */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 overflow-x-auto max-w-[90vw] px-2 scrollbar-hide">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-12 h-8 sm:w-16 sm:h-11 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      i === currentImage ? 'border-[#D4AF37]' : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Status badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#D4AF37] text-black text-sm font-semibold px-4 py-2 rounded-full">
                  {property.status}
                </span>
              </div>
            </div>
          )}

          {/* ─── Content ─── */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Header: Title + Price */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 break-words">
                  {property.title}
                </h2>
                <div className="flex items-center gap-2 text-white/50 text-sm md:text-base">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="break-words">{property.address}, {property.district}</span>
                </div>
              </div>
              <div className="md:text-right shrink-0">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold gold-text whitespace-nowrap">{property.price}</div>
              </div>
            </div>

            {/* Characteristics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
              {characteristics.map((char) => (
                <div key={char.label} className="bg-[#141414] rounded-xl p-3 md:p-4 text-center border border-white/5">
                  <char.icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
                  <div className="text-xs text-white/40 mb-1">{char.label}</div>
                  <div className="text-sm text-white font-medium truncate" title={char.value}>{char.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">Описание</h3>
              <p className="text-white/70 leading-relaxed text-sm md:text-base">{property.description}</p>
            </div>

            {/* Infrastructure */}
            {infraItems.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-4">Инфраструктура</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {infraItems.map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-3 bg-[#141414] rounded-lg border border-white/5">
                      <item.icon className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="text-white text-sm font-medium">{item.label}</div>
                        <div className="text-white/50 text-xs break-words">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Manager & Application Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Manager Card */}
              <div className="bg-[#141414] rounded-2xl border border-white/5 p-5 md:p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Ваш менеджер</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center shrink-0">
                    <span className="text-[#D4AF37] font-bold text-lg">{managerInitials}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-medium">{managerName}</div>
                    <div className="text-white/50 text-sm">Менеджер по недвижимости</div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <a href={`tel:${managerPhone.replace(/[\s()-]/g, '')}`} className="flex items-center gap-2 text-white/60 text-sm hover:text-[#D4AF37] transition-colors">
                    <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{managerPhone}</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-white/60 text-sm hover:text-[#D4AF37] transition-colors">
                    <MessageCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Telegram</span>
                  </a>
                  <a href="#" className="flex items-center gap-2 text-white/60 text-sm hover:text-[#D4AF37] transition-colors">
                    <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </div>
                <Button
                  className="w-full bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-11"
                  onClick={() => setShowForm(!showForm)}
                >
                  Записаться на просмотр
                </Button>
              </div>

              {/* Application Form */}
              {showForm ? (
                <motion.form
                  className="bg-[#141414] rounded-2xl border border-white/5 p-5 md:p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleViewingSubmit}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Заявка на просмотр</h3>
                  <div className="space-y-3">
                    <Input placeholder="Ваше имя" className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30 h-11" required />
                    <Input placeholder="Телефон" type="tel" className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30 h-11" required />
                    <Textarea placeholder="Удобное время для просмотра" className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30 resize-none min-h-[80px]" />
                    <Button type="submit" className="w-full bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-11">
                      <Send className="w-4 h-4 mr-2" />
                      Отправить заявку
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <div className="bg-[#141414] rounded-2xl border border-white/5 p-5 md:p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4">
                    <MessageCircle className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Остались вопросы?</h4>
                  <p className="text-white/50 text-sm mb-4 max-w-[280px]">Запишитесь на просмотр, и наш менеджер ответит на все ваши вопросы</p>
                  <Button
                    variant="outline"
                    className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#F1D28A] font-medium"
                    onClick={() => setShowForm(true)}
                  >
                    Записаться на просмотр
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
