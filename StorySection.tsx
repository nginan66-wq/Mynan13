import React from 'react';
import { RESTAURANT_INFO } from '../data/menu';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-16 bg-[#F4EFEB] border-t border-[#E7E2DA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-serif text-[#991B1B] font-semibold tracking-widest">
            <span>一期一会</span>
            <span>·</span>
            <span>TREASURING EVERY MOMENT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
            ปรัชญาความอร่อยแบบญี่ปุ่นดั้งเดิม
          </h2>

          <p className="text-sm text-[#57534E] leading-relaxed">
            ที่ {RESTAURANT_INFO.name} เรายึดมั่นในความเรียบง่ายแต่งดงาม (Wabi-Sabi)
            น้ำซุปกระดูกหมูทงคตสึของเราเคี่ยวนานข้ามคืนกว่า 16 ชั่วโมงจนได้ความเข้มข้นกลมกล่อมตามธรรมชาติ 
            ข้าวหน้าหมูชาชูใช้ข้าวญี่ปุ่นแท้เม็ดอวบ และเนื้อปลาซูชิคัดสรรความสดในระดับซาชิมิเกรด 
            เพื่อให้ทุกมื้อที่ส่งถึงบ้านคุณเป็นช่วงเวลาแห่งความสุขที่แท้จริง
          </p>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left border-t border-[#E7E2DA]">
            <div className="bg-white/80 backdrop-blur-xs p-5 rounded-lg border border-[#E7E2DA] space-y-1.5">
              <span className="text-xs font-serif text-[#991B1B] font-bold block">01. น้ำซุป 16 ชั่วโมง</span>
              <h3 className="text-sm font-bold text-[#1C1917]">เข้มข้น ไม่ใส่ผงชูรส</h3>
              <p className="text-xs text-[#78716C]">
                เคี่ยวด้วยกระดูกหมูส่วนข้อและผักสดธรรมชาติ ให้ความหวานหอมนุ่มนวล
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-5 rounded-lg border border-[#E7E2DA] space-y-1.5">
              <span className="text-xs font-serif text-[#991B1B] font-bold block">02. ข้าวโคชิฮิคาริ</span>
              <h3 className="text-sm font-bold text-[#1C1917]">หุงสุกนุ่ม หอมละมุน</h3>
              <p className="text-xs text-[#78716C]">
                เมล็ดข้าวอวบอิ่มนำเข้าจากจังหวัดนีงาตะ หุงสดใหม่ทุกชั่วโมง
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-5 rounded-lg border border-[#E7E2DA] space-y-1.5">
              <span className="text-xs font-serif text-[#991B1B] font-bold block">03. สดใหม่ตามสั่ง</span>
              <h3 className="text-sm font-bold text-[#1C1917]">ไม่มีการทำค้างคืน</h3>
              <p className="text-xs text-[#78716C]">
                ทุกชามเริ่มทำเมื่อมีคำสั่งซื้อ แพ็กแยกน้ำซุปเพื่อรักษาอุณหภูมิและความกรอบ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
