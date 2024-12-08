import React from "react";

const Favoritelist = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl w-[800px] my-6 mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Sản phẩm yêu thích</h2>
      <p className="text-gray-600 mb-4">
        Danh sách các sản phẩm mà bạn đã đánh dấu "yêu thích"
      </p>

      {/* Phần thông báo khi không có sản phẩm */}
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="text-yellow-600 text-lg font-medium mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 inline mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 20.5C6.48 20.5 2 16.02 2 12 2 7.98 6.48 3.5 12 3.5s10 4.48 10 8.5c0 4.02-4.48 8.5-10 8.5z"
            />
          </svg>
          Chưa có sản phẩm yêu thích
        </div>
        <p className="text-gray-500 text-base">
          Hãy thêm sản phẩm yêu thích của bạn để theo dõi chúng dễ dàng hơn.
        </p>
      </div>
    </div>
  );
};

export default Favoritelist;
