import { Category, MenuItem } from '../types/food';

import tonkotsuRamenImage from '../assets/images/food_tonkotsu_ramen_1792980232635.jpg';
import chashuDonImage from '../assets/images/food_chashu_don_1792980233067.jpg';
import tonkatsuImage from '../assets/images/food_crispy_tonkatsu_1792980234151.jpg';
import sushiSetImage from '../assets/images/food_sushi_morawase_1792980233893.jpg';
import gyozaImage from '../assets/images/food_crispy_gyoza_1792980248158.jpg';
import greenTeaImage from '../assets/images/food_iced_matcha_1792980247907.jpg';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'ทั้งหมด', japanese: 'すべて' },
  { id: 'ramen', name: 'ราเมง', japanese: 'ラーメン' },
  { id: 'rice', name: 'ข้าว', japanese: '丼もの' },
  { id: 'sushi', name: 'ซูชิ', japanese: '寿司' },
  { id: 'appetizer', name: 'ของทานเล่น', japanese: '一品料理' },
  { id: 'drink', name: 'เครื่องดื่ม', japanese: 'お飲み物' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-tonkotsu-ramen',
    name: 'ราเมงทงคตสึ',
    japaneseName: '濃厚豚骨ラーメン',
    category: 'ramen',
    price: 159,
    description: 'น้ำซุปกระดูกหมูสูตรดั้งเดิมเคี่ยวนานกว่า 16 ชม. เส้นราเมงเหนียวนุ่ม หมูชาชูรมควัน และไข่ต้มอาจิทามะยางมะตูม',
    image: tonkotsuRamenImage,
    badge: 'เมนูยอดนิยม',
    spicyLevel: 0,
    preparationTime: '10-15 นาที',
    availableOptions: {
      spiciness: ['ไม่เผ็ด (ดั้งเดิม)', 'เผ็ดน้อย', 'เผ็ดปานกลาง', 'เผ็ดมาก (รสจัด)'],
      toppings: [
        { name: 'เพิ่มไข่ต้มอาจิทามะ', price: 25 },
        { name: 'เพิ่มหมูชาชู (2 ชิ้น)', price: 40 },
        { name: 'เพิ่มสาหร่ายโนริ (3 แผ่น)', price: 15 },
        { name: 'เพิ่มเส้นราเมง', price: 30 },
      ],
    },
  },
  {
    id: 'item-chashu-don',
    name: 'ข้าวหน้าหมูชาชู',
    japaneseName: '特製炙りチャーシュー丼',
    category: 'rice',
    price: 139,
    description: 'หมูสามชั้นตุ๋นซีอิ๊วญี่ปุ่นย่างไฟจนหอมกรุ่น ท็อปด้วยไข่แดงสดออร์แกนิก ต้นหอมซอย และงาขาวคั่วบนข้าวญี่ปุ่นร้อนๆ',
    image: chashuDonImage,
    badge: 'ขายดีประจำวัน',
    spicyLevel: 0,
    preparationTime: '8-12 นาที',
    availableOptions: {
      toppings: [
        { name: 'เพิ่มไข่ออนเซ็น', price: 20 },
        { name: 'เพิ่มหมูชาชูพิเศษ', price: 40 },
        { name: 'ซอสทาเระพิเศษ', price: 15 },
      ],
    },
  },
  {
    id: 'item-tonkatsu',
    name: 'ทงคัตสึ',
    japaneseName: '極上ロースとんかつ',
    category: 'rice',
    price: 169,
    description: 'สันนอกหมูคัดพิเศษชุบเกล็ดขนมปังสด ทอดสีเหลืองทองกรอบนอกฉ่ำใน เสิร์ฟคู่กะหล่ำปลีซอยละเอียดและซอสทงคัตสึเข้มข้น',
    image: tonkatsuImage,
    badge: 'สูตรลับเชฟ',
    spicyLevel: 0,
    preparationTime: '12-15 นาที',
    availableOptions: {
      toppings: [
        { name: 'เพิ่มข้าวสวยญี่ปุ่น', price: 25 },
        { name: 'เพิ่มซุปมิโสะร้อน', price: 20 },
        { name: 'เพิ่มชีสยืดลาวา', price: 35 },
      ],
    },
  },
  {
    id: 'item-sushi-set',
    name: 'ซูชิเซ็ต',
    japaneseName: '特選握り寿司盛り合わせ',
    category: 'sushi',
    price: 249,
    description: 'ซูชิรวมพรีเมียม 8 คำ ประกอบด้วย แซลมอนนอร์เวย์, ทูน่ามากุโระ, ฮามาจิ, กุ้งหวาน และไข่หวานย่าง วาซาบิสดแท้',
    image: sushiSetImage,
    badge: 'เกรดซาชิมิ',
    spicyLevel: 0,
    preparationTime: '15-20 นาที',
    availableOptions: {
      toppings: [
        { name: 'เพิ่มแซลมอนซูชิ (2 คำ)', price: 70 },
        { name: 'เพิ่มวาซาบิสดแท้', price: 15 },
        { name: 'ขิงดองสูตรดั้งเดิม', price: 10 },
      ],
    },
  },
  {
    id: 'item-gyoza',
    name: 'เกี๊ยวซ่า',
    japaneseName: 'パリパリ羽根つき焼き餃子',
    category: 'appetizer',
    price: 89,
    description: 'เกี๊ยวซ่าแป้งบางไส้หมูสับและกะหล่ำปลี ปรุงรสด้วยน้ำมันงา จี่บนกระทะจนแป้งด้านล่างมีเกล็ดตาสลัดกรอบ เสิร์ฟ 6 ชิ้น',
    image: gyozaImage,
    badge: 'ของว่างยอดฮิต',
    spicyLevel: 0,
    preparationTime: '6-10 นาที',
    availableOptions: {
      toppings: [
        { name: 'เพิ่มน้ำจิ้มเกี๊ยวซ่าเผ็ด', price: 10 },
        { name: 'โรยหอมเจียวและกระเทียม', price: 10 },
      ],
    },
  },
  {
    id: 'item-green-tea',
    name: 'ชาเขียว',
    japaneseName: '宇治冷製抹茶',
    category: 'drink',
    price: 49,
    description: 'ชาเขียวมัทฉะแท้นำเข้าจากเมืองอูจิ เกียวโต ชงสดเย็นชื่นใจ หอมกลิ่นใบชาคั่ว ไม่แต่งกลิ่นหรือสีสังเคราะห์ (ไม่หวาน)',
    image: greenTeaImage,
    badge: 'อูจิแท้ 100%',
    spicyLevel: 0,
    preparationTime: '3-5 นาที',
    availableOptions: {
      spiciness: ['หวาน 0% (ดั้งเดิม)', 'หวาน 25% (หวานน้อย)', 'หวาน 50% (ปกติ)'],
      toppings: [
        { name: 'เพิ่มเจลลี่มัทฉะ', price: 15 },
      ],
    },
  },
];

export const RESTAURANT_INFO = {
  name: 'いただきます ITADAKI',
  thaiName: 'อิตาดาคิ เจแปนนิส คิทเช่น',
  tagline: 'ร้านอาหารญี่ปุ่นต้นตำรับ สดใหม่ สะอาด พิถีพิถันทุกคำ',
  address: 'เลขที่ 88/4 ถนนสุขุมวิท ซอย 39 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพฯ 10110',
  phone: '02-890-1234',
  openingHours: 'เปิดให้บริการทุกวัน 10:00 - 21:30 น.',
  deliveryFee: 40,
  estimatedDeliveryMinutes: '25-35 นาที',
};
