import React from 'react';
import { ShoppingBag, History, UtensilsCrossed } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface HeaderProps {
  currentView: 'menu' | 'cart' | 'checkout' | 'payment' | 'order-success';
  onNavigate: (view: 'menu' | 'cart') => void;
  cartCount: number;
  cartTotal: number;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  cartCount,
  cartTotal,
  onOpenHistory,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7E2DA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title (Single text element wordmark) */}
        <button
          onClick={() => onNavigate('menu')}
          className="flex items-center gap-2.5 text-left text-[#1C1917] hover:opacity-85 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B]"
        >
          <div className="w-8 h-8 rounded-sm bg-[#991B1B] text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm">
            頂
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1C1917]">
            ITADAKI KITCHEN
          </span>
        </button>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]">
          <button
            onClick={() => onNavigate('menu')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'menu' ? 'text-[#991B1B] font-semibold' : 'hover:text-[#1C1917]'
            }`}
          >
            เมนูอาหาร
          </button>
          <a
            href="#categories"
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0"
          >
            หมวดหมู่อาหาร
          </a>
          <a
            href="#story"
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0"
          >
            เรื่องราวร้าน
          </a>
          <button
            onClick={onOpenHistory}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <History className="w-4 h-4 text-[#78716C]" />
            <span>ประวัติออเดอร์</span>
            {historyCount > 0 && (
              <span className="text-xs text-[#991B1B] font-semibold">({historyCount})</span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Shopping Cart) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('cart')}
            aria-label="เปิดตะกร้าสินค้า"
            className="relative flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-white bg-[#991B1B] hover:bg-[#7F1D1D] rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] focus-visible:ring-offset-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-semibold">ตะกร้า</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-mono font-bold">
              {cartCount}
            </span>
            {cartCount > 0 && (
              <span className="hidden sm:inline border-l border-white/20 pl-2 text-xs font-mono">
                {formatCurrency(cartTotal)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
