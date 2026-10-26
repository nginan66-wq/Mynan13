import React, { useState } from 'react';
import { CheckCircle2, Utensils, Clock, MapPin, Phone, User, Copy, Check, ArrowRight, Printer } from 'lucide-react';
import { Order } from '../types/food';
import { formatPrice, formatThaiDateTime } from '../utils/formatters';

interface OrderSuccessViewProps {
  order: Order;
  onBackToMenu: () => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({
  order,
  onBackToMenu,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Celebration Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#15803D]/10 text-[#15803D] mb-2 border border-[#15803D]/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="text-xs font-serif text-[#991B1B] font-semibold tracking-widest">
          ご注文ありがとうございます · ขอบคุณสำหรับคำสั่งซื้อ
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight">
          สั่งซื้อสำเร็จ!
        </h1>

        <p className="text-sm text-[#57534E] max-w-md mx-auto">
          เราได้รับคำสั่งซื้อของคุณเรียบร้อยแล้ว เชฟกำลังพิถีพิถันปรุงอาหารญี่ปุ่นสดใหม่เพื่อคุณ
        </p>
      </div>

      {/* Order ID & Status Banner */}
      <div className="bg-white rounded-xl border border-[#E7E2DA] p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F5F2ED]">
          <div>
            <span className="text-xs text-[#78716C] block">เลขที่คำสั่งซื้อ</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-bold font-mono text-[#991B1B]">
                {order.orderId}
              </span>
              <button
                onClick={handleCopyOrderId}
                title="คัดลอกเลขที่คำสั่งซื้อ"
                className="p-1 text-[#78716C] hover:text-[#1C1917] transition-colors rounded"
              >
                {copied ? <Check className="w-4 h-4 text-[#15803D]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-[#78716C] block">เวลาที่สั่งซื้อ</span>
            <span className="text-xs font-medium text-[#1C1917]">
              {formatThaiDateTime(order.createdAt)}
            </span>
          </div>
        </div>

        {/* Live Status Indicator: "กำลังเตรียมอาหาร" */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#991B1B] animate-pulse" />
              <span className="text-sm font-bold text-[#1C1917]">
                สถานะ: <span className="text-[#991B1B]">{order.orderStatus}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#78716C] font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>รอประมาณ {order.estimatedDeliveryTime}</span>
            </div>
          </div>

          {/* 4-Step Progress Track */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {/* Step 1 */}
            <div className="space-y-1.5 text-center">
              <div className="h-1.5 rounded-full bg-[#15803D]" />
              <span className="text-[11px] font-medium text-[#15803D] block">ได้รับออเดอร์</span>
            </div>
            {/* Step 2 */}
            <div className="space-y-1.5 text-center">
              <div className="h-1.5 rounded-full bg-[#991B1B]" />
              <span className="text-[11px] font-bold text-[#991B1B] block">กำลังเตรียมอาหาร</span>
            </div>
            {/* Step 3 */}
            <div className="space-y-1.5 text-center opacity-40">
              <div className="h-1.5 rounded-full bg-[#E7E2DA]" />
              <span className="text-[11px] text-[#78716C] block">ไรเดอร์รับอาหาร</span>
            </div>
            {/* Step 4 */}
            <div className="space-y-1.5 text-center opacity-40">
              <div className="h-1.5 rounded-full bg-[#E7E2DA]" />
              <span className="text-[11px] text-[#78716C] block">จัดส่งสำเร็จ</span>
            </div>
          </div>
        </div>

        {/* Payment Confirmation Tag */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs p-3 bg-[#FAF7F2] rounded-md border border-[#E7E2DA]">
          <div>
            <span className="text-[#78716C]">สถานะการชำระ: </span>
            <strong className="text-[#15803D] font-medium">{order.paymentStatus}</strong>
          </div>
          {order.paymentReference && (
            <div className="font-mono text-[#57534E]">
              Ref: {order.paymentReference}
            </div>
          )}
        </div>
      </div>

      {/* Itemized Order Breakdown */}
      <div className="bg-white rounded-xl border border-[#E7E2DA] p-6 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#1C1917] pb-3 border-b border-[#F5F2ED] flex items-center gap-2">
          <Utensils className="w-4 h-4 text-[#991B1B]" />
          <span>รายละเอียดรายการอาหาร</span>
        </h2>

        {/* Items List */}
        <div className="divide-y divide-[#F5F2ED]">
          {order.items.map((item) => (
            <div key={item.cartItemId} className="py-3 flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded bg-[#EFEAE2] overflow-hidden shrink-0 border border-[#E7E2DA]">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#1C1917]">
                    {item.menuItem.name} <span className="font-mono text-xs text-[#78716C]">× {item.quantity}</span>
                  </div>
                  <div className="text-xs text-[#78716C] font-serif">
                    {item.menuItem.japaneseName}
                  </div>
                  {item.selectedSpiciness && (
                    <div className="text-[11px] text-[#A8A29E] mt-0.5">• {item.selectedSpiciness}</div>
                  )}
                  {item.selectedToppings && item.selectedToppings.length > 0 && (
                    <div className="text-[11px] text-[#A8A29E]">
                      • {item.selectedToppings.map(t => t.name).join(', ')}
                    </div>
                  )}
                  {item.specialInstructions && (
                    <div className="text-[11px] text-[#A8A29E]">• โน้ต: {item.specialInstructions}</div>
                  )}
                </div>
              </div>

              <div className="text-sm font-mono font-bold text-[#1C1917] text-right">
                {formatPrice(item.itemTotalPrice)}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="pt-3 border-t border-[#F5F2ED] space-y-2 text-xs text-[#57534E]">
          <div className="flex justify-between">
            <span>รวมค่าอาหาร</span>
            <span className="font-mono text-[#1C1917]">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>ค่าส่งอาหาร</span>
            <span className="font-mono text-[#1C1917]">{formatPrice(order.deliveryFee)}</span>
          </div>
          <div className="pt-3 border-t border-[#F5F2ED] flex justify-between items-baseline">
            <span className="text-sm font-bold text-[#1C1917]">ยอดรวมสุทธิ</span>
            <span className="text-xl font-bold font-mono text-[#991B1B]">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="pt-4 border-t border-[#F5F2ED] space-y-2 text-xs text-[#57534E]">
          <div className="font-bold text-[#1C1917] text-xs">ข้อมูลการจัดส่ง</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start gap-2">
              <User className="w-3.5 h-3.5 text-[#78716C] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#78716C] block text-[11px]">ผู้รับ:</span>
                <strong className="text-[#1C1917]">{order.customer.name}</strong>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Phone className="w-3.5 h-3.5 text-[#78716C] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#78716C] block text-[11px]">เบอร์ติดต่อ:</span>
                <strong className="text-[#1C1917] font-mono">{order.customer.phone}</strong>
              </div>
            </div>

            <div className="sm:col-span-2 flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#78716C] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#78716C] block text-[11px]">ที่อยู่จัดส่ง:</span>
                <span className="text-[#1C1917]">{order.customer.address}</span>
              </div>
            </div>

            {order.customer.notes && (
              <div className="sm:col-span-2 text-[11px] text-[#78716C] bg-[#FAF7F2] p-2 rounded border border-[#E7E2DA]">
                <strong>หมายเหตุ:</strong> {order.customer.notes}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={onBackToMenu}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-semibold text-sm rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] focus-visible:ring-offset-2"
        >
          <span>กลับไปเลือกอาหาร</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#FAF7F2] border border-[#E7E2DA] text-[#1C1917] font-medium text-sm rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4 text-[#78716C]" />
          <span>พิมพ์ใบเสร็จออเดอร์</span>
        </button>
      </div>
    </div>
  );
};
