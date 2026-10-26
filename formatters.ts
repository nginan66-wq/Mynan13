/**
 * Helper utilities for Japanese food ordering demo
 */

export const formatPrice = (amount: number): string => {
  return `${amount.toLocaleString('th-TH')} บาท`;
};

export const formatCurrency = (amount: number): string => {
  return `฿${amount.toLocaleString('th-TH')}`;
};

/**
 * Generates an authentic order ID matching the pattern: #JP20261026001
 */
export const generateOrderId = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomSeq = String(Math.floor(Math.random() * 900) + 100);
  return `#JP${year}${month}${day}${randomSeq}`;
};

/**
 * Generates a mock payment reference number for demo
 */
export const generateMockPaymentRef = (): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let ref = 'PAY-';
  for (let i = 0; i < 8; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
};

export const formatThaiDateTime = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString);
    const months = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543; // Thai Buddhist year
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} เวลา ${hours}:${minutes} น.`;
  } catch {
    return isoDateString;
  }
};
