import React from "react";

const   Recharge =() => {
  
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Hướng dẫn nạp tiền</h1>
      <p className="text-gray-700 mb-4">
        Bài viết sẽ hướng dẫn cách thức nạp tiền từ các hình thức thanh toán khác nhau trên website Divine Shop.
      </p>
      <h2 className="text-xl font-semibold mb-2">Tổng quan</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Chuyển khoản ngân hàng 24/7</li>
        <li>Thanh toán qua VNPAY-QR</li>
        <li>Nạp tiền tự động thông qua thẻ ATM</li>
        <li>Thanh toán bằng thẻ thanh toán quốc tế (VISA, MasterCard, JCB)</li>
        <li>Nạp số dư tự động thông qua MoMo</li>
        <li>Nạp tiền bằng thẻ cào Viettel</li>
      </ul>
      <h1 className="text-2xl font-bold mb-4">Hướng dẫn thực hiện</h1>
      <p className="mb-4 text-gray-700">
        Bài viết sẽ hướng dẫn cách thức nạp tiền từ các hình thức thanh toán khác nhau trên website Divine Shop.
      </p>
      <h2 className="text-xl font-semibold mb-2">Bước 1: Cách nạp tiền</h2>
      <p className="mb-4">Bạn có thể click vào ô <span className="text-blue-500">Nạp tiền</span> theo hình ảnh dưới đây:</p>
      <img
        src="https://help.divineshop.vn/~gitbook/image?url=https%3A%2F%2F532840585-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-M3-IU1k8a0MMGt6Gmx-%252Fuploads%252F9puZVeeazwTqGA8WGZIE%252FSCR-20240615-tyzg.png%3Falt%3Dmedia%26token%3Def190880-06ff-4690-aca7-ae471fae41f9&width=768&dpr=4&quality=100&sign=dd89cb81&sv=1" // Thay bằng URL ảnh thực tế
        alt="Hướng dẫn nạp tiền"
        className="border rounded mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Bước 2: Chọn hình thức thanh toán</h2>
      <p className="mb-4">Sau khi đến trang nạp tiền, hãy chọn 1 trong các hình thức thanh toán phù hợp.</p>
      <img
        src="https://help.divineshop.vn/~gitbook/image?url=https%3A%2F%2F532840585-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-M3-IU1k8a0MMGt6Gmx-%252Fuploads%252FCdHyXOx9y0Wv3r4haZhd%252FSCR-20240615-ubat.png%3Falt%3Dmedia%26token%3Dd06e4c5c-5e30-4f38-9478-84bee02e543f&width=768&dpr=4&quality=100&sign=1e1faa17&sv=1" // Thay bằng URL ảnh thực tế
        alt="Chọn hình thức thanh toán"
        className="border rounded"
      />
    </div>
  );
};

export default Recharge;
