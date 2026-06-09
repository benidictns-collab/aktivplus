'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, FileText, Eye, TrendingUp, BarChart3, Activity, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { name: 'Янв', заявки: 45, просмотры: 120 },
  { name: 'Фев', заявки: 52, просмотры: 145 },
  { name: 'Мар', заявки: 61, просмотры: 180 },
  { name: 'Апр', заявки: 58, просмотры: 165 },
  { name: 'Май', заявки: 70, просмотры: 210 },
  { name: 'Июн', заявки: 78, просмотры: 240 },
  { name: 'Июл', заявки: 85, просмотры: 255 },
  { name: 'Авг', заявки: 72, просмотры: 230 },
  { name: 'Сен', заявки: 90, просмотры: 270 },
  { name: 'Окт', заявки: 95, просмотры: 290 },
  { name: 'Ноя', заявки: 88, просмотры: 275 },
  { name: 'Дек', заявки: 102, просмотры: 320 },
];

const salesData = [
  { name: 'Квартиры', value: 45 },
  { name: 'Дома', value: 25 },
  { name: 'Коммерческая', value: 15 },
  { name: 'Новостройки', value: 15 },
];

const COLORS = ['#D4AF37', '#F1D28A', '#8B7225', '#A0A0A0'];

const stats = [
  { icon: Building, label: 'Всего объектов', value: '524', change: '+12%' },
  { icon: Eye, label: 'Активные объекты', value: '187', change: '+5%' },
  { icon: Users, label: 'Менеджеры', value: '28', change: '+3' },
  { icon: FileText, label: 'Заявки', value: '156', change: '+24%' },
  { icon: TrendingUp, label: 'Новые запросы', value: '89', change: '+18%' },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#141414] border border-[#D4AF37]/20 rounded-lg p-3 shadow-lg">
        <p className="text-white text-sm font-medium mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Панель управления</h1>
              <p className="text-white/50 mt-1">Обзор ключевых показателей</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-[#141414] rounded-2xl border border-white/5 p-4 md:p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <span className="text-green-400 text-xs flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/40 text-xs mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Applications Dynamics */}
            <motion.div
              className="lg:col-span-2 bg-[#141414] rounded-2xl border border-white/5 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Динамика заявок</h3>
                <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: '#A0A0A0', fontSize: 12 }} axisLine={false} />
                  <YAxis tick={{ fill: '#A0A0A0', fontSize: 12 }} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="заявки" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="просмотры" fill="#F1D28A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Sales by Type */}
            <motion.div
              className="bg-[#141414] rounded-2xl border border-white/5 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">Продажи по типам</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={salesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {salesData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {salesData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-white/60">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Views Chart */}
          <motion.div
            className="bg-[#141414] rounded-2xl border border-white/5 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Просмотры объектов</h3>
              <Activity className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: '#A0A0A0', fontSize: 12 }} axisLine={false} />
                <YAxis tick={{ fill: '#A0A0A0', fontSize: 12 }} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="просмотры" stroke="#D4AF37" strokeWidth={2} dot={{ fill: '#D4AF37', r: 4 }} />
                <Line type="monotone" dataKey="заявки" stroke="#F1D28A" strokeWidth={2} dot={{ fill: '#F1D28A', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
