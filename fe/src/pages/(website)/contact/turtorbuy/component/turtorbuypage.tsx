import React from "react";

const Shopping = () => {
  return (
    <div className="flex-1 pt-6 pb-6 pr-0 pl-6 bg-gray-100 h-screen overflow-y-auto">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">
          Hướng dẫn mua hàng siêu tốc không cần tài khoản
        </h1>
        <p className="text-gray-700 mb-20">
          Mua hàng siêu tốc <strong>không cần tài khoản</strong> chỉ áp dụng với
          hình thức thanh toán <strong>Mobile Banking (VNPAY QR)</strong> và{" "}
          <strong>MoMo</strong>. Nếu bạn không sử dụng các hình thức này, hãy
          tạo tài khoản Divine Shop và thanh toán với nhiều hình thức khác.
          Hiện tại Divine Shop hỗ trợ rất nhiều phương thức thanh toán, bạn có
          thể tham khảo thêm tại{" "}
          <a href="#" className="text-blue-500">
            đây
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mb-5">
          Video hướng dẫn mua hàng siêu tốc
        </h2>
        <div className="w-full h-96 mb-8">
          <iframe
            src="https://www.youtube.com/embed/UMbC2RPktZY"
            title="Video hướng dẫn mua hàng"
            className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {" "}
          <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100">
            {" "}
            <span className="text-sm">Previous</span>{" "}
            <span className="block text-lg font-semibold">Hướng dẫn mua hàng không cần tài khoản</span>{" "}
          </button>{" "}
          <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100">
            {" "}
            <span className="text-sm">Next</span>{" "}
            <span className="block text-lg font-semibold">
             Hướng dẫn cài đặt và sử dụng 
            </span>{" "}
          </button>{" "}
        </div>
      </main>
    </div>
  );
};

export default Shopping;
