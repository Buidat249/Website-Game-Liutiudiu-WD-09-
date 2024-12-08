// src/ContactHelp.js
import React from 'react';

const ContactHelp = () => {
  return (
    <main className="flex-1 pt-6 pb-6 pr-0 pl-6 bg-gray-100 h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Liên hệ và hỗ trợ</h1>

      {/* Box Liên hệ bảo hành */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">LIÊN HỆ BẢO HÀNH</h2>
        <p className="text-sm text-gray-600 mb-6">Từ 8:30 - 23:00 các ngày trong tuần kể cả T7 CN</p>
        <ul className="space-y-4">
          <li><strong>Phản hồi nhanh nhất:</strong> <a href="#" className="text-blue-600 hover:text-blue-800">Zalo Liutitudiu</a></li>
          <li><strong>Fanpage Facebook:</strong> <a href="#" className="text-blue-600 hover:text-blue-800">Liutitudiu Shop</a></li>
          <li><strong>Email:</strong> <a href="mailto:hotro@liutitudiu.vn" className="text-blue-600 hover:text-blue-800">hotro@liutitudiu.vn</a></li>
        </ul>
      </div>

      {/* Box Liên hệ tư vấn mua hàng */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">LIÊN HỆ TƯ VẤN MUA HÀNG</h2>
        <p className="text-sm text-gray-600 mb-6">Từ 8:30 - 23:00 các ngày trong tuần kể cả T7 CN</p>
        <ul className="space-y-4">
          <li><strong>Zalo Official Account:</strong> <a href="#" className="text-blue-600 hover:text-blue-800">Liutitudiu</a></li>
          <li><strong>Nhắn tin Fanpage:</strong> <a href="#" className="text-blue-600 hover:text-blue-800">Liutitudiu Shop - Game bản quyền</a></li>
          <li><strong>Email:</strong> <a href="mailto:hotro@liutitudiu.vn" className="text-blue-600 hover:text-blue-800">hotro@liutitudiu.vn</a></li>
          <li><strong>Hotline:</strong> <a href="tel:1900633305" className="text-blue-600 hover:text-blue-800">1900 633 305</a></li>
        </ul>
      </div>
    </main>
  );
};

export default ContactHelp;
