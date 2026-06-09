'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Maximize, BedDouble, Heart, SlidersHorizontal, Grid3X3, List, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { properties, type Property } from '@/lib/data';
import { useNavigationStore } from '@/store/navigation';

type DealType = 'all' | 'sale' | 'rent';
type PropertyType = 'all' | 'apartment' | 'house' | 'townhouse' | 'land' | 'commercial' | 'newbuild';
type SortType = 'price-asc' | 'price-desc' | 'date' | 'popularity';

const propertyTypeLabels: Record<string, string> = {
  Квартира: 'apartment',
  Дом: 'house',
  Таунхаус: 'townhouse',
};

export default function CatalogPage() {
  const { openPropertyModal } = useNavigationStore();
  const [dealType, setDealType] = useState<DealType>('all');
  const [propertyType, setPropertyType] = useState<PropertyType>('all');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [areaFrom, setAreaFrom] = useState('');
  const [areaTo, setAreaTo] = useState('');
  const [roomsCount, setRoomsCount] = useState<string>('all');
  const [district, setDistrict] = useState<string>('all');
  const [sort, setSort] = useState<SortType>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const districts = [...new Set(properties.map((p) => p.district))];

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Filter by property type
    if (propertyType !== 'all') {
      result = result.filter((p) => propertyTypeLabels[p.type] === propertyType);
    }

    // Filter by rooms
    if (roomsCount !== 'all') {
      result = result.filter((p) => {
        if (roomsCount === 'studio') return p.rooms === 'Студия';
        if (roomsCount === '4+') return parseInt(p.rooms) >= 4;
        return p.rooms.includes(roomsCount);
      });
    }

    // Filter by district
    if (district !== 'all') {
      result = result.filter((p) => p.district === district);
    }

    return result;
  }, [dealType, propertyType, priceFrom, priceTo, areaFrom, areaTo, roomsCount, district, sort]);

  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="relative py-16 md:py-24 bg-[#0B0B0B] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
            alt="Каталог"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">Каталог</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Каталог <span className="gold-text">объектов</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-8 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-white/50 text-sm">Найдено: {filteredProperties.length}</span>
              <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-[#D4AF37] text-black' : 'text-white/50 hover:text-white'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-[#D4AF37] text-black' : 'text-white/50 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              className="bg-[#141414] rounded-2xl border border-white/5 p-6 mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Параметры поиска</h3>
                <button onClick={() => setShowFilters(false)} className="text-white/40 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Deal Type */}
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Тип сделки</label>
                  <div className="flex gap-2">
                    {(['all', 'sale', 'rent'] as DealType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setDealType(type)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          dealType === type
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-[#0B0B0B] text-white/60 hover:text-white border border-white/10'
                        }`}
                      >
                        {type === 'all' ? 'Все' : type === 'sale' ? 'Покупка' : 'Аренда'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Тип недвижимости</label>
                  <div className="flex flex-wrap gap-2">
                    {([
                      { value: 'all', label: 'Все' },
                      { value: 'apartment', label: 'Квартира' },
                      { value: 'house', label: 'Дом' },
                      { value: 'townhouse', label: 'Таунхаус' },
                    ] as { value: PropertyType; label: string }[]).map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setPropertyType(type.value)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          propertyType === type.value
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-[#0B0B0B] text-white/60 hover:text-white border border-white/10'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Цена, ₽</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="От"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(e.target.value)}
                      className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-9 text-white text-xs placeholder:text-white/30"
                    />
                    <Input
                      placeholder="До"
                      value={priceTo}
                      onChange={(e) => setPriceTo(e.target.value)}
                      className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-9 text-white text-xs placeholder:text-white/30"
                    />
                  </div>
                </div>

                {/* Area Range */}
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Площадь, м²</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="От"
                      value={areaFrom}
                      onChange={(e) => setAreaFrom(e.target.value)}
                      className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-9 text-white text-xs placeholder:text-white/30"
                    />
                    <Input
                      placeholder="До"
                      value={areaTo}
                      onChange={(e) => setAreaTo(e.target.value)}
                      className="bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-9 text-white text-xs placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Rooms */}
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Комнат</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'all', label: 'Все' },
                      { value: '1', label: '1' },
                      { value: '2', label: '2' },
                      { value: '3', label: '3' },
                      { value: '4+', label: '4+' },
                      { value: 'studio', label: 'Студия' },
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setRoomsCount(type.value)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          roomsCount === type.value
                            ? 'bg-[#D4AF37] text-black'
                            : 'bg-[#0B0B0B] text-white/60 hover:text-white border border-white/10'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* District */}
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Район</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-[#0B0B0B] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="all">Все районы</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-white/50 text-xs mb-1.5 block">Сортировка</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortType)}
                    className="w-full bg-[#0B0B0B] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="date">По дате</option>
                    <option value="price-asc">Цена ↑</option>
                    <option value="price-desc">Цена ↓</option>
                    <option value="popularity">По популярности</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Properties Grid */}
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredProperties.map((property, i) => (
              <motion.div
                key={property.id}
                className={`premium-card group overflow-hidden rounded-2xl bg-[#141414] border border-white/5 cursor-pointer ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => openPropertyModal(property.id)}
              >
                {/* Image section */}
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 shrink-0' : 'h-64'}`}>
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

                  {/* Small thumbnails */}
                  <div className="absolute bottom-3 right-3 flex gap-1">
                    {property.images.slice(1, 4).map((img, idx) => (
                      <div key={idx} className="w-12 h-12 rounded-lg overflow-hidden border border-white/20">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-[#D4AF37] text-black text-xs">{property.status}</Badge>
                    <Badge variant="outline" className="bg-black/50 text-white border-white/20 text-xs">{property.type}</Badge>
                  </div>
                  <button
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-white/50 text-sm mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {property.district}, {property.address}
                  </div>
                  <p className="text-white/50 text-sm mb-3 line-clamp-2">{property.description}</p>
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-4 h-4 text-[#D4AF37]" />
                      {property.area}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4 text-[#D4AF37]" />
                      {property.rooms}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold gold-text">{property.price}</span>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] text-xs">
                        Подробнее
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37] text-xs hover:bg-[#D4AF37] hover:text-black">
                        Заявка
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/50 text-lg">Объекты не найдены. Попробуйте изменить параметры фильтра.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
