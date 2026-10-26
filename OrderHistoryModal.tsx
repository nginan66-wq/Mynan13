import React from 'react';
import { X, Clock, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { Order } from '../types/food';
import { formatPrice, formatThaiDateTime } from '../utils/formatters';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onSelectOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-history-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl border border-[#E7E2DA] shadow-xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E7E2DA] flex items-center justify-between">
          <div>
            <div className="text-xs text-[#991B1B] font-serif font-medium">ご注文履歴</div>
            <h2 id="modal-history-title" className="text-lg font-bold text-[#1C1917]">
              ประวัติคำสั่งซื้อ ({orders.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
            className="w-8 h-8 rounded-full hover:bg-[#FAF7F2] text-[#78716C] hover:text-[#1C1917] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Orders List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {orders.length === 0 ? (
            <div className="py-12 text-center text-[#78716C] space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto text-[#A8A29E]" />
              <p className="text-sm font-medium text-[#1C1917]">ยังไม่มีประวัติคำสั่งซื้อ</p>
              <p className="text-xs text-[#A8A29E]">เมื่อคุณกดสั่งซื้อ ระบบจะบันทึกออเดอร์ไว้ที่นี่</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderId}
                onClick={() => {
                  onSelectOrder(order);
                  onClose();
                }}
                className="p-4 rounded-lg border border-[#E7E2DA] hover:border-[#991B1B]/40 hover:bg-[#FAF7F2]/60 cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#991B1B] group-hover:underline">
                    {order.orderId}
                  </span>
                  <span className="text-xs font-bold text-[#15803D] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {order.orderStatus}
                  </span>
                </div>

                <div className="text-xs text-[#57534E] line-clamp-1">
                  {order.items.map((i) => `${i.menuItem.name} (x${i.quantity})`).join(', ')}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#F5F2ED] text-xs">
                  <span className="text-[#A8A29E]">
                    {formatThaiDateTime(order.createdAt)}
                  </span>
                  <div className="flex items-center gap-1 font-mono font-bold text-[#1C1917]">
                    <span>{formatPrice(order.total)}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#A8A29E] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
