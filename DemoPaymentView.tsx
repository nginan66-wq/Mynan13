import React, { useState } from 'react';
import { ArrowLeft, QrCode, Building2, Banknote, ShieldAlert, CheckCircle, RefreshCw, Loader2 } from 'lucide-react';
import { PaymentMethod, CartItem, CustomerInfo } from '../types/food';
import { formatPrice, generateMockPaymentRef } from '../utils/formatters';
import { RESTAURANT_INFO } from '../data/menu';

interface DemoPaymentViewProps {
  cartItems: CartItem[];
  customerInfo: CustomerInfo;
  onBackToCheckout: () => void;
  onConfirmOrder: (paymentMethod: PaymentMethod, paymentRef?: string) => void;
}

export const DemoPaymentView: React.FC<DemoPaymentViewProps> = ({
  cartItems,
  customerInfo,
  onBackToCheckout,
  onConfirmOrder,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('qr');
  const [paymentRef, setPaymentRef] = useState<string>('PAY-DEMO-88921');
  const [refError, setRefError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const deliveryFee = RESTAURANT_INFO.deliveryFee;
  const grandTotal = subtotal + deliveryFee;

  const handleGenerateNewRef = () => {
    const newRef = generateMockPaymentRef();
    setPaymentRef(newRef);
    setRefError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMethod === 'qr' || selectedMethod === 'transfer') {
      if (!paymentRef.trim()) {
        setRefError('กรุณากรอกเลขอ้างอิงการชำระเงิน หรือกดปุ่มสุ่มเลขอ้างอิงตัวอย่าง');
        return;
      }
    }

    // Simulate verification delay for realistic demo experience
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmOrder(selectedMethod, paymentRef.trim());
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E7E2DA]">
        <button
          onClick={onBackToCheckout}
          disabled={isProcessing}
          className="text-xs sm:text-sm font-medium text-[#57534E] hover:text-[#1C1917] flex items-center gap-1.5 transition-colors disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ย้อนกลับไปแก้ไขที่อยู่จัดส่ง</span>
        </button>

        <div className="text-xs text-[#78716C] font-mono">
          ยอดชำระ: <strong className="text-[#991B1B] text-sm">{formatPrice(grandTotal)}</strong>
        </div>
      </div>

      <div className="pt-8 max-w-2xl mx-auto space-y-6">
        <div>
          <div className="text-xs font-serif text-[#991B1B] font-medium">お支払い方法</div>
          <h1 className="text-2xl font-bold text-[#1C1917] tracking-tight">
            เลือกวิธีการชำระเงิน (Demo)
          </h1>
          <p className="text-xs text-[#78716C] mt-1">
            ระบบชำระเงินจำลองเพื่อการทดสอบ ไม่มีการตัดเงินจริง
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="p-4 rounded-lg bg-amber-50/80 border border-amber-200/80 text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-bold block text-sm mb-0.5">
              นี่คือระบบชำระเงินสำหรับ Demo เท่านั้น
            </span>
            จำลองขั้นตอนการสั่งซื้ออาหารออนไลน์ เพื่อทดสอบ Flow การทำงาน คุณสามารถกดยืนยันการชำระเงินได้ทันทีโดยไม่มีการเชื่อมต่อบัญชีธนาคารจริง
          </div>
        </div>

        {/* Payment Method Selector Tabs */}
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setSelectedMethod('qr')}
            className={`p-3.5 rounded-lg border text-left flex flex-col justify-between transition-all ${
              selectedMethod === 'qr'
                ? 'border-[#991B1B] bg-white ring-1 ring-[#991B1B] shadow-xs'
                : 'border-[#E7E2DA] bg-[#FAF7F2] hover:bg-white text-[#57534E]'
            }`}
          >
            <div className="flex items-center justify-between">
              <QrCode className={`w-5 h-5 ${selectedMethod === 'qr' ? 'text-[#991B1B]' : 'text-[#78716C]'}`} />
              {selectedMethod === 'qr' && <span className="w-2 h-2 rounded-full bg-[#991B1B]" />}
            </div>
            <div className="mt-3">
              <div className="text-xs font-bold text-[#1C1917]">QR Payment</div>
              <div className="text-[11px] text-[#78716C]">สแกนจ่าย PromptPay</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod('transfer')}
            className={`p-3.5 rounded-lg border text-left flex flex-col justify-between transition-all ${
              selectedMethod === 'transfer'
                ? 'border-[#991B1B] bg-white ring-1 ring-[#991B1B] shadow-xs'
                : 'border-[#E7E2DA] bg-[#FAF7F2] hover:bg-white text-[#57534E]'
            }`}
          >
            <div className="flex items-center justify-between">
              <Building2 className={`w-5 h-5 ${selectedMethod === 'transfer' ? 'text-[#991B1B]' : 'text-[#78716C]'}`} />
              {selectedMethod === 'transfer' && <span className="w-2 h-2 rounded-full bg-[#991B1B]" />}
            </div>
            <div className="mt-3">
              <div className="text-xs font-bold text-[#1C1917]">โอนเงิน</div>
              <div className="text-[11px] text-[#78716C]">โอนเข้าบัญชีธนาคาร</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod('cod')}
            className={`p-3.5 rounded-lg border text-left flex flex-col justify-between transition-all ${
              selectedMethod === 'cod'
                ? 'border-[#991B1B] bg-white ring-1 ring-[#991B1B] shadow-xs'
                : 'border-[#E7E2DA] bg-[#FAF7F2] hover:bg-white text-[#57534E]'
            }`}
          >
            <div className="flex items-center justify-between">
              <Banknote className={`w-5 h-5 ${selectedMethod === 'cod' ? 'text-[#991B1B]' : 'text-[#78716C]'}`} />
              {selectedMethod === 'cod' && <span className="w-2 h-2 rounded-full bg-[#991B1B]" />}
            </div>
            <div className="mt-3">
              <div className="text-xs font-bold text-[#1C1917]">เก็บเงินปลายทาง</div>
              <div className="text-[11px] text-[#78716C]">ชำระเงินสดตอนรับ</div>
            </div>
          </button>
        </div>

        {/* Selected Method Details */}
        <div className="bg-white rounded-xl border border-[#E7E2DA] p-6 shadow-xs space-y-6">
          {(selectedMethod === 'qr' || selectedMethod === 'transfer') && (
            <div className="space-y-6">
              {/* QR Display Card */}
              {selectedMethod === 'qr' && (
                <div className="flex flex-col items-center justify-center p-6 bg-[#FAF7F2] rounded-lg border border-[#E7E2DA]">
                  {/* PromptPay Header */}
                  <div className="bg-[#003B70] text-white px-5 py-1.5 rounded-t-md text-xs font-bold tracking-wider flex items-center gap-2">
                    <span>พร้อมเพย์</span>
                    <span>·</span>
                    <span>PROMPTPAY</span>
                  </div>

                  {/* High Quality Stylized SVG QR Code */}
                  <div className="bg-white p-4 border border-[#E7E2DA] shadow-xs rounded-b-md flex flex-col items-center">
                    <svg
                      viewBox="0 0 160 160"
                      className="w-48 h-48"
                      shapeRendering="crispEdges"
                    >
                      {/* Quiet Zone */}
                      <rect width="160" height="160" fill="#ffffff" />
                      {/* Corner 1 (Top Left) */}
                      <rect x="15" y="15" width="40" height="40" fill="#1C1917" />
                      <rect x="22" y="22" width="26" height="26" fill="#ffffff" />
                      <rect x="28" y="28" width="14" height="14" fill="#1C1917" />

                      {/* Corner 2 (Top Right) */}
                      <rect x="105" y="15" width="40" height="40" fill="#1C1917" />
                      <rect x="112" y="22" width="26" height="26" fill="#ffffff" />
                      <rect x="118" y="28" width="14" height="14" fill="#1C1917" />

                      {/* Corner 3 (Bottom Left) */}
                      <rect x="15" y="105" width="40" height="40" fill="#1C1917" />
                      <rect x="22" y="112" width="26" height="26" fill="#ffffff" />
                      <rect x="28" y="118" width="14" height="14" fill="#1C1917" />

                      {/* Data dots matrix simulation */}
                      <rect x="65" y="15" width="8" height="8" fill="#1C1917" />
                      <rect x="80" y="15" width="8" height="8" fill="#1C1917" />
                      <rect x="65" y="30" width="8" height="8" fill="#1C1917" />
                      <rect x="80" y="35" width="8" height="8" fill="#1C1917" />
                      <rect x="65" y="50" width="8" height="8" fill="#1C1917" />
                      <rect x="90" y="50" width="8" height="8" fill="#1C1917" />

                      <rect x="20" y="65" width="8" height="8" fill="#1C1917" />
                      <rect x="35" y="75" width="8" height="8" fill="#1C1917" />
                      <rect x="50" y="65" width="8" height="8" fill="#1C1917" />
                      <rect x="65" y="65" width="8" height="8" fill="#1C1917" />
                      <rect x="80" y="70" width="8" height="8" fill="#1C1917" />
                      <rect x="95" y="65" width="8" height="8" fill="#1C1917" />
                      <rect x="110" y="75" width="8" height="8" fill="#1C1917" />
                      <rect x="125" y="65" width="8" height="8" fill="#1C1917" />
                      <rect x="135" y="80" width="8" height="8" fill="#1C1917" />

                      <rect x="65" y="90" width="8" height="8" fill="#1C1917" />
                      <rect x="80" y="90" width="8" height="8" fill="#1C1917" />
                      <rect x="95" y="100" width="8" height="8" fill="#1C1917" />
                      <rect x="110" y="90" width="8" height="8" fill="#1C1917" />
                      <rect x="125" y="105" width="8" height="8" fill="#1C1917" />
                      <rect x="65" y="110" width="8" height="8" fill="#1C1917" />
                      <rect x="80" y="125" width="8" height="8" fill="#1C1917" />
                      <rect x="95" y="120" width="8" height="8" fill="#1C1917" />
                      <rect x="110" y="130" width="8" height="8" fill="#1C1917" />
                      <rect x="125" y="120" width="8" height="8" fill="#1C1917" />
                      <rect x="135" y="135" width="8" height="8" fill="#1C1917" />

                      {/* Center Japanese seal symbol */}
                      <circle cx="80" cy="80" r="14" fill="#ffffff" />
                      <circle cx="80" cy="80" r="11" fill="#991B1B" />
                      <text x="80" y="85" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">頂</text>
                    </svg>

                    <div className="mt-3 text-center">
                      <div className="text-xs font-bold text-[#1C1917]">
                        บริษัท อิตาดาคิ เจแปนนิส คิทเช่น จำกัด (Demo)
                      </div>
                      <div className="text-xs font-mono text-[#78716C] mt-0.5">
                        PromptPay ID: 0-1055-66001-23-4
                      </div>
                      <div className="mt-2 text-sm font-bold text-[#991B1B] font-mono">
                        จำนวนเงิน: {formatPrice(grandTotal)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer Details Card */}
              {selectedMethod === 'transfer' && (
                <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E7E2DA] space-y-3">
                  <div className="text-xs font-bold text-[#1C1917]">
                    ข้อมูลบัญชีธนาคารสำหรับโอนเงิน (Demo Account)
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#78716C] block">ธนาคาร:</span>
                      <strong className="text-[#1C1917]">กสิกรไทย (KBANK)</strong>
                    </div>
                    <div>
                      <span className="text-[#78716C] block">เลขที่บัญชี:</span>
                      <strong className="text-[#1C1917] font-mono">088-2-94812-7</strong>
                    </div>
                    <div>
                      <span className="text-[#78716C] block">ชื่อบัญชี:</span>
                      <strong className="text-[#1C1917]">บจก. อิตาดาคิ คิทเช่น (Demo)</strong>
                    </div>
                    <div>
                      <span className="text-[#78716C] block">ยอดที่ต้องโอน:</span>
                      <strong className="text-[#991B1B] font-mono">{formatPrice(grandTotal)}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Reference Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="payment-ref" className="block text-xs font-semibold text-[#1C1917]">
                    เลขอ้างอิงการชำระเงิน <span className="text-[#991B1B]">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateNewRef}
                    className="text-xs text-[#991B1B] hover:text-[#7F1D1D] font-medium flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>สุ่มเลขอ้างอิงตัวอย่าง</span>
                  </button>
                </div>

                <input
                  id="payment-ref"
                  type="text"
                  value={paymentRef}
                  onChange={(e) => {
                    setPaymentRef(e.target.value);
                    setRefError('');
                  }}
                  placeholder="เช่น PAY-DEMO-12345 หรือ หมายเลขอ้างอิงสลิป"
                  className={`w-full px-3 py-2.5 text-sm bg-white border rounded-md focus:outline-none font-mono ${
                    refError
                      ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]'
                      : 'border-[#E7E2DA] focus:ring-1 focus:ring-[#991B1B] focus:border-[#991B1B]'
                  }`}
                />
                {refError ? (
                  <p className="text-xs text-[#DC2626]">{refError}</p>
                ) : (
                  <p className="text-[11px] text-[#78716C]">
                    สำหรับ Demo: สามารถใช้ค่าที่ระบบสุ่มให้ หรือพิมพ์เลขอ้างอิงใดๆ ก็ได้
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Cash on Delivery Details */}
          {selectedMethod === 'cod' && (
            <div className="p-5 bg-[#FAF7F2] rounded-lg border border-[#E7E2DA] space-y-3">
              <div className="flex items-center gap-2 text-[#15803D] text-xs font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>ชำระเงินสดเมื่อได้รับอาหาร</span>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                ไรเดอร์จะจัดส่งอาหารถึงที่อยู่: <strong>{customerInfo.address}</strong>
                <br />
                กรุณาเตรียมเงินสดจำนวน <strong className="text-[#991B1B] font-mono">{formatPrice(grandTotal)}</strong> ให้พอดีเพื่อความรวดเร็วในการรับสินค้า
              </p>
            </div>
          )}

          {/* Confirm Payment CTA */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-[#991B1B] hover:bg-[#7F1D1D] disabled:bg-[#991B1B]/70 text-white font-semibold text-sm rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] focus-visible:ring-offset-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังตรวจสอบการชำระเงิน...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {selectedMethod === 'cod'
                      ? 'ยืนยันการสั่งซื้อ (เก็บเงินปลายทาง)'
                      : 'ยืนยันการชำระเงิน (Demo)'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
