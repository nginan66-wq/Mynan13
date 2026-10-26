import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Phone, MapPin, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem, CustomerInfo } from '../types/food';
import { formatPrice } from '../utils/formatters';
import { RESTAURANT_INFO } from '../data/menu';

interface CheckoutViewProps {
  cartItems: CartItem[];
  customerInfo: CustomerInfo;
  onUpdateCustomerInfo: (info: CustomerInfo) => void;
  onBackToCart: () => void;
  onProceedToPayment: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  customerInfo,
  onUpdateCustomerInfo,
  onBackToCart,
  onProceedToPayment,
}) => {
  const [formData, setFormData] = useState<CustomerInfo>(customerInfo);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CustomerInfo, boolean>>>({});

  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const deliveryFee = RESTAURANT_INFO.deliveryFee;
  const grandTotal = subtotal + deliveryFee;

  const validateField = (field: keyof CustomerInfo, value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'กรุณากรอกชื่อ-นามสกุล';
        if (value.trim().length < 2) return 'ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร';
        return '';
      case 'phone':
        if (!value.trim()) return 'กรุณากรอกเบอร์โทรศัพท์';
        // Thai mobile numbers: 08x, 09x, 06x (9 or 10 digits)
        const cleanedPhone = value.replace(/[-\s]/g, '');
        if (!/^[0-9]{9,10}$/.test(cleanedPhone)) {
          return 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (9-10 หลัก เช่น 0812345678)';
        }
        return '';
      case 'address':
        if (!value.trim()) return 'กรุณากรอกที่อยู่จัดส่ง';
        if (value.trim().length < 8) return 'กรุณาระบุที่อยู่จัดส่งให้ชัดเจน (บ้านเลขที่, ถนน, ซอย)';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateCustomerInfo(updated);

    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof CustomerInfo) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateField('name', formData.name);
    const phoneError = validateField('phone', formData.phone);
    const addressError = validateField('address', formData.address);

    const newErrors = {
      name: nameError,
      phone: phoneError,
      address: addressError,
    };

    setErrors(newErrors);
    setTouched({ name: true, phone: true, address: true, notes: true });

    if (!nameError && !phoneError && !addressError) {
      onProceedToPayment();
    }
  };

  const handleFillDemoData = () => {
    const demoInfo: CustomerInfo = {
      name: 'คุณสมศักดิ์ วงศ์สวรรค์',
      phone: '089-123-4567',
      address: 'ห้อง 502 อาคารพาร์ควิว คอนโด สุขุมวิท 49 แขวงคลองตันเหนือ เขตวัฒนา กทม. 10110',
      notes: 'ฝากไว้ที่ล็อบบี้ รบกวนโทรแจ้งเมื่อถึงครับ ไม่รับช้อนส้อมพลาสติก',
    };
    setFormData(demoInfo);
    onUpdateCustomerInfo(demoInfo);
    setErrors({});
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header & Step progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E2DA]">
        <button
          onClick={onBackToCart}
          className="text-xs sm:text-sm font-medium text-[#57534E] hover:text-[#1C1917] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ย้อนกลับไปตะกร้า</span>
        </button>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#78716C]">
          <span className="text-[#15803D] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            1. ตะกร้า
          </span>
          <span className="text-[#A8A29E]">/</span>
          <span className="text-[#991B1B] font-bold">2. ข้อมูลจัดส่ง</span>
          <span className="text-[#A8A29E]">/</span>
          <span className="text-[#A8A29E]">3. ชำระเงิน</span>
        </div>
      </div>

      <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Customer Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E7E2DA] p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#F5F2ED]">
            <div>
              <div className="text-xs text-[#991B1B] font-serif font-medium">お届け先情報</div>
              <h1 className="text-xl font-bold text-[#1C1917]">ข้อมูลผู้รับและที่อยู่จัดส่ง</h1>
            </div>

            <button
              type="button"
              onClick={handleFillDemoData}
              className="text-xs bg-[#FAF7F2] hover:bg-[#F4EFEB] border border-[#E7E2DA] text-[#991B1B] px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ใส่ข้อมูลตัวอย่าง Demo</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="customer-name" className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                ชื่อ-นามสกุล ผู้รับ <span className="text-[#991B1B]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                <input
                  id="customer-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="เช่น คุณกฤษดา หรือ พิมพ์ชญา"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white border rounded-md focus:outline-none transition-colors ${
                    errors.name && touched.name
                      ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]'
                      : 'border-[#E7E2DA] focus:ring-1 focus:ring-[#991B1B] focus:border-[#991B1B]'
                  }`}
                />
              </div>
              {errors.name && touched.name && (
                <p className="mt-1 text-xs text-[#DC2626]">{errors.name}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="customer-phone" className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                เบอร์โทรศัพท์ติดต่อ <span className="text-[#991B1B]">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#78716C]" />
                <input
                  id="customer-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  placeholder="08x-xxx-xxxx หรือ 09xxxxxxxx"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white border rounded-md focus:outline-none transition-colors ${
                    errors.phone && touched.phone
                      ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]'
                      : 'border-[#E7E2DA] focus:ring-1 focus:ring-[#991B1B] focus:border-[#991B1B]'
                  }`}
                />
              </div>
              {errors.phone && touched.phone && (
                <p className="mt-1 text-xs text-[#DC2626]">{errors.phone}</p>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label htmlFor="customer-address" className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                ที่อยู่จัดส่งอาหาร <span className="text-[#991B1B]">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-[#78716C]" />
                <textarea
                  id="customer-address"
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  onBlur={() => handleBlur('address')}
                  placeholder="บ้านเลขที่, ชื่อคอนโด/หมู่บ้าน, ซอย, ถนน, แขวง/ตำบล, เขต/อำเภอ"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-md focus:outline-none transition-colors ${
                    errors.address && touched.address
                      ? 'border-[#DC2626] focus:ring-1 focus:ring-[#DC2626]'
                      : 'border-[#E7E2DA] focus:ring-1 focus:ring-[#991B1B] focus:border-[#991B1B]'
                  }`}
                />
              </div>
              {errors.address && touched.address && (
                <p className="mt-1 text-xs text-[#DC2626]">{errors.address}</p>
              )}
            </div>

            {/* Notes Field */}
            <div>
              <label htmlFor="customer-notes" className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                หมายเหตุเพิ่มเติม (ถ้ามี)
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 absolute left-3 top-3 text-[#78716C]" />
                <textarea
                  id="customer-notes"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="เช่น ฝากไว้กับเจ้าหน้าที่นิติ, โทรแจ้งก่อนส่ง 5 นาที, ขอตะเกียบ 2 คู่"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#E7E2DA] rounded-md focus:outline-none focus:ring-1 focus:ring-[#991B1B] focus:border-[#991B1B] placeholder:text-[#A8A29E]"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#991B1B] hover:bg-[#7F1D1D] text-white font-semibold text-sm rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] focus-visible:ring-offset-2"
              >
                <span>ไปที่ขั้นตอนชำระเงิน</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E7E2DA] p-6 shadow-xs space-y-5">
          <div className="pb-3 border-b border-[#F5F2ED] flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1C1917]">สรุปรายการอาหาร</h2>
            <span className="text-xs text-[#78716C] font-mono">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} รายการ
            </span>
          </div>

          {/* Mini Items List */}
          <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-[#F5F2ED]">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="pt-2 first:pt-0 flex items-start justify-between gap-3 text-xs">
                <div className="flex-1">
                  <div className="font-semibold text-[#1C1917]">
                    {item.menuItem.name} <span className="font-mono text-[#78716C]">× {item.quantity}</span>
                  </div>
                  {item.selectedSpiciness && (
                    <div className="text-[11px] text-[#A8A29E]">{item.selectedSpiciness}</div>
                  )}
                  {item.selectedToppings && item.selectedToppings.length > 0 && (
                    <div className="text-[11px] text-[#A8A29E]">
                      +{item.selectedToppings.map(t => t.name).join(', ')}
                    </div>
                  )}
                </div>
                <div className="font-mono font-medium text-[#1C1917]">
                  {formatPrice(item.itemTotalPrice)}
                </div>
              </div>
            ))}
          </div>

          {/* Cost Breakdown */}
          <div className="pt-3 border-t border-[#F5F2ED] space-y-2 text-xs text-[#57534E]">
            <div className="flex justify-between">
              <span>ราคารวมอาหาร</span>
              <span className="font-mono text-[#1C1917]">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>ค่าส่ง (เหมาจ่าย)</span>
              <span className="font-mono text-[#1C1917]">{formatPrice(deliveryFee)}</span>
            </div>
            <div className="pt-3 border-t border-[#F5F2ED] flex justify-between items-baseline">
              <span className="text-sm font-bold text-[#1C1917]">ยอดรวมทั้งหมด</span>
              <span className="text-xl font-bold font-mono text-[#991B1B]">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
