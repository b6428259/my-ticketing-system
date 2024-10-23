// contexts/LanguageContext.js
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('th'); // 'th' หรือ 'en'

    const translations = {
        th: {
            selectDate: "เลือกวันที่",
            selectDatePlaceholder: "เลือกวันที่ต้องการ",
            selectRound: "เลือกรอบการแสดง",
            selectedRound: "รอบที่เลือก",
            round: "รอบที่",
            selectProduct: "เลือกสินค้า",
            noProducts: "ไม่มีสินค้าในรอบนี้",
            ticketType: "ประเภทตั๋ว",
            price: "ราคา",
            quantity: "จำนวน",
            addToCart: "เพิ่มลงตะกร้า",
            yourCart: "ตะกร้าของคุณ",
            total: "ยอดรวม",
            buyNow: "ซื้อเลย",
            reserveTitle: "จองตั๋วสำหรับคอนเสิร์ต",
        },
        en: {
            selectDate: "Select Date",
            selectDatePlaceholder: "Choose a date",
            selectRound: "Select Show Time",
            selectedRound: "Selected Round",
            round: "Round",
            selectProduct: "Select Product",
            noProducts: "No products available for this round",
            ticketType: "Ticket Type",
            price: "Price",
            quantity: "Quantity",
            addToCart: "Add to Cart",
            yourCart: "Your Cart",
            total: "Total",
            buyNow: "Buy Now",
            reserveTitle: "Reserve Tickets for Concert",
        }
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'th' ? 'en' : 'th');
    };

    const t = (key) => translations[language][key] || key;

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);