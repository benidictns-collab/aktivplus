'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Lock, Mail, Phone, Heart, FileText, MessageCircle, Clock,
  Settings, LogOut, Eye, EyeOff, ShieldCheck, Users, BarChart3,
  MapPin, ChevronRight, Send, Trash2, CheckCircle, AlertCircle,
  Loader2, Building, Home, Key, Scale, Plus, Pencil, X, ImagePlus,
  Maximize, BedDouble, Car, PaintBucket, Sun, Calendar,
  GraduationCap, TreePine, ShoppingBag, Bus, ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useNavigationStore } from '@/store/navigation';

/* ─── Types ──────────────────────────────────────────────── */
interface ManagerInfo {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
}

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
  managerId: string;
  manager: ManagerInfo;
  createdAt: string;
  updatedAt: string;
}

interface UserData {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: string;
  avatar: string | null;
  createdAt: string;
  favorites: { id: string; propertyId: number; createdAt: string }[];
  applications: {
    id: string; type: string; status: string; propertyTitle: string | null;
    message: string | null; phone: string | null; createdAt: string; updatedAt: string;
  }[];
  messages: {
    id: string; fromManager: boolean; text: string; isRead: boolean; createdAt: string;
  }[];
  properties: PropertyDB[];
}

type CabinetView = 'login' | 'register' | 'dashboard';
type TabId = 'favorites' | 'applications' | 'messages' | 'settings' | 'properties' | 'admin';

/* ─── Status helpers ─────────────────────────────────────── */
const statusLabel: Record<string, string> = {
  new: 'Новая',
  in_progress: 'В работе',
  completed: 'Завершена',
  cancelled: 'Отменена',
};
const statusColor: Record<string, string> = {
  new: 'bg-[#D4AF37]/20 text-[#D4AF37]',
  in_progress: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
};
const typeLabel: Record<string, string> = {
  purchase: 'Покупка',
  sale: 'Продажа',
  rent: 'Аренда',
  consultation: 'Консультация',
};
const typeIcon: Record<string, React.ElementType> = {
  purchase: Home,
  sale: Building,
  rent: Key,
  consultation: Scale,
};

/* ─── Step form data ─────────────────────────────────────── */
interface PropertyFormData {
  title: string;
  price: string;
  area: string;
  rooms: string;
  district: string;
  type: string;
  dealType: string;
  status: string;
  description: string;
  address: string;
  images: string[];
  floor: string;
  parking: string;
  renovation: string;
  balcony: string;
  year: string;
  schools: string;
  gardens: string;
  shops: string;
  transport: string;
  parks: string;
  medicine: string;
}

const emptyForm: PropertyFormData = {
  title: '',
  price: '',
  area: '',
  rooms: '',
  district: '',
  type: 'Квартира',
  dealType: 'sale',
  status: 'Продажа',
  description: '',
  address: '',
  images: [],
  floor: '',
  parking: '',
  renovation: '',
  balcony: '',
  year: '',
  schools: '',
  gardens: '',
  shops: '',
  transport: '',
  parks: '',
  medicine: '',
};

const STEPS = [
  { id: 1, label: 'Основная информация', icon: Home },
  { id: 2, label: 'Характеристики', icon: Building },
  { id: 3, label: 'Описание', icon: FileText },
  { id: 4, label: 'Инфраструктура', icon: MapPin },
];

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function CabinetPage() {
  const [view, setView] = useState<CabinetView>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('favorites');
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const { toast } = useToast();
  const { navigate } = useNavigationStore();

  // Form fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Settings fields
  const [settingsName, setSettingsName] = useState('');
  const [settingsPhone, setSettingsPhone] = useState('');
  const [settingsEmail, setSettingsEmail] = useState('');

  // Message input
  const [messageText, setMessageText] = useState('');

  // Admin data
  const [adminData, setAdminData] = useState<{
    users: any[];
    applications: any[];
    messages: any[];
    properties: PropertyDB[];
  } | null>(null);

  // Property form
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<PropertyFormData>(emptyForm);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [editingProperty, setEditingProperty] = useState<PropertyDB | null>(null);

  // All properties (for catalog integration)
  const [allProperties, setAllProperties] = useState<PropertyDB[]>([]);

  /* ─── Check session on mount ────────────────────────── */
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setSettingsName(data.user.name || '');
        setSettingsPhone(data.user.phone || '');
        setSettingsEmail(data.user.email || '');
        setView('dashboard');
        // Set default tab based on role
        if (data.user.role === 'manager') {
          setActiveTab('properties');
        } else if (data.user.role === 'admin') {
          setActiveTab('admin');
        }
      }
    } catch {}
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  /* ─── Fetch all properties for admin ──────────────────── */
  const fetchAllProperties = useCallback(async () => {
    try {
      const res = await fetch('/api/properties');
      if (res.ok) {
        const data = await res.json();
        setAllProperties(data.properties);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (user?.role === 'admin' && activeTab === 'properties') {
      fetchAllProperties();
    }
  }, [user?.role, activeTab, fetchAllProperties]);

  /* ─── Login ─────────────────────────────────────────── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Ошибка входа');
        return;
      }
      setUser(data.user);
      setSettingsName(data.user.name || '');
      setSettingsPhone(data.user.phone || '');
      setSettingsEmail(data.user.email || '');
      setView('dashboard');
      if (data.user.role === 'manager') setActiveTab('properties');
      else if (data.user.role === 'admin') setActiveTab('admin');
      toast({ title: 'Добро пожаловать!', description: `Вы вошли как ${data.user.name || data.user.email}` });
    } catch {
      setLoginError('Ошибка соединения');
    } finally {
      setIsLoading(false);
    }
  };

  /* ─── Register ──────────────────────────────────────── */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail, phone: regPhone, password: regPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRegisterError(data.error || 'Ошибка регистрации');
        return;
      }
      setUser(data.user);
      setSettingsName(data.user.name || '');
      setSettingsPhone(data.user.phone || '');
      setSettingsEmail(data.user.email || '');
      setView('dashboard');
      toast({ title: 'Регистрация успешна!', description: 'Добро пожаловать в Актив Плюс' });
    } catch {
      setRegisterError('Ошибка соединения');
    } finally {
      setIsLoading(false);
    }
  };

  /* ─── Logout ────────────────────────────────────────── */
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setView('login');
    setLoginEmail('');
    setLoginPassword('');
    toast({ title: 'Вы вышли из системы' });
  };

  /* ─── Save settings ─────────────────────────────────── */
  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: settingsName, phone: settingsPhone, email: settingsEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(prev => prev ? { ...prev, ...data.user } : null);
        toast({ title: 'Профиль обновлён' });
      } else {
        toast({ title: 'Ошибка', description: data.error, variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Ошибка соединения', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  /* ─── Toggle favorite ───────────────────────────────── */
  const toggleFavorite = async (propertyId: number) => {
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(prev => {
          if (!prev) return prev;
          if (data.isFavorite) {
            return { ...prev, favorites: [{ id: 'new', propertyId, createdAt: new Date().toISOString() }, ...prev.favorites] };
          }
          return { ...prev, favorites: prev.favorites.filter(f => f.propertyId !== propertyId) };
        });
      }
    } catch {}
  };

  /* ─── Send message ──────────────────────────────────── */
  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageText }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(prev => prev ? { ...prev, messages: [data.message, ...prev.messages] } : null);
        setMessageText('');
        toast({ title: 'Сообщение отправлено' });
      }
    } catch {}
  };

  /* ─── Fetch admin data ──────────────────────────────── */
  useEffect(() => {
    if (user?.role === 'admin' && activeTab === 'admin') {
      fetch('/api/admin').then(r => r.json()).then(data => {
        if (data.users) setAdminData(data);
      }).catch(() => {});
    }
  }, [user?.role, activeTab]);

  /* ─── Property form helpers ──────────────────────────── */
  const updateForm = (field: keyof PropertyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({ ...prev, images: [...prev.images, newImageUrl.trim()] }));
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setFormStep(1);
    setEditingProperty(null);
    setNewImageUrl('');
    setShowPropertyForm(false);
  };

  const startEditProperty = (prop: PropertyDB) => {
    setEditingProperty(prop);
    setShowPropertyForm(true);
    setFormData({
      title: prop.title,
      price: prop.price,
      area: prop.area,
      rooms: prop.rooms,
      district: prop.district,
      type: prop.type,
      dealType: prop.dealType,
      status: prop.status,
      description: prop.description,
      address: prop.address,
      images: prop.images,
      floor: prop.floor || '',
      parking: prop.parking || '',
      renovation: prop.renovation || '',
      balcony: prop.balcony || '',
      year: prop.year || '',
      schools: prop.schools,
      gardens: prop.gardens,
      shops: prop.shops,
      transport: prop.transport,
      parks: prop.parks,
      medicine: prop.medicine,
    });
    setFormStep(1);
  };

  const handleSaveProperty = async () => {
    setIsLoading(true);
    try {
      if (editingProperty) {
        // Update
        const res = await fetch(`/api/properties/${editingProperty.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const data = await res.json();
          // Update in local state
          setUser(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              properties: prev.properties.map(p => p.id === editingProperty.id ? data.property : p),
            };
          });
          toast({ title: 'Объект обновлён' });
          resetForm();
        } else {
          const data = await res.json();
          toast({ title: 'Ошибка', description: data.error, variant: 'destructive' });
        }
      } else {
        // Create
        const res = await fetch('/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const data = await res.json();
          setUser(prev => prev ? { ...prev, properties: [data.property, ...prev.properties] } : null);
          toast({ title: 'Объект добавлен!', description: 'Карточка появится в каталоге с вашим именем' });
          resetForm();
        } else {
          const data = await res.json();
          toast({ title: 'Ошибка', description: data.error, variant: 'destructive' });
        }
      }
    } catch {
      toast({ title: 'Ошибка соединения', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProperty = async (id: number) => {
    if (!confirm('Удалить объект?')) return;
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUser(prev => prev ? { ...prev, properties: prev.properties.filter(p => p.id !== id) } : null);
        setAllProperties(prev => prev.filter(p => p.id !== id));
        toast({ title: 'Объект удалён' });
      }
    } catch {}
  };

  /* ─── Tabs config ───────────────────────────────────── */
  const clientTabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'favorites', label: 'Избранное', icon: Heart },
    { id: 'applications', label: 'Мои заявки', icon: FileText },
    { id: 'messages', label: 'Сообщения', icon: MessageCircle },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  if (user?.role === 'manager') {
    clientTabs.unshift({ id: 'properties', label: 'Мои объекты', icon: Building });
  }

  if (user?.role === 'admin') {
    clientTabs.unshift({ id: 'properties', label: 'Все объекты', icon: Building });
    clientTabs.push({ id: 'admin', label: 'Управление', icon: ShieldCheck });
  }

  /* ═══════════════════════════════════════════════════════
     LOGIN VIEW
     ═══════════════════════════════════════════════════════ */
  if (view === 'login') {
    return (
      <div className="pt-20 min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h1 className="text-2xl font-bold text-white">Вход в личный кабинет</h1>
              <p className="text-white/50 mt-2">Введите данные для входа</p>
            </div>
            {loginError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" /> {loginError}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input
                  placeholder="Email"
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input
                  placeholder="Пароль"
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="pl-11 pr-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Button type="submit" disabled={isLoading}
                className="w-full bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-12">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Войти'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button onClick={() => { setView('register'); setLoginError(''); }}
                className="text-[#D4AF37] text-sm hover:text-[#F1D28A]">
                Зарегистрироваться
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     REGISTER VIEW
     ═══════════════════════════════════════════════════════ */
  if (view === 'register') {
    return (
      <div className="pt-20 min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white">Регистрация</h1>
              <p className="text-white/50 mt-2">Создайте личный кабинет</p>
            </div>
            {registerError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" /> {registerError}
              </div>
            )}
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input placeholder="Имя" value={regName} onChange={e => setRegName(e.target.value)}
                  className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" required />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input placeholder="Email" type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)}
                  className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" required />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input placeholder="Телефон" type="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)}
                  className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" required />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <Input placeholder="Пароль (мин. 6 символов)" type="password" value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-12 text-white placeholder:text-white/30" required />
              </div>
              <Button type="submit" disabled={isLoading}
                className="w-full bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-12">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Зарегистрироваться'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button onClick={() => { setView('login'); setRegisterError(''); }}
                className="text-[#D4AF37] text-sm hover:text-[#F1D28A]">
                Уже есть аккаунт? Войти
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════
     DASHBOARD VIEW
     ═══════════════════════════════════════════════════════ */
  if (!user) return null;

  const roleLabel = user.role === 'admin' ? 'Администратор' : user.role === 'manager' ? 'Менеджер' : 'Клиент';
  const roleBadgeColor = user.role === 'admin' ? 'bg-red-500/20 text-red-400' : user.role === 'manager' ? 'bg-blue-500/20 text-blue-400' : 'bg-[#D4AF37]/20 text-[#D4AF37]';

  const displayProperties = user.role === 'admin' ? allProperties : (user.properties || []);

  return (
    <div className="pt-20 min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center">
                <span className="text-[#D4AF37] font-bold text-lg">
                  {(user.name || user.email)[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {user.name || 'Пользователь'}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadgeColor}`}>
                    {roleLabel}
                  </span>
                  <span className="text-white/40 text-sm">{user.email}</span>
                </div>
              </div>
            </div>
            <Button variant="outline"
              className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
              onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Выйти
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* ── Sidebar ── */}
            <div className="bg-[#141414] rounded-2xl border border-white/5 p-4 h-fit lg:sticky lg:top-24">
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
                    {tab.id === 'favorites' && user.favorites.length > 0 && (
                      <span className="ml-auto text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded-full">
                        {user.favorites.length}
                      </span>
                    )}
                    {tab.id === 'applications' && user.applications.length > 0 && (
                      <span className="ml-auto text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded-full">
                        {user.applications.length}
                      </span>
                    )}
                    {tab.id === 'properties' && displayProperties.length > 0 && (
                      <span className="ml-auto text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded-full">
                        {displayProperties.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* ── Content ── */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#141414] rounded-2xl border border-white/5 p-6 md:p-8"
                >
                  {/* ═══════════════════════════════════════
                      PROPERTIES TAB (Manager & Admin)
                     ═══════════════════════════════════════ */}
                  {activeTab === 'properties' && (user.role === 'manager' || user.role === 'admin') && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">
                          {user.role === 'admin' ? 'Все объекты' : 'Мои объекты'}
                        </h2>
                        {(user.role === 'manager' || user.role === 'admin') && (
                          <Button
                            onClick={() => {
                              setFormData(emptyForm);
                              setEditingProperty(null);
                              setFormStep(1);
                              setNewImageUrl('');
                              setShowPropertyForm(true);
                            }}
                            className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold"
                            disabled={showPropertyForm && !editingProperty}
                          >
                            <Plus className="w-4 h-4 mr-2" /> Добавить объект
                          </Button>
                        )}
                      </div>

                      {/* Step-by-step form */}
                      {showPropertyForm ? (
                        <div className="mb-8 bg-[#0B0B0B] rounded-2xl border border-[#D4AF37]/20 p-6">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white">
                              {editingProperty ? 'Редактирование объекта' : 'Добавление объекта'}
                            </h3>
                            <button onClick={resetForm} className="text-white/40 hover:text-white">
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Steps indicator */}
                          <div className="flex items-center gap-2 mb-8">
                            {STEPS.map((step, idx) => (
                              <React.Fragment key={step.id}>
                                <button
                                  onClick={() => setFormStep(step.id)}
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    formStep === step.id
                                      ? 'bg-[#D4AF37] text-black'
                                      : formStep > step.id
                                      ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                                      : 'bg-white/5 text-white/40'
                                  }`}
                                >
                                  <step.icon className="w-4 h-4" />
                                  <span className="hidden sm:inline">{step.label}</span>
                                  <span className="sm:hidden">{step.id}</span>
                                </button>
                                {idx < STEPS.length - 1 && (
                                  <ChevronRight className="w-4 h-4 text-white/20" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>

                          {/* Step 1: Basic Info */}
                          {formStep === 1 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Название объекта *</label>
                                  <Input value={formData.title} onChange={e => updateForm('title', e.target.value)}
                                    placeholder="Пентхаус на Набережной"
                                    className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Цена *</label>
                                  <Input value={formData.price} onChange={e => updateForm('price', e.target.value)}
                                    placeholder="45 000 000 ₽"
                                    className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Адрес *</label>
                                  <Input value={formData.address} onChange={e => updateForm('address', e.target.value)}
                                    placeholder="ул. Набережная, 45"
                                    className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Район *</label>
                                  <Input value={formData.district} onChange={e => updateForm('district', e.target.value)}
                                    placeholder="Ворошиловский"
                                    className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Тип недвижимости *</label>
                                  <select value={formData.type} onChange={e => updateForm('type', e.target.value)}
                                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#D4AF37] focus:outline-none">
                                    <option value="Квартира">Квартира</option>
                                    <option value="Дом">Дом</option>
                                    <option value="Таунхаус">Таунхаус</option>
                                    <option value="Участок">Участок</option>
                                    <option value="Коммерческая">Коммерческая</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Тип сделки</label>
                                  <select value={formData.dealType} onChange={e => updateForm('dealType', e.target.value)}
                                    className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#D4AF37] focus:outline-none">
                                    <option value="sale">Продажа</option>
                                    <option value="rent">Аренда</option>
                                  </select>
                                </div>
                              </div>

                              {/* Images */}
                              <div>
                                <label className="text-white/50 text-sm mb-1.5 block">Изображения</label>
                                <div className="flex gap-2 mb-3">
                                  <Input value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)}
                                    placeholder="URL изображения"
                                    className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30"
                                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImage(); } }} />
                                  <Button onClick={addImage} variant="outline"
                                    className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black shrink-0">
                                    <ImagePlus className="w-4 h-4" />
                                  </Button>
                                </div>
                                {formData.images.length > 0 && (
                                  <div className="flex gap-2 flex-wrap">
                                    {formData.images.map((img, i) => (
                                      <div key={i} className="relative w-20 h-16 rounded-lg overflow-hidden group">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                        <button onClick={() => removeImage(i)}
                                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                          <X className="w-4 h-4 text-white" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}

                          {/* Step 2: Characteristics */}
                          {formStep === 2 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Площадь *</label>
                                  <div className="relative">
                                    <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
                                    <Input value={formData.area} onChange={e => updateForm('area', e.target.value)}
                                      placeholder="180 м²" className="pl-10 bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Комнат *</label>
                                  <div className="relative">
                                    <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
                                    <Input value={formData.rooms} onChange={e => updateForm('rooms', e.target.value)}
                                      placeholder="4 комнаты" className="pl-10 bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Этаж</label>
                                  <div className="relative">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
                                    <Input value={formData.floor} onChange={e => updateForm('floor', e.target.value)}
                                      placeholder="25/25" className="pl-10 bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Парковка</label>
                                  <div className="relative">
                                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
                                    <Input value={formData.parking} onChange={e => updateForm('parking', e.target.value)}
                                      placeholder="2 машиноместа" className="pl-10 bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Отделка</label>
                                  <div className="relative">
                                    <PaintBucket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
                                    <Input value={formData.renovation} onChange={e => updateForm('renovation', e.target.value)}
                                      placeholder="Авторский" className="pl-10 bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Балкон</label>
                                  <div className="relative">
                                    <Sun className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
                                    <Input value={formData.balcony} onChange={e => updateForm('balcony', e.target.value)}
                                      placeholder="3 лоджии" className="pl-10 bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                  </div>
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block">Год постройки</label>
                                  <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
                                    <Input value={formData.year} onChange={e => updateForm('year', e.target.value)}
                                      placeholder="2022" className="pl-10 bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Step 3: Description */}
                          {formStep === 3 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                              <div>
                                <label className="text-white/50 text-sm mb-1.5 block">Описание объекта *</label>
                                <Textarea value={formData.description} onChange={e => updateForm('description', e.target.value)}
                                  placeholder="Подробное описание объекта недвижимости..."
                                  className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30 min-h-[200px] resize-y" />
                              </div>
                            </motion.div>
                          )}

                          {/* Step 4: Infrastructure */}
                          {formStep === 4 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4 text-[#D4AF37]" /> Школы
                                  </label>
                                  <Input value={formData.schools} onChange={e => updateForm('schools', e.target.value)}
                                    placeholder="Школа №5 — 500м" className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block flex items-center gap-2">
                                    <TreePine className="w-4 h-4 text-[#D4AF37]" /> Детские сады
                                  </label>
                                  <Input value={formData.gardens} onChange={e => updateForm('gardens', e.target.value)}
                                    placeholder="Детский сад «Солнышко» — 300м" className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block flex items-center gap-2">
                                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" /> Магазины
                                  </label>
                                  <Input value={formData.shops} onChange={e => updateForm('shops', e.target.value)}
                                    placeholder="ТРЦ «Мега» — 800м" className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block flex items-center gap-2">
                                    <Bus className="w-4 h-4 text-[#D4AF37]" /> Транспорт
                                  </label>
                                  <Input value={formData.transport} onChange={e => updateForm('transport', e.target.value)}
                                    placeholder="Автобусная остановка — 100м" className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block flex items-center gap-2">
                                    <TreePine className="w-4 h-4 text-[#D4AF37]" /> Парки
                                  </label>
                                  <Input value={formData.parks} onChange={e => updateForm('parks', e.target.value)}
                                    placeholder="Парк им. Горького — 600м" className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                </div>
                                <div>
                                  <label className="text-white/50 text-sm mb-1.5 block flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-[#D4AF37]" /> Медицина
                                  </label>
                                  <Input value={formData.medicine} onChange={e => updateForm('medicine', e.target.value)}
                                    placeholder="Городская больница №1 — 1.2км" className="bg-[#141414] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30" />
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* Navigation buttons */}
                          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                            <Button
                              variant="outline"
                              onClick={() => setFormStep(prev => Math.max(1, prev - 1))}
                              disabled={formStep === 1}
                              className="border-white/10 text-white/60 hover:text-white hover:bg-white/5"
                            >
                              <ChevronLeft className="w-4 h-4 mr-1" /> Назад
                            </Button>
                            {formStep < 4 ? (
                              <Button
                                onClick={() => setFormStep(prev => Math.min(4, prev + 1))}
                                className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold"
                              >
                                Далее <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            ) : (
                              <Button
                                onClick={handleSaveProperty}
                                disabled={isLoading}
                                className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold"
                              >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                                {editingProperty ? 'Сохранить изменения' : 'Добавить объект'}
                              </Button>
                            )}
                          </div>
                        </div>
                      ) : null}

                      {/* Properties list */}
                      {displayProperties.length === 0 && !showPropertyForm ? (
                        <div className="text-center py-16">
                          <Building className="w-16 h-16 text-white/10 mx-auto mb-4" />
                          <p className="text-white/40 text-lg">Нет объектов</p>
                          <p className="text-white/30 text-sm mt-2">Добавьте первый объект, нажав кнопку выше</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {displayProperties.map(prop => (
                            <div key={prop.id}
                              className="flex items-start gap-4 p-4 rounded-xl bg-[#0B0B0B] border border-white/5 hover:border-[#D4AF37]/20 transition-all">
                              {/* Thumbnail */}
                              {prop.images && prop.images.length > 0 ? (
                                <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0">
                                  <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                                </div>
                              ) : (
                                <div className="w-20 h-16 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                  <Building className="w-6 h-6 text-white/20" />
                                </div>
                              )}
                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h3 className="text-white font-medium text-sm">{prop.title}</h3>
                                    <p className="text-[#D4AF37] font-bold text-sm mt-0.5">{prop.price}</p>
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0">
                                    <button onClick={() => startEditProperty(prop)}
                                      className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-[#D4AF37] transition-colors">
                                      <Pencil className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDeleteProperty(prop.id)}
                                      className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-red-400 transition-colors">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 text-white/40 text-xs mt-1">
                                  <span>{prop.district}</span>
                                  <span>{prop.area}</span>
                                  <span>{prop.rooms}</span>
                                  <span>{prop.type}</span>
                                </div>
                                {user.role === 'admin' && prop.manager && (
                                  <div className="flex items-center gap-1.5 text-xs mt-1.5">
                                    <User className="w-3 h-3 text-[#D4AF37]" />
                                    <span className="text-[#D4AF37]/80">Менеджер: {prop.manager.name || prop.manager.email}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── FAVORITES ── */}
                  {activeTab === 'favorites' && (
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-6">Избранное</h2>
                      {user.favorites.length === 0 ? (
                        <div className="text-center py-16">
                          <Heart className="w-16 h-16 text-white/10 mx-auto mb-4" />
                          <p className="text-white/40 text-lg">У вас пока нет избранных объектов</p>
                          <p className="text-white/30 text-sm mt-2">Добавляйте объекты в избранное, нажав на иконку сердца</p>
                          <Button className="mt-6 bg-[#D4AF37] text-black hover:bg-[#F1D28A]"
                            onClick={() => navigate('catalog')}>
                            Смотреть каталог
                          </Button>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                          {user.favorites.map(fav => (
                            <div key={fav.id}
                              className="group flex gap-4 p-4 rounded-xl bg-[#0B0B0B] border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer"
                              onClick={() => navigate('catalog')}>
                              <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 bg-white/5 flex items-center justify-center">
                                <Building className="w-6 h-6 text-white/20" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-white font-medium text-sm truncate">Объект #{fav.propertyId}</h3>
                                <button onClick={e => { e.stopPropagation(); toggleFavorite(fav.propertyId); }}
                                  className="text-[#D4AF37] hover:text-red-400 transition-colors mt-1">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── APPLICATIONS ── */}
                  {activeTab === 'applications' && (
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-6">Мои заявки</h2>
                      {user.applications.length === 0 ? (
                        <div className="text-center py-16">
                          <FileText className="w-16 h-16 text-white/10 mx-auto mb-4" />
                          <p className="text-white/40 text-lg">У вас пока нет заявок</p>
                          <Button className="mt-6 bg-[#D4AF37] text-black hover:bg-[#F1D28A]"
                            onClick={() => navigate('services')}>
                            Оставить заявку
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {user.applications.map(app => {
                            const Icon = typeIcon[app.type] || FileText;
                            return (
                              <div key={app.id}
                                className="flex items-start gap-4 p-4 rounded-xl bg-[#0B0B0B] border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-white font-medium text-sm">
                                      {typeLabel[app.type] || app.type}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[app.status] || 'bg-white/10 text-white/50'}`}>
                                      {statusLabel[app.status] || app.status}
                                    </span>
                                  </div>
                                  {app.propertyTitle && (
                                    <p className="text-white/60 text-sm mt-1">{app.propertyTitle}</p>
                                  )}
                                  {app.message && (
                                    <p className="text-white/40 text-xs mt-1">{app.message}</p>
                                  )}
                                  <p className="text-white/30 text-xs mt-2">
                                    {new Date(app.createdAt).toLocaleDateString('ru-RU', {
                                      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── MESSAGES ── */}
                  {activeTab === 'messages' && (
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-6">Сообщения</h2>
                      <div className="flex flex-col h-[500px]">
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                          {user.messages.length === 0 ? (
                            <div className="text-center py-16">
                              <MessageCircle className="w-16 h-16 text-white/10 mx-auto mb-4" />
                              <p className="text-white/40 text-lg">Нет сообщений</p>
                              <p className="text-white/30 text-sm mt-2">Напишите нам, и мы ответим в ближайшее время</p>
                            </div>
                          ) : (
                            user.messages.map(msg => (
                              <div key={msg.id}
                                className={`flex ${msg.fromManager ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                  msg.fromManager
                                    ? 'bg-[#1E1E1E] text-white/80 rounded-bl-md'
                                    : 'bg-[#D4AF37] text-black rounded-br-md'
                                }`}>
                                  <p className="text-sm">{msg.text}</p>
                                  <p className={`text-xs mt-1 ${msg.fromManager ? 'text-white/30' : 'text-black/50'}`}>
                                    {new Date(msg.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-white/5">
                          <Textarea
                            placeholder="Введите сообщение..."
                            value={messageText}
                            onChange={e => setMessageText(e.target.value)}
                            className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] text-white placeholder:text-white/30 resize-none min-h-[44px] max-h-32"
                            rows={1}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                          />
                          <Button onClick={handleSendMessage}
                            className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] shrink-0 h-11 w-11 p-0"
                            disabled={!messageText.trim()}>
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── SETTINGS ── */}
                  {activeTab === 'settings' && (
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-6">Настройки профиля</h2>
                      <div className="space-y-5 max-w-md">
                        <div>
                          <label className="text-white/50 text-sm mb-1.5 block">Имя</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                            <Input value={settingsName} onChange={e => setSettingsName(e.target.value)}
                              className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] text-white" />
                          </div>
                        </div>
                        <div>
                          <label className="text-white/50 text-sm mb-1.5 block">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                            <Input value={settingsEmail} onChange={e => setSettingsEmail(e.target.value)}
                              type="email"
                              className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] text-white" />
                          </div>
                        </div>
                        <div>
                          <label className="text-white/50 text-sm mb-1.5 block">Телефон</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                            <Input value={settingsPhone} onChange={e => setSettingsPhone(e.target.value)}
                              type="tel"
                              className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] text-white" />
                          </div>
                        </div>
                        <div>
                          <label className="text-white/50 text-sm mb-1.5 block">Роль</label>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleBadgeColor}`}>
                              {roleLabel}
                            </span>
                            <span className="text-white/30 text-xs">Роль назначается администратором</span>
                          </div>
                        </div>
                        <Button onClick={handleSaveSettings} disabled={isLoading}
                          className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold">
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                          Сохранить изменения
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* ── ADMIN PANEL ── */}
                  {activeTab === 'admin' && user.role === 'admin' && (
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-[#D4AF37]" /> Панель администратора
                      </h2>
                      {!adminData ? (
                        <div className="text-center py-16">
                          <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto" />
                        </div>
                      ) : (
                        <div className="space-y-8">
                          {/* Stats */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-[#0B0B0B] rounded-xl p-5 border border-white/5">
                              <Users className="w-6 h-6 text-[#D4AF37] mb-2" />
                              <p className="text-2xl font-bold text-white">{adminData.users.length}</p>
                              <p className="text-white/50 text-sm">Пользователей</p>
                            </div>
                            <div className="bg-[#0B0B0B] rounded-xl p-5 border border-white/5">
                              <FileText className="w-6 h-6 text-[#D4AF37] mb-2" />
                              <p className="text-2xl font-bold text-white">{adminData.applications.length}</p>
                              <p className="text-white/50 text-sm">Заявок</p>
                            </div>
                            <div className="bg-[#0B0B0B] rounded-xl p-5 border border-white/5">
                              <MessageCircle className="w-6 h-6 text-[#D4AF37] mb-2" />
                              <p className="text-2xl font-bold text-white">{adminData.messages.length}</p>
                              <p className="text-white/50 text-sm">Сообщений</p>
                            </div>
                            <div className="bg-[#0B0B0B] rounded-xl p-5 border border-white/5">
                              <Building className="w-6 h-6 text-[#D4AF37] mb-2" />
                              <p className="text-2xl font-bold text-white">{adminData.properties?.length || 0}</p>
                              <p className="text-white/50 text-sm">Объектов</p>
                            </div>
                          </div>

                          {/* Users table */}
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Пользователи</h3>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b border-white/10">
                                    <th className="text-left text-white/50 py-3 px-2">Имя</th>
                                    <th className="text-left text-white/50 py-3 px-2">Email</th>
                                    <th className="text-left text-white/50 py-3 px-2">Роль</th>
                                    <th className="text-left text-white/50 py-3 px-2">Дата</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {adminData.users.map(u => (
                                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                                      <td className="py-3 px-2 text-white">{u.name || '—'}</td>
                                      <td className="py-3 px-2 text-white/70">{u.email}</td>
                                      <td className="py-3 px-2">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                          u.role === 'admin' ? 'bg-red-500/20 text-red-400'
                                            : u.role === 'manager' ? 'bg-blue-500/20 text-blue-400'
                                            : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                                        }`}>
                                          {u.role === 'admin' ? 'Админ' : u.role === 'manager' ? 'Менеджер' : 'Клиент'}
                                        </span>
                                      </td>
                                      <td className="py-3 px-2 text-white/40">
                                        {new Date(u.createdAt).toLocaleDateString('ru-RU')}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Applications */}
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Заявки</h3>
                            {adminData.applications.length === 0 ? (
                              <p className="text-white/40">Нет заявок</p>
                            ) : (
                              <div className="space-y-2">
                                {adminData.applications.map((app: any) => (
                                  <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#0B0B0B] border border-white/5">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[app.status] || 'bg-white/10 text-white/50'}`}>
                                      {statusLabel[app.status] || app.status}
                                    </span>
                                    <span className="text-white/70 text-sm flex-1">
                                      {typeLabel[app.type] || app.type} — {app.user?.name || app.user?.email}
                                    </span>
                                    <span className="text-white/30 text-xs">
                                      {new Date(app.createdAt).toLocaleDateString('ru-RU')}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
