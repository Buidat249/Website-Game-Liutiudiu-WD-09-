import React from "react";

const Order = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Quản lý đơn hàng</h1>
        <p className="mb-6 text-lg">
          Truy cập lịch sử đơn hàng tại{" "}
          <a href="#" className="text-blue-600 underline">
            ĐÂY
          </a>
        </p>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Lịch sử đơn hàng</h2>

          <img
            src="https://help.divineshop.vn/~gitbook/image?url=https%3A%2F%2F532840585-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-M3-IU1k8a0MMGt6Gmx-%252Fuploads%252FsZelGCDTxAXVkxU5ohLC%252Fimage.png%3Falt%3Dmedia%26token%3Db6230c4e-6c30-4d67-81fb-8d9ad32f3ca7&width=768&dpr=4&quality=100&sign=5969ce1f&sv=1" // Đường dẫn ảnh của bạn ở đây
            alt="Lịch sử đơn hàng"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">1. Bộ lọc tìm kiếm</h2>
          <p className="mb-4">
            Giúp bạn tìm kiếm các đơn hàng theo những điều kiện khác nhau như:
            Mã đơn hàng, ngày mua (ngày tạo từ - ngày tạo đến), giá trị đơn hàng
            (số tiền từ - số tiền đến)
          </p>
          <h2 className="text-xl font-bold mb-2">2. Tổng tiền đã thanh toán</h2>
          <p className="mb-4">Con số này thể hiện tổng giá trị các đơn hàng.</p>
          <p className="mb-4">
            Mặc định khi truy cập trang này, nó sẽ là tổng tiền mà bạn đã giao
            dịch trên Divine Shop.
          </p>
          <p className="mb-4">
            Ngoài ra khi bạn sử dụng chức năng tìm kiếm, nó sẽ là tổng của những
            đơn hàng nằm trong kết quả tìm kiếm
          </p>
        </div>

        <div className="bg-grey  rounded-lg p-3">
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <h3 className="text-lg font-bold mb-2">Ví dụ:</h3>
            <p className="mb-3">
              Bạn muốn biết tháng <strong>03/2020</strong> bạn đã phát sinh bao
              nhiêu tiền trên Shop. Chỉ cần tìm kiếm đơn hàng với điều kiện:
            </p>
            <ul className="list-disc ml-6">
              <li>
                Ngày tạo từ: <strong>2020-03-01</strong>
              </li>
              <li>
                Ngày tạo đến: <strong>2020-03-31</strong>
              </li>
            </ul>
            <p className="mt-2">
              Sau đó bấm <strong>Tìm kiếm</strong>, khi có kết quả, Tổng tiền
              hiện ra chính là tổng tiền phát sinh trong tháng{" "}
              <strong>03/2020</strong>.
            </p>
          </div>
          <h2 className="text-xl font-bold mb-2">3. Tổng tiền đã thanh toán</h2>
          <p className="mb-4">
            Đây là danh sách chi tiết các đơn hàng của bạn.
          </p>
          <p className="mb-4">
            Nhìn qua đây, các bạn có thể thấy được các thông tin cơ bản của đơn
            hàng như: ngày mua, sản phẩm mua, giá trị đơn hàng.
          </p>
        </div>
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold">4. Chi tiết đơn hàng</h1>
          <p className="mt-4 text-gray-600">
            Để biết thêm các thông tin chi tiết của đơn hàng như:
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Tình trạng đơn hàng: Hoàn thành/Chờ thanh toán/Chargeback</li>
            <li>Key game</li>
            <li>Hướng dẫn sử dụng</li>
            <li>Biên lại chi tiết của đơn hàng</li>
          </ul>
          <p className="mt-4 text-blue-500 cursor-pointer">
            Click vào nút này.
          </p>
          <div className="mt-4">
            <img
              src="https://help.divineshop.vn/~gitbook/image?url=https%3A%2F%2F532840585-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-M3-IU1k8a0MMGt6Gmx-%252Fuploads%252Fg68qKe8GbNd1NWduPptd%252Fimage.png%3Falt%3Dmedia%26token%3Da6721f0c-8b8e-4893-8559-bbbb1f49195b&width=768&dpr=4&quality=100&sign=25d2a936&sv=1"
              alt="Static representation"
              className="rounded-md shadow-md"
            />
          </div>
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

export default Order;
