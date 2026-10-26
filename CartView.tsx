import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types/food';
import { formatPrice } from '../utils/formatters';
import { RESTAURANT_INFO } from '../data/menu';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onBackToMenu: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onBackToMenu,
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const deliveryFee = RESTAURANT_INFO.deliveryFee;
  const grandTotal = subtotal > 0 ? subtotal + deliveryFee : 0;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#F4EFEB] flex items-center justify-center border border-[#E7E2DA] mb-6">
          <ShoppingBag className="w-8 h-8 text-[#A8A29E]" />
        </div>
        <div className="text-xs font-serif text-[#991B1B] font-semibold tracking-widest mb-1">
          かごは空です
        </div>
        <h2 className="text-2xl font-bold text-[#1C1917] tracking-tight mb-3">
          ตะกร้าอาหารของคุณยังว่างอยู่
        </h2>
        <p className="text-sm text-[#57534E] max-w-md mx-auto mb-8">
          เลือกความอร่อยจากเมนูอาหารญี่ปุ่นสดใหม่ของเรา ทั้งราเมงต้นตำรับ ข้าวหน้าหมูชาชู และซูชิคำโต
        </p>
        <button
          onClick={onBackToMenu}
          className="px-6 py-3 bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-sm font-semibold rounded-md transition-colors shadow-sm inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>เลือกอาหารญี่ปุ่นเลย</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Breadcrumb / Navigation */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E7E2DA]">
        <button
          onClick={onBackToMenu}
          className="text-xs sm:text-sm font-medium text-[#57534E] hover:text-[#1C1917] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปเลือกเมนูเพิ่ม</span>
        </button>

        <button
          onClick={onClearCart}
          className="text-xs text-[#A8A29E] hover:text-[#991B1B] transition-colors"
        >
          ล้างตะกร้าทั้งหมด
        </button>
      </div>

      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight">
              ตะกร้าสินค้าของคุณ
            </h1>
            <span className="text-xs text-[#78716C] font-mono">
              ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} รายการ)
            </span>
          </div>

          <div className="divide-y divide-[#E7E2DA] border-y border-[#E7E2DA]">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="py-4 flex gap-4 items-start">
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-md overflow-hidden bg-[#EFEAE2] shrink-0 border border-[#E7E2DA]">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-[#1C1917] truncate">
                        {item.menuItem.name}
                      </h3>
                      <div className="text-[11px] text-[#78716C] font-serif">
                        {item.menuItem.japaneseName}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      aria-label="ลบรายการนี้"
                      className="text-[#A8A29E] hover:text-[#991B1B] p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Options details */}
                  {(item.selectedSpiciness || (item.selectedToppings && item.selectedToppings.length > 0) || item.specialInstructions) && (
                    <div className="mt-1 space-y-0.5 text-[11px] text-[#78716C]">
                      {item.selectedSpiciness && (
                        <div>• รสชาติ: {item.selectedSpiciness}</div>
                      )}
                      {item.selectedToppings && item.selectedToppings.length > 0 && (
                        <div>• ท็อปปิ้ง: {item.selectedToppings.map(t => `${t.name} (+฿${t.price})`).join(', ')}</div>
                      )}
                      {item.specialInstructions && (
                        <div>• โน้ต: {item.specialInstructions}</div>
                      )}
                    </div>
                  )}

                  {/* Price & Quantity Controls */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs font-mono font-medium text-[#78716C]">
                      ฿{(item.itemTotalPrice / item.quantity).toLocaleString()} × {item.quantity}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-[#E7E2DA] bg-white rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          aria-label="ลดจำนวน"
                          className="w-7 h-7 flex items-center justify-center text-[#57534E] hover:text-[#1C1917]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-mono font-bold text-[#1C1917]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          aria-label="เพิ่มจำนวน"
                          className="w-7 h-7 flex items-center justify-center text-[#57534E] hover:text-[#1C1917]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-sm font-bold font-mono text-[#1C1917] min-w-16 text-right">
                        {formatPrice(item.itemTotalPrice)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E7E2DA] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#F5F2ED]">
            <h2 className="text-base font-bold text-[#1C1917]">สรุปยอดการสั่งซื้อ</h2>
            <span className="text-xs text-[#78716C] font-serif">お会計</span>
          </div>

          <div className="space-y-3 text-xs text-[#57534E]">
            <div className="flex justify-between">
              <span>รวมค่าอาหาร</span>
              <span className="font-mono text-[#1C1917]">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span>ค่าจัดส่งเดลิเวอรี</span>
                <span className="block text-[10px] text-[#A8A29E]">ส่งตรงจากครัวใน 25-35 นาที</span>
              </div>
              <span className="font-mono text-[#1C1917]">{formatPrice(deliveryFee)}</span>
            </div>

            <div className="pt-3 border-t border-[#F5F2ED] flex justify-between items-baseline">
              <div>
                <span className="text-sm font-bold text-[#1C1917]">ยอดรวมทั้งหมด</span>
                <span className="block text-[11px] text-[#78716C]">รวมภาษีมูลค่าเพิ่มแล้ว</span>
              </div>
              <span className="text-xl font-bold font-mono text-[#991B1B]">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={onProceedToCheckout}
            className="w-full py-3.5 px-4 bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-semibold text-sm rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] focus-visible:ring-offset-2"
          >
            <span>ดำเนินการสั่งซื้อ (Checkout)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#78716C] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
            <span>ระบบสั่งซื้ออาหารจำลองสำหรับ Demo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
