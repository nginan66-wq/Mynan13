import React from 'react';
import { Clock, Truck, ChefHat, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menu';
import heroDiningImage from '../assets/images/hero_japanese_dining_1792980231099.jpg';

export const HeroBanner: React.FC<{ onScrollToMenu: () => void }> = ({ onScrollToMenu }) => {
  return (
    <section className="relative overflow-hidden bg-[#F4EFEB] border-b border-[#E7E2DA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-5">
            {/* Japanese Kicker & Hanko Stamp */}
            <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider text-[#78716C]">
              <span className="font-serif tracking-widest text-[#991B1B] font-semibold">
                伝統の日本料理 · {RESTAURANT_INFO.name}
              </span>
              <span aria-hidden="true" className="text-[#D6D0C7]">|</span>
              <div className="hanko-stamp px-2 py-0.5 text-[11px] font-bold tracking-wider inline-flex items-center gap-1">
                <span>デモ</span>
                <span>DEMO STORE</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.2] text-balance">
              รสชาติอาหารญี่ปุ่นแท้
              <br />
              <span className="text-[#991B1B]">สั่งง่าย ส่งร้อนถึงบ้านคุณ</span>
            </h1>

            <p className="text-base text-[#57534E] max-w-xl leading-relaxed">
              สัมผัสความพิถีพิถันสไตล์ญี่ปุ่นดั้งเดิม ราเมงซุปกระดูกหมูเข้มข้น 
              ข้าวหน้าหมูชาชูย่างไฟหอมกรุ่น และซูชิสดใหม่ ปรุงสดร้อนๆ พร้อมส่งใน 25–35 นาที
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onScrollToMenu}
                className="px-6 py-3 bg-[#1C1917] text-white hover:bg-[#991B1B] font-medium text-sm rounded-md transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#991B1B] focus-visible:ring-offset-2 flex items-center gap-2"
              >
                <span>เลือกเมนูอาหาร</span>
                <span className="text-xs font-serif opacity-80">ご注文へ</span>
              </button>

              <div className="text-xs text-[#78716C] flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#15803D]" />
                <span>ครัวเปิดบริการปกติ (10:00 - 21:30 น.)</span>
              </div>
            </div>

            {/* Value Props Row */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#E7E2DA] max-w-lg">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#1C1917]">ค่าส่ง 40 บาท</div>
                  <div className="text-[11px] text-[#78716C]">เหมาจ่ายทุกพื้นที่</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#1C1917]">25-35 นาที</div>
                  <div className="text-[11px] text-[#78716C]">ส่งด่วนถึงหน้าบ้าน</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ChefHat className="w-4 h-4 text-[#991B1B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#1C1917]">ปรุงสดใหม่</div>
                  <div className="text-[11px] text-[#78716C]">ตามออเดอร์ทุกชาม</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Photography Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden shadow-md border border-[#E7E2DA] bg-[#E7E2DA] group">
              <img
                src={heroDiningImage}
                alt="สำรับอาหารญี่ปุ่นดั้งเดิมบนโต๊ะไม้ฮิโนกิ"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-84 lg:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                <div className="text-white space-y-1">
                  <div className="text-xs font-medium text-amber-200 tracking-wider">
                    こだわり · CRAFT & TRADITION
                  </div>
                  <div className="text-sm font-semibold">
                    บรรยากาศร้านอาหารญี่ปุ่นสไตล์มินิมอล
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
