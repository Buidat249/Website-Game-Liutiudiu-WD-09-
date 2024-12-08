import React from "react";

const TurtorRegister = () => {
  return (
    <div className="flex-1 pt-6 pb-6 pr-0 pl-6 bg-gray-100 h-screen ">
      <main className="flex-1 bg-white p-6">    
        <h2 className="text-xl font-bold mb-4">Hướng dẫn tạo tài khoản</h2>

        <div className="mb-6">
          <h3 className="font-bold">Bước 1:</h3>
          <p>Ở giao diện trang chủ Liutiudiu Shop, click vào Đăng ký</p>
          <img
            src="https://help.divineshop.vn/~gitbook/image?url=https%3A%2F%2F532840585-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-M3-IU1k8a0MMGt6Gmx-%252Fuploads%252FQ8Omd6Ll2zH7OR81p4o4%252Fimage.png%3Falt%3Dmedia%26token%3D2b71d0e2-b9ee-480f-bf30-22b251d1bcdc&width=768&dpr=1&quality=100&sign=28667628&sv=1"
            alt="Hướng dẫn bước 1"
            className="mt-4 border"
          />
        </div>

        <div className="mb-6">
          <h3 className="font-bold">Bước 2:</h3>
          <p>Điền đầy đủ các thông tin được yêu cầu:</p>
          <img
            src="https://help.divineshop.vn/~gitbook/image?url=https%3A%2F%2F532840585-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-M3-IU1k8a0MMGt6Gmx-%252Fuploads%252FsAqATZluXbA8BXtLIlfC%252FImage%2520114.png%3Falt%3Dmedia%26token%3Ded805958-09d8-4b2c-b805-2833e7fd1d5a&width=768&dpr=1&quality=100&sign=14248f18&sv=1"
            alt="Hướng dẫn bước 2"
            className="mt-4 border"
          />
        </div>

        <div className="mb-6">
          <h3 className="font-bold">Bước 3:</h3>
          <p>
            Click vào nút Tạo tài khoản. Nếu thông tin bạn điền là chính xác và
            chưa tồn tại trên hệ thống, bạn sẽ được chuyển đến trang chủ.
          </p>
          <p className="mt-2">
            Như vậy là bạn đã tạo tài khoản thành công và sẵn sàng mua hàng rồi
            đó.
          </p>

          <div className="bg-orange-100 border-l-4 border-orange-500 p-4 my-4">
            <h4 className="font-semibold">Lưu ý:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Tên đăng nhập (Username) viết liền không dấu, không chứa kí tự
                đặc biệt. Nên viết dễ đọc để nhớ.
              </li>
              <li>
                Email điền chính xác, vì các sản phẩm key game cũng như các
                thông báo quan trọng sẽ được shop gửi qua email tới khách hàng.
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <p>
              Ngoài ra nếu đã có sẵn tài khoản Google hoặc Facebook, bạn có thể
              Đăng nhập/Đăng ký nhanh chóng thông qua các nút dưới phần{" "}
              <strong>Đăng nhập qua MXH</strong>.
            </p>
          </div>
        </div>

        {/* Quy định và Quản lý tài khoản */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {" "}
          <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100">
            {" "}
            <span className="text-sm">Previous</span>{" "}
            <span className="block text-lg font-semibold">Quy định</span>{" "}
          </button>{" "}
          <button className="bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100">
            {" "}
            <span className="text-sm">Next</span>{" "}
            <span className="block text-lg font-semibold">
              Quản lý tài khoản
            </span>{" "}
          </button>{" "}
        </div>
      </main>
    </div>
  );
};

export default TurtorRegister;
