import React from 'react';

interface Game {
  game_id?: number;
  brand_id?: number;
<<<<<<< HEAD
  category_id?: number;
=======
  category_id?: number[];
>>>>>>> bfa8d29fece0b1c69aa8c3f83c309452f427856f
  platform_id?: number;
  name?: string;
  price?: number;
  discount?: number;
  rating?: number;
  image?: string;
  description?: string;
}

interface IFAQ {
  game: Game;
}

<<<<<<< HEAD
const FAQ: React.FC<IFAQ> = ({ game }) => {
=======
const FAQ: React.FC<IFAQ> = ({ game  }) => {
>>>>>>> bfa8d29fece0b1c69aa8c3f83c309452f427856f
  const productDetails = [
    {
      title: "Khám Phá Vùng Đất Của Những Điều Kỳ Diệu",
      quote: "Thế giới chưa thấy, nơi kỳ quan lấp lánh, \nVà mỗi bước đi, một cảnh mới trải dài.",
      description: "Bước vào một cõi huyền bí đầy những kỳ quan và khám phá của thần thoại Trung Quốc cổ đại! Là Nhân Vật Được Định Mệnh Chọn Lựa, bạn sẽ băng qua nhiều phong cảnh tuyệt đẹp và độc đáo từ câu chuyện cổ điển, tạo nên một thiên anh hùng ca về cuộc phiêu lưu được nhìn nhận theo một cách hoàn toàn mới.",
<<<<<<< HEAD
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/f0be825c492ca89df53acc3616459778855705722a0d37fd73bcebcfa62eeb93?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
=======
      image: `${game.image}`
>>>>>>> bfa8d29fece0b1c69aa8c3f83c309452f427856f
    },
    {
      title: "Đối Mặt Với Kẻ Thù Hùng Mạnh, Cả Cũ Lẫn Mới",
      quote: "Hầu Vương dũng mãnh, danh vọng vang xa, \nKẻ thù trỗi dậy, thử thách danh hà.",
      description: "Một trong những điểm nhấn chính của \"Tây Du Ký\" là dàn nhân vật đối địch đa dạng, mỗi người đều có sức mạnh riêng biệt. Là Nhân Vật Được Định Mệnh Chọn Lựa, bạn sẽ gặp phải những kẻ thù hùng mạnh và những đối thủ xứng tầm trong suốt hành trình của mình. Hãy dũng cảm tham gia vào các trận chiến hoành tráng, nơi mà đầu hàng không phải là một lựa chọn.",
<<<<<<< HEAD
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d400c09695fedc6f585b7ca4403d1e048c94639756f942e92e7f95ff3360f4ca?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
=======
      image: `${game.image}`
>>>>>>> bfa8d29fece0b1c69aa8c3f83c309452f427856f
    },
  ];

  const systemRequirements = [
    {
      title: "Tối thiểu:",
      specs: [
        "Yêu cầu vi xử lý và hệ điều hành đều chạy 64-bit",
        "HĐH: Windows 10 64-bit",
        "Bộ xử lý: Intel Core i5-8400 / AMD Ryzen 5 1600",
        "Bộ nhớ: 16 GB RAM",
        "Đồ họa: NVIDIA GeForce GTX 1060 6GB / AMD Radeon RX 580 8GB",
        "DirectX: Phiên bản 11",
        "Lưu trữ: 130 GB chỗ trống khả dụng",
        "Card âm thanh: Windows Compatible Audio Device",
        "Ghi chú thêm: HDD Supported, SSD Recommended. The above specifications were tested with DLSS/FSR/XeSS enabled."
      ]
    },
   
  ];
  return (
    <main className="flex flex-col py-4 px-6 w-full max-w-[992px] min-h-[348px] mx-auto">
      <section className="flex flex-col p-4 bg-neutral-200 text-sm text-black rounded-md border border-zinc-500 max-w-full">
        <p className="leading-5">
          - Đây là tài khoản Steam tạo sẵn đã mua game <span className="font-medium">Black Myth: Wukong Standard Version.</span> Sau khi mua bạn sẽ nhận được thông tin tài khoản để đăng nhập. <span className="font-medium text-red-500">Vui lòng không thay đổi thông tin tài khoản</span>
        </p>
        <p className="mt-2 font-medium">- Giá thuê tài khoản tính theo ngày. Ví dụ bạn muốn mua 5 ngày thì chọn số lượng sản phẩm là 5.</p>
        <p className="mt-2">- Divine Shop cam kết chỉ cho 1 khách hàng thuê tại 1 thời điểm. Không bị người khác login làm gián đoạn trong khi chơi.</p>
        <p className="mt-2">- Tài khoản có thể đã có File Save sẵn, bạn có thể xóa đi và chơi từ đầu.</p>
        <p className="mt-2">- Thuê tối thiểu 3 ngày.</p>
      </section>

      <section className="mt-4 max-w-full">
        <div className="flex gap-5 flex-col lg:flex-row">
          <aside className="w-full lg:w-1/5">
            <h2 className="text-xl font-medium text-black">Chi tiết sản phẩm</h2>
          </aside>
          <div className="w-full lg:w-4/5">
            <p className="text-sm max-w-full">
              {game.description}
            </p>
<<<<<<< HEAD
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1554b4ec495c19e5849b57253906ff240297b4df52ef51ad4ec04037eacafd7?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c" alt="Black Myth: Wukong game visual" className="mt-4 w-full object-contain" />
=======
            <img src={game.image} alt="Black Myth: Wukong game visual" className="mt-4 w-full object-contain" />
>>>>>>> bfa8d29fece0b1c69aa8c3f83c309452f427856f
            
            {productDetails.map((detail, index) => (
              <article key={index} className="mt-4">
                <h2 className="text-xl font-bold">{detail.title}</h2>
                <p className="mt-3 italic">{detail.quote}</p>
                <p className="mt-2 leading-5">{detail.description}</p>
                {detail.image && <img src={detail.image} alt={detail.title} className="mt-4 w-full object-contain" />}
              </article>
            ))}

            <h2 className="mt-6 text-xl font-bold">Cấu hình yêu cầu:</h2>
            {systemRequirements.map((requirement, index) => (
              <div key={index} className="mt-4">
                <h3 className="text-base font-bold">{requirement.title}</h3>
                <ul className="list-disc list-inside">
                  {requirement.specs.map((spec, specIndex) => (
                    <li key={specIndex}>{spec}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-medium text-black">Chính sách bảo hành</h2>
        <p className="mt-2">- Đổi mới sản phẩm khác nếu lỗi trong quá trình sử dụng hoặc hoàn tiền nếu không có sản phẩm bảo hành.</p>
        <p className="mt-2">- Không hỗ trợ bảo hành trong trường hợp khách hàng vi phạm chính sách của Steam và khách hàng bán lại tài khoản.</p>
      </section>

      <footer className="mt-8 text-right font-medium text-black">
        Rating : 4.9 ⭐ (68 Votes)
      </footer>
    </main>
  );
};

export default FAQ;
