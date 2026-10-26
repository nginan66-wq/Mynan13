import React from 'react';
import { Search, X } from 'lucide-react';
import { CATEGORIES } from '../data/menu';
import { CategoryId } from '../types/food';

interface CategoryFilterProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  itemCounts: Record<CategoryId, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  itemCounts,
}) => {
  return (
    <div id="categories" className="space-y-4 pt-2">
      {/* Search Bar + Japanese minimalist heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#78716C]">
            <span className="font-serif text-[#991B1B]">お品書き</span>
            <span>·</span>
            <span>เลือกสรรความอร่อยตามหมวดหมู่</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight">
            รายการอาหารญี่ปุ่น
          </h2>
        </div>

        {/* Search input with clear button */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ค้นหาชื่ออาหาร..."
            className="w-full pl-9 pr-9 py-2 text-sm bg-white border border-[#E7E2DA] rounded-md focus:outline-none focus:ring-1 focus:ring-[#991B1B] focus:border-[#991B1B] placeholder:text-[#A8A29E] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#1C1917] p-1"
              aria-label="ล้างคำค้นหา"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Segmented Category Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#E7E2DA]">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          const count = itemCounts[category.id] ?? 0;

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap shrink-0 transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] ${
                isActive
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#EFEAE2]'
              }`}
            >
              <span>{category.name}</span>
              <span className={`text-[11px] font-mono ${isActive ? 'text-white/70' : 'text-[#A8A29E]'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
