import React, { useState } from 'react';
import { X, Plus, Minus, Check, Clock } from 'lucide-react';
import { MenuItem } from '../types/food';
import { formatPrice } from '../utils/formatters';

interface FoodDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCartWithOptions: (
    item: MenuItem,
    quantity: number,
    selectedSpiciness?: string,
    selectedToppings?: { name: string; price: number }[],
    specialInstructions?: string
  ) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  item,
  onClose,
  onAddToCartWithOptions,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSpiciness, setSelectedSpiciness] = useState<string | undefined>(
    item.availableOptions?.spiciness?.[0]
  );
  const [selectedToppings, setSelectedToppings] = useState<{ name: string; price: number }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleTopping = (topping: { name: string; price: number }) => {
    if (selectedToppings.some((t) => t.name === topping.name)) {
      setSelectedToppings(selectedToppings.filter((t) => t.name !== topping.name));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const toppingsTotal = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const unitPrice = item.price + toppingsTotal;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCartWithOptions(
      item,
      quantity,
      selectedSpiciness,
      selectedToppings,
      specialInstructions.trim()
    );
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-food-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl border border-[#E7E2DA] shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col"
      >
        {/* Modal Image Header */}
        <div className="relative aspect-16/10 w-full bg-[#EFEAE2] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <button
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2.5 left-3">
            <span className="bg-[#FAF7F2]/95 backdrop-blur-xs text-[#1C1917] border border-[#E7E2DA] text-xs font-semibold px-2.5 py-1 rounded-sm shadow-2xs">
              {item.japaneseName}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 flex-1">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 id="modal-food-title" className="text-xl font-bold text-[#1C1917]">
                {item.name}
              </h2>
              <span className="text-lg font-bold text-[#991B1B] font-mono tabular-nums">
                {formatPrice(item.price)}
              </span>
            </div>
            <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
              {item.description}
            </p>
            {item.preparationTime && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#78716C]">
                <Clock className="w-3.5 h-3.5" />
                <span>เวลาปรุงประมาณ: {item.preparationTime}</span>
              </div>
            )}
          </div>

          {/* Spiciness Options */}
          {item.availableOptions?.spiciness && (
            <div className="space-y-2 pt-2 border-t border-[#F5F2ED]">
              <label className="text-xs font-semibold text-[#1C1917] block">
                เลือกระดับความเข้มข้น / รสชาติ:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.availableOptions.spiciness.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSelectedSpiciness(level)}
                    className={`py-2 px-3 text-xs font-medium rounded-md border text-left transition-all ${
                      selectedSpiciness === level
                        ? 'border-[#991B1B] bg-[#991B1B]/5 text-[#991B1B] font-semibold'
                        : 'border-[#E7E2DA] hover:border-[#1C1917] text-[#57534E]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra Toppings */}
          {item.availableOptions?.toppings && item.availableOptions.toppings.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#F5F2ED]">
              <label className="text-xs font-semibold text-[#1C1917] block">
                ท็อปปิ้งเพิ่มเติม (เลือกได้หลายอย่าง):
              </label>
              <div className="space-y-1.5">
                {item.availableOptions.toppings.map((topping) => {
                  const isChecked = selectedToppings.some((t) => t.name === topping.name);
                  return (
                    <label
                      key={topping.name}
                      onClick={() => toggleTopping(topping)}
                      className={`flex items-center justify-between p-2.5 rounded-md border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-[#991B1B] bg-[#FAF7F2]'
                          : 'border-[#E7E2DA] hover:bg-[#FAF7F2]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent div click
                          className="rounded text-[#991B1B] focus:ring-[#991B1B]"
                        />
                        <span className="text-[#1C1917] font-medium">{topping.name}</span>
                      </div>
                      <span className="text-[#78716C] font-mono">+{formatPrice(topping.price)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5 pt-2 border-t border-[#F5F2ED]">
            <label className="text-xs font-semibold text-[#1C1917] block">
              หมายเหตุเพิ่มเติม (ถ้ามี):
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="เช่น แยกน้ำซุป, ไม่ใส่ผัก, ขอวาซาบิเพิ่ม"
              maxLength={100}
              className="w-full text-xs px-3 py-2 bg-white border border-[#E7E2DA] rounded-md focus:outline-none focus:ring-1 focus:ring-[#991B1B] placeholder:text-[#A8A29E]"
            />
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E7E2DA] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-[#E7E2DA] bg-white rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              aria-label="ลดจำนวน"
              className="w-8 h-8 flex items-center justify-center text-[#57534E] hover:text-[#1C1917] disabled:opacity-40"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-bold font-mono text-[#1C1917]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              aria-label="เพิ่มจำนวน"
              className="w-8 h-8 flex items-center justify-center text-[#57534E] hover:text-[#1C1917]"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleConfirm}
            className={`flex-1 py-2.5 px-4 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
              isSuccess
                ? 'bg-[#15803D] text-white'
                : 'bg-[#991B1B] hover:bg-[#7F1D1D] text-white'
            }`}
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>เพิ่มลงตะกร้าแล้ว!</span>
              </>
            ) : (
              <>
                <span>เพิ่มลงตะกร้า</span>
                <span className="font-mono">· {formatPrice(totalPrice)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
