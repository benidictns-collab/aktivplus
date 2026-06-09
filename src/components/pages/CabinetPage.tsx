'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Phone, Heart, FileText, MessageCircle, Clock, Settings, LogOut, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

type CabinetView = 'login' | 'register' | 'client' | 'manager' | 'admin';

export default function CabinetPage() {
  const [view, setView] = useState<CabinetView>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('favorites');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setView('client');
    toast({ title: 'Добро пожаловать!', description: 'Вы вошли в личный кабинет' });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setView('client');
    toast({ title: 'Регистрация успешна!', description: 'Добро пожаловать в Актив Плюс' });
  };

  const clientTabs = [
    { id: 'favorites', label: 'Избранное', icon: Heart },
    { id: 'comparisons', label: 'Сравнения', icon: FileText },
    { id: 'applications', label: 'Заявки', icon: MessageCircle },
    { id: 'history', label: 'История', icon: Clock },
    { id: 'messages', label: 'Сообщения', icon: MessageCircle },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  if (view === 'login') {
    return (
      <div className="pt-20 min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h1 className="text-2xl font-bold text-white">Вход в личный кабинет</h1>
              <p className="text-white/50 mt-2">Введите данные для входа</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input placeholder="Email" type="email" className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" required />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input
                  placeholder="Пароль"
                  type={showPassword ? 'text' : 'password'}
                  className="pl-11 pr-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Button type="submit" className="w-full bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-12">
                Войти
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button onClick={() => setView('register')} className="text-[#D4AF37] text-sm hover:text-[#F1D28A]">
                Зарегистрироваться
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (view === 'register') {
    return (
      <div className="pt-20 min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Регистрация</h1>
              <p className="text-white/50 mt-2">Создайте личный кабинет</p>
            </div>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input placeholder="Имя" className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" required />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input placeholder="Email" type="email" className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" required />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input placeholder="Телефон" type="tel" className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" required />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input placeholder="Пароль" type="password" className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" required />
              </div>
              <Button type="submit" className="w-full bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-12">
                Зарегистрироваться
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button onClick={() => setView('login')} className="text-[#D4AF37] text-sm hover:text-[#F1D28A]">
                Уже есть аккаунт? Войти
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Личный кабинет</h1>
              <p className="text-white/50 mt-1">Добро пожаловать, Алексей</p>
            </div>
            <Button
              variant="outline"
              className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
              onClick={() => setView('login')}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-4 h-fit">
              <nav className="space-y-1">
                {clientTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 bg-[#141414] rounded-2xl border border-white/5 p-6 md:p-8">
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Избранное</h2>
                  <div className="text-center py-16">
                    <Heart className="w-16 h-16 text-white/10 mx-auto mb-4" />
                    <p className="text-white/40 text-lg">У вас пока нет избранных объектов</p>
                    <p className="text-white/30 text-sm mt-2">Добавляйте объекты в избранное, нажав на иконку сердца</p>
                  </div>
                </div>
              )}
              {activeTab === 'applications' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Мои заявки</h2>
                  <div className="text-center py-16">
                    <FileText className="w-16 h-16 text-white/10 mx-auto mb-4" />
                    <p className="text-white/40 text-lg">У вас пока нет заявок</p>
                  </div>
                </div>
              )}
              {activeTab === 'comparisons' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Сравнения</h2>
                  <div className="text-center py-16">
                    <p className="text-white/40 text-lg">Нет объектов для сравнения</p>
                  </div>
                </div>
              )}
              {activeTab === 'history' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">История просмотров</h2>
                  <div className="text-center py-16">
                    <Clock className="w-16 h-16 text-white/10 mx-auto mb-4" />
                    <p className="text-white/40 text-lg">История просмотров пуста</p>
                  </div>
                </div>
              )}
              {activeTab === 'messages' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Сообщения</h2>
                  <div className="text-center py-16">
                    <MessageCircle className="w-16 h-16 text-white/10 mx-auto mb-4" />
                    <p className="text-white/40 text-lg">Нет новых сообщений</p>
                  </div>
                </div>
              )}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Настройки</h2>
                  <div className="space-y-4 max-w-md">
                    <Input placeholder="Имя" className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] text-white" />
                    <Input placeholder="Email" className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] text-white" />
                    <Input placeholder="Телефон" className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] text-white" />
                    <Button className="bg-[#D4AF37] text-black hover:bg-[#F1D28A]">Сохранить</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
