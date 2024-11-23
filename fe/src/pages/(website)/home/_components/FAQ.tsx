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
  description_id?: number,
  configuration?: string;
}


interface IFAQ {
  game: Game;
}

const FAQ: React.FC<IFAQ> = ({ game }) => {
  const productDetails = [
    {
      title: "Cốt truyện :",
      description: `${game.description_id}`,
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
      specs: game.configuration
        ? game.configuration.split("\n")
        : ["Không có dữ liệu"],
    },
  ];
  return (
    <main className="flex flex-col py-4 px-6 w-full max-w-[992px] min-h-[348px] mx-auto">
      <section className="mt-4 max-w-full">
        <div className="flex gap-5 flex-col lg:flex-row">
          <h2 className="text-xl font-medium text-black ">
            Chi tiết sản phẩm :
          </h2>
          
        </div>
      </section>

      <footer className="mt-8 text-right font-medium text-black">
        Rating : 4.9 ⭐ (68 Votes)
      </footer>
    </main>
  );
};

export default FAQ;
