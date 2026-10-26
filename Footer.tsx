import React from 'react';
import { MapPin, Phone, Clock, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1917] text-[#FAF7F2] border-t border-[#292524] mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-[#991B1B] text-white flex items-center justify-center font-bold text-xs tracking-wider">
                頂
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                {RESTAURANT_INFO.name}
              </span>
            </div>
            <p className="text-xs text-[#A8A29E] leading-relaxed max-w-sm">
              {RESTAURANT_INFO.tagline} บรรยากาศเรียบง่าย เสิร์ฟความสุขผ่านอาหารญี่ปุ่นที่คุณไว้วางใจ
            </p>
            <div className="pt-2">
              <span className="inline-block border border-[#44403C] text-[11px] text-[#A8A29E] px-2.5 py-1 rounded">
                ระบบจำลองร้านอาหารญี่ปุ่นออนไลน์ (Interactive Demo)
              </span>
            </div>
          </div>

          {/* Quick Hours & Contact */}
          <div className="md:col-span-4 space-y-2.5 text-xs text-[#D6D3D1]">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-1">
              ข้อมูลร้านและเวลาทำการ
            </h4>
            <div className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-[#991B1B] shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.openingHours}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#991B1B] shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-3.5 h-3.5 text-[#991B1B] shrink-0 mt-0.5" />
              <span>เบอร์ติดต่อ: {RESTAURANT_INFO.phone}</span>
            </div>
          </div>

          {/* Policy & Demo Notice */}
          <div className="md:col-span-3 space-y-2.5 text-xs text-[#A8A29E]">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-1">
              เงื่อนไขการบริการ
            </h4>
            <p>• ค่าจัดส่งเหมาจ่าย 40 บาททุกพื้นที่</p>
            <p>• ระยะเวลาจัดส่งประมาณ 25-35 นาที</p>
            <p>• ชำระเงินผ่าน QR Code, โอนเงิน หรือเก็บปลายทาง</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C]">
          <div>
            © {new Date().getFullYear()} {RESTAURANT_INFO.thaiName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Made with precision in Japanese Minimal style</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
