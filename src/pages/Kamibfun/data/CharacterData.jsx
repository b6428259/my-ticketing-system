import test from '../../../assets/testchar1.png';
import test2 from '../../../assets/testchar2.png';
import test3 from '../../../assets/testchar3.png';
import test4 from '../../../assets/testchar4.png';
import test5 from '../../../assets/testchar5.png';

const characterData = [
  {
    id: 1,
    src: test,
    alt: 'Character 1',
    tooltipTitle: 'บิ๊ว',
    tooltipDescription: "หนุ่มคนกรุงในกลุ่ม มีความคิดสมัยใหม่ ไม่เชื่อเรื่องงมงาย จนกระทั่งชีวิตพลิกผันต้องมาพบสิ่งเหนือธรรมชาติที่ทำให้'บิ๊ว'มีอันเป็นไป",
    style: { gridArea: '1 / 1', zIndex: 1 }
  },
  {
    id: 2,
    src: test2,
    alt: 'Character 2',
    tooltipTitle: 'ปื๊ด',
    tooltipDescription: "ปื๊ด'ผู้สร้างความเฮฮาเเละเสียงหัวเราะให้กับกลุ่มเพื่อนตลอดเวลา เเต่เนื้อเเท้เป็นคนขี้กลัวจนดูขี้ขลาดตาขาวในสายตาเพื่อน",
    style: { gridArea: '1 / 2', zIndex: 1 }
  },
  {
    id: 3,
    src: test3,
    alt: 'Character 3',
    tooltipTitle: 'ตะวัน',
    tooltipDescription: "สาวน้อยที่กลัวเพื่อนไม่รัก ยอมทุกอย่างเพื่อเพื่อนเสมอจนทำให้'ตะวัน'เป็นคนไม่มั่นใจในสิ่งที่ตัวเองคิดหรือทำ จนเกิดปัญหาตามมา",
    style: { gridArea: '1 / 3', zIndex: 1 }
  },
  {
    id: 4,
    src: test4,
    alt: 'Character 4',
    tooltipTitle: 'นุ',
    tooltipDescription: "'นุ'เป็นหญิงสาวผู้ที่มีความเพียบพร้อมไปเสียหมด ทุกอย่าง ทั้งเก่งเเละฉลาด เเต่กลับมีครอบครัว ที่สืบทอดผีฟ้ามายาวนาน ทำให้ตัว'นุ'ต้องกลับกลายมาเป็นผู้สืบทอดคนต่อไป",
    style: { gridArea: '2 / 1 / span 1 / span 2', zIndex: 2 }
  },
  {
    id: 5,
    src: test5,
    alt: 'Character 5',
    tooltipTitle: 'ขาล',
    tooltipDescription: "หนุ่มซื่อตรงที่เพื่อน ๆ ต่างเคารพการตัดสินใจ 'ขาล'ผู้กล้าทำในสิ่งที่ถูกต้องอยู่เสมอ เเม้อุปสรรคอย่างไรก็ไม่เกรงกลัว พร้อมช่วยเหลือเพื่อนเมื่อเจอปัญหา",
    style: { gridArea: '2 / 2 / span 1 / span 2', zIndex: 2 }
  }
];

export default characterData;
