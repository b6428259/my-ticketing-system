import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { Button, Tooltip } from '@mui/material';
import Smoke from '../../components/Effects/Smoke/Smoke';
import backgroundImage from '../../assets/kamibbackground-notext-release.png';
import logoImage from '../../assets/kamiblogo.jpg';
import ImageBlock from '../../components/ImageBlock/ImageBlock';

import test from '../../assets/testchar1.png';
import test2 from '../../assets/testchar2.png';
import test3 from '../../assets/testchar3.png';
import test4 from '../../assets/testchar4.png';
import test5 from '../../assets/testchar5.png';

import VideoPreview from './components/VideoPreview/VideoPreview';
import videoSrc from '../../assets/Videos/kamibfun.mp4'; // Path to your video file
import posterImage from '../../assets/Images/kamibfunposter.jpg'; // Path to your video poster

const Kamibfun = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { concert } = location.state || { concert: { name: 'Unknown Concert' } };
  const [tickets, setTickets] = useState({
    adults: 0,
    child: 0,
    senior: 0,
  });
  const [loading, setLoading] = useState(false); // Loading state

  const TICKET_PRICES = {
    adults: 18.49,
    child: 10.99, // Add child ticket price if needed
    senior: 12.49, // Add senior ticket price if needed
  };
  

  const MAX_TICKETS = 10; // Example maximum
  const handleIncrement = (type) => {
      if (tickets[type] < MAX_TICKETS) {
          setTickets((prev) => ({ ...prev, [type]: prev[type] + 1 }));
      }
  };
  

  const handleDecrement = (type) => {
    if (tickets[type] > 0) {
      setTickets((prev) => ({ ...prev, [type]: prev[type] - 1 }));
    }
  };

  const handleContinue = async () => {
    setLoading(true); // Start loading
    await navigate('/reserve', { state: { tickets } });
    setLoading(false); // End loading
};

const calculateTotalPrice = () => {
  const { adults, child, senior } = tickets;
  return (
    adults * TICKET_PRICES.adults +
    child * TICKET_PRICES.child +
    senior * TICKET_PRICES.senior
  ).toFixed(2); // returns total as a string with two decimal places
};




  const handleBack = () => {
    navigate(-1);
  };

  // Smooth scroll function
  const smoothScrollTo = (target) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 1)', // Black background with 85% opacity
      }}
    >
      <div
        className="text-white bg-cover bg-center min-h-screen relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="min-h-screen text-white relative bg-cover bg-center">
          {/* Video Preview Section */}
          <VideoPreview videoSrc={videoSrc} poster={posterImage} />
        </div>

        <Smoke />
        <div className="relative z-10 p-4 sm:p-8">

          {/* About Section */}
          <div id="about-section" className="max-w-3xl mx-auto p-4 sm:p-6 mt-8 bg-opacity-80 rounded-lg shadow-lg text-center">
            <h2 className="text-lg sm:text-3xl mb-4">About the Event</h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              การกลับมาอีกครั้งของ ขมิบฝัน 25 “มาเด้อ ขวัญเอ้ย” บอกเล่าเรื่องราวที่ย้อนกลับไปปี พ.ศ. 2510 ในยุคนั้น นอกจากการรักษาในโรงพยาบาล ชาวบ้านยังนิยมเรื่องการรักษาโรคภัยของผีฟ้าพญาแถน (รำผีฟ้า, หมอลำผีฟ้า) เป็นความเชื่อของแถบภาคอีสาน ที่ถูกสืบทอดกันมาจากรุ่นสู่รุ่น
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
            เรื่องราวทั้งหมดเริ่มต้นจากนักศึกษากลุ่มหนึ่งได้มีโอกาสไปเยือนบ้านเกิดของเพื่อนสาวในกลุ่มที่ต่างจังหวัด ก่อนจะได้พบเจอเหตุการณ์แปลกประหลาดที่เกิดขึ้น จนกระทั่งได้ล่วงรู้ถึงเป้าหมายบางอย่างของ ‘นุ’ แต่สถานการณ์ยิ่งกลับตาลปัตรเมื่อในกลุ่มเพื่อนคนหนึ่ง ที่ไม่เชื่อในเรื่องงมงายใด ๆ  มีพฤติกรรมผิดแปลกไปจากเดิม ไม่ทราบสาเหตุ ทำให้ต้องพึ่งการรำรักษาผีฟ้าพญาแถนซึ่งเป็นศาสตร์การรักษาพื้นบ้าน หลังจากผ่านพิธีกรรมดังกล่าวไม่กี่วัน กลับพบศพในสภาพที่สยดสยอง  
            การเปิดฉากล่าครั้งนี้กลับนำไปสู่การค้นพบความจริงบางอย่างที่พวกเขาไม่คาดคิด
            </p>
            {/* Add other event description paragraphs as needed */}
          </div>
        </div>

      {/* Responsive Grid Layout for Character Images with Border */}
      <div id="character-section"className="grid grid-cols-3 grid-rows-2 gap-4 sm:gap-7 mt-4 sm:mt-5 mx-auto justify-items-center relative p-4 border-4 border-white rounded-lg" style={{ width: '95%', maxWidth: '800px' }}>
        <ImageBlock 
          src={test} 
          alt="Character 1" 
          tooltipTitle="บิ๊ว" 
          tooltipDescription="หนุ่มคนกรุงในกลุ่ม มีความคิดสมัยใหม่ ไม่เชื่อเรื่องงมงาย จนกระทั่งชีวิตพลิกผันต้องมาพบสิ่งเหนือธรรมชาติที่ทำให้'บิ๊ว'มีอันเป็นไป" 
          style={{ gridArea: '1 / 1', zIndex: 1 }} 
        />
        <ImageBlock 
          src={test2} 
          alt="Character 2" 
          tooltipTitle="ปื๊ด" 
          tooltipDescription="'ปื๊ด'ผู้สร้างความเฮฮาเเละเสียงหัวเราะให้กับกลุ่มเพื่อนตลอดเวลา เเต่เนื้อเเท้เป็นคนขี้กลัวจนดูขี้ขลาดตาขาวในสายตาเพื่อน" 
          style={{ gridArea: '1 / 2', zIndex: 1 }} 
        />
        <ImageBlock 
          src={test3} 
          alt="Character 3" 
          tooltipTitle="ตะวัน" 
          tooltipDescription="สาวน้อยที่กลัวเพื่อนไม่รัก ยอมทุกอย่างเพื่อเพื่อนเสมอจนทำให้'ตะวัน'เป็นคนไม่มั่นใจในสิ่งที่ตัวเองคิดหรือทำ จนเกิดปัญหาตามมา" 
          style={{ gridArea: '1 / 3', zIndex: 1 }} 
        />
        <ImageBlock 
          src={test4} 
          alt="Character 4" 
          tooltipTitle="นุ" 
          tooltipDescription="'นุ'เป็นหญิงสาวผู้ที่มีความเพียบพร้อมไปเสียหมด ทุกอย่าง ทั้งเก่งเเละฉลาด เเต่กลับมีครอบครัว ที่สืบทอดผีฟ้ามายาวนาน ทำให้ตัว'นุ'ต้องกลับกลายมาเป็นผู้สืบทอดคนต่อไป" 
          style={{ gridArea: '2 / 1 / span 1 / span 2', zIndex: 2 }} 
        />
        <ImageBlock 
          src={test5} 
          alt="Character 5" 
          tooltipTitle="ขาล" 
          tooltipDescription="หนุ่มซื่อตรงที่เพื่อน ๆ ต่างเคารพการตัดสินใจ 'ขาล'ผู้กล้าทำในสิ่งที่ถูกต้องอยู่เสมอ เเม้อุปสรรคอย่างไรก็ไม่เกรงกลัว พร้อมช่วยเหลือเพื่อนเมื่อเจอปัญหา" 
          style={{ gridArea: '2 / 2 / span 1 / span 2', zIndex: 2 }} 
        />
      </div>
        <div id="ticket-section" className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold my-4 sm:mb-6 mb-20 text-center">Select Ticket Type</h1>
          <div className="max-w-sm sm:max-w-md mx-auto rounded-lg p-4 sm:p-6 shadow-lg bg-black bg-opacity-80">
            <div className="flex justify-center mb-4">
              <img src={logoImage} alt={concert.name} className="rounded-full w-24 h-24 sm:w-32 sm:h-32" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-center mb-2">{concert.name}</h2>
            <p className="text-xs sm:text-sm text-gray-300 text-center mb-4 sm:mb-6">
              AMC Metreon 16 | Today, Dec 15, 2023 | 7:45PM | 2 hr 37 min
            </p>
            <div className="space-y-4">
            <TicketTypeRow label="Adults" price={`$${TICKET_PRICES.adults}`} value={tickets.adults} onIncrement={() => handleIncrement('adults')} onDecrement={() => handleDecrement('adults')} />
            {/* <TicketTypeRow label="Children" price={`$${TICKET_PRICES.child}`} value={tickets.child} onIncrement={() => handleIncrement('child')} onDecrement={() => handleDecrement('child')} />
            <TicketTypeRow label="Seniors" price={`$${TICKET_PRICES.senior}`} value={tickets.senior} onIncrement={() => handleIncrement('senior')} onDecrement={() => handleDecrement('senior')} /> */}
          </div>

          <div className="text-lg font-semibold text-center mt-4">
            Total: ${calculateTotalPrice()}
          </div>
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: '#5A5A5A', '&:hover': { backgroundColor: '#7D7D7D' } }}
              onClick={handleContinue}
              fullWidth
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Loading...' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TicketTypeRow = ({ label, price, value, onIncrement, onDecrement }) => (
  <div className="flex justify-between items-center">
    <div>
      <span className="font-semibold">{label}</span>
      <span className="text-sm text-gray-300 ml-2">{price}</span>
    </div>
    <div className="flex items-center">
    <Button onClick={onDecrement} aria-label={`Reduce ${label} count`} sx={{ color: 'white' }}>
    <Minus />
</Button>

      <span className="mx-2">{value}</span>
      <Button onClick={onIncrement} sx={{ color: 'white' }}><Plus /></Button>
    </div>
  </div>
);

export default Kamibfun;
