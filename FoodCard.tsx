import React, { useState } from 'react';
import { Plus, Check, Clock } from 'lucide-react';
import { MenuItem } from '../types/food';
import { formatPrice } from '../utils/formatters';

interface FoodCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onSelectDetail: (item: MenuItem) => void;
  currentQuantityInCart: number;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  onAddToCart,
  onSelectDetail,
  currentQuantityInCart,
}) => {
  const [justAdded, setJustAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  return (
    <article
      onClick={() => onSelectDetail(item)}
      className="group bg-white rounded-lg border border-[#E7E2DA] overflow-hidden flex flex-col justify-between hover:border-[#1C1917]/30 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm"
    >
      <div>
        {/* Image Container with Fallback */}
        <div className="relative aspect-4/3 w-full bg-[#EFEAE2] overflow-hidden">
          {!imageError ? (
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-[#78716C] bg-gradient-to-br from-[#FAF7F2] to-[#E7E2DA]">
              <span className="font-serif text-2xl text-[#991B1B] font-bold">和</span>
              <span className="text-xs mt-1 text-[#57534E] font-medium">{item.name}</span>
            </div>
          )}

          {/* Subtle badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            {item.badge && (
              <span className="bg-[#FAF7F2]/95 backdrop-blur-xs text-[#1C1917] border border-[#E7E2DA] text-[11px] font-medium px-2 py-0.5 rounded-sm shadow-2xs">
                {item.badge}
              </span>
            )}
          </div>

          {/* Cart Quantity Indicator overlay */}
          {currentQuantityInCart > 0 && (
            <div className="absolute top-2.5 right-2.5 bg-[#991B1B] text-white text-xs font-mono font-bold px-2 py-0.5 rounded-sm shadow-xs flex items-center gap-1">
              <span>ในตะกร้า</span>
              <span>×{currentQuantityInCart}</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2">
          {/* Japanese Kanji / Kana kicker */}
          <div className="text-[12px] text-[#991B1B] font-medium font-serif tracking-wide truncate">
            {item.japaneseName}
          </div>

          <h3 className="text-base font-bold text-[#1C1917] group-hover:text-[#991B1B] transition-colors line-clamp-1">
            {item.name}
          </h3>

          <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2 min-h-9">
            {item.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Price & Add Button */}
      <div className="px-4 pb-4 pt-2 border-t border-[#F5F2ED] flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-[#A8A29E] font-medium">ราคา</div>
          <div className="text-base font-bold text-[#1C1917] font-mono tabular-nums">
            {formatPrice(item.price)}
          </div>
        </div>

        <button
          onClick={handleAddClick}
          aria-label={`เพิ่ม ${item.name} ลงตะกร้า`}
          className={`px-3.5 py-2 text-xs font-medium rounded-md flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] focus-visible:ring-offset-1 ${
            justAdded
              ? 'bg-[#15803D] text-white'
              : 'bg-[#1C1917] hover:bg-[#991B1B] text-white'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>เพิ่มแล้ว</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>เพิ่มลงตะกร้า</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
