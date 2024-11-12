import React from "react";

interface Game {
  game_id?: number;
  brand_id?: number;
  category_id?: number[];
  platform_id?: number;
  name?: string;
  price?: number;
  discount?: number;
  rating?: number;
  image?: string;
  description?: string;
  configuration?: string;
}

interface IFAQ {
  game: Game;
}

const FAQ: React.FC<IFAQ> = ({ game }) => {
  const productDetails = [
    {
      title: "Khám Phá Vùng Đất Của Những Điều Kỳ Diệu",
      quote:
        "Thế giới chưa thấy, nơi kỳ quan lấp lánh, \nVà mỗi bước đi, một cảnh mới trải dài.",
      description:
        "Bước vào một cõi huyền bí đầy những kỳ quan và khám phá của thần thoại Trung Quốc cổ đại! Là Nhân Vật Được Định Mệnh Chọn Lựa, bạn sẽ băng qua nhiều phong cảnh tuyệt đẹp và độc đáo từ câu chuyện cổ điển, tạo nên một thiên anh hùng ca về cuộc phiêu lưu được nhìn nhận theo một cách hoàn toàn mới.",
      image: `${game.image}`,
    },
    {
      title: "Đối Mặt Với Kẻ Thù Hùng Mạnh, Cả Cũ Lẫn Mới",
      quote:
        "Hầu Vương dũng mãnh, danh vọng vang xa, \nKẻ thù trỗi dậy, thử thách danh hà.",
      description:
        'Một trong những điểm nhấn chính của "Tây Du Ký" là dàn nhân vật đối địch đa dạng, mỗi người đều có sức mạnh riêng biệt. Là Nhân Vật Được Định Mệnh Chọn Lựa, bạn sẽ gặp phải những kẻ thù hùng mạnh và những đối thủ xứng tầm trong suốt hành trình của mình. Hãy dũng cảm tham gia vào các trận chiến hoành tráng, nơi mà đầu hàng không phải là một lựa chọn.',
      image: `${game.image}`,
    },
  ];

  const systemRequirements = [
    {
      title: "Tối thiểu:",
      specs: game.configuration ? game.configuration.split("\n") : ["Không có dữ liệu"]
    }
  ];
  return (
    <main className="flex flex-col py-4 px-6 w-full max-w-[992px] min-h-[348px] mx-auto">
      <section className="mt-4 max-w-full">
        <div className="flex gap-5 flex-col lg:flex-row">
          <aside className="w-full lg:w-1/5">
            <h2 className="text-xl font-medium text-black ">
              Chi tiết sản phẩm
            </h2>
          </aside>
          <div className="w-full lg:w-4/5">
            <p className="text-sm max-w-full">{game.description}</p>

            <img
              src={game.image}
              alt="Black Myth: Wukong game visual"
              className="mt-4 w-full object-contain"
            />

            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1554b4ec495c19e5849b57253906ff240297b4df52ef51ad4ec04037eacafd7?placeholderIfAbsent=true&apiKey=b147c62d1b404bf790d7133a5bf6ed3c"
              alt="Black Myth: Wukong game visual"
              className="mt-4 w-full object-contain"
            />

            <img
              src={game.image}
              alt="Black Myth: Wukong game visual"
              className="mt-4 w-full object-contain"
            />

            {productDetails.map((detail, index) => (
              <article key={index} className="mt-4">
                <h2 className="text-xl font-bold">{detail.title}</h2>
                <p className="mt-3 italic">{detail.quote}</p>
                <p className="mt-2 leading-5">{detail.description}</p>
                {detail.image && (
                  <img
                    src={detail.image}
                    alt={detail.title}
                    className="mt-4 w-full object-contain"
                  />
                )}
              </article>
            ))}

            <h2 className="mt-6 text-xl font-bold">Cấu hình yêu cầu:</h2>
            {systemRequirements?.length > 0 ? (
              systemRequirements.map((requirement, index) => (
                <div key={index} className="mt-4">
                  <h3 className="text-base font-bold">{requirement.title}</h3>
                  <ul className="list-disc list-inside">
                    {requirement.specs?.length > 0 ? (
                      requirement.specs.map((spec, specIndex) => (
                        <li key={specIndex}>{spec}</li>
                      ))
                    ) : (
                      <li>Không có dữ liệu</li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p>Không có dữ liệu cấu hình yêu cầu</p>
            )}
          </div>
        </div>
      </section>

      <footer className="mt-8 text-right font-medium text-black">
        Rating : 4.9 ⭐ (68 Votes)
      </footer>
    </main>
  );
};

export default FAQ;
