import { Card, Skeleton, Image, Button } from "antd";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";

interface Tintuc {
  tintuc_id?: number;
  title?: string;
  description_id?: string;
  image?: string;
  categorynew_id?: number[]; // Mảng categorynew_id
}

interface CategoryNew {
  categorynew_id: number;
  name: string;
}

const NewsPage = () => {
  // Fetch danh sách tin tức
  const { data: tintucs, isLoading: isLoadingTintucs, error: tintucError } = useQuery<Tintuc[]>({
    queryKey: ["tintucs"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/tintucs");
      return data.data;
    },
  });

  // Fetch danh sách danh mục
  const { data: categories, isLoading: isLoadingCategories, error: categoryError } = useQuery<CategoryNew[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/categorynews");
      return data.data;
    },
  });

  if (tintucError || categoryError) {
    return <div>Lỗi: {(tintucError || categoryError)?.message}</div>;
  }

  // Tạo một map từ categorynew_id => name
  const categoryMap = categories?.reduce((acc, category) => {
    acc[category.categorynew_id] = category.name;
    return acc;
  }, {} as Record<number, string>);

  // Nhóm tin tức theo danh mục (dành cho tất cả `categorynew_id`)
  const groupedTintucs: Record<number, Tintuc[]> = {};

  tintucs?.forEach((tintuc) => {
    tintuc.categorynew_id?.forEach((id) => {
      if (!groupedTintucs[id]) groupedTintucs[id] = [];
      groupedTintucs[id].push(tintuc);
    });
  });

  // State theo dõi số lượng tin tức hiển thị
  const [gamesToShow, setGamesToShow] = useState<{ [categoryId: number]: number }>({});

  // Hàm xử lý "Hiện thêm" để tải thêm tin tức cho mỗi danh mục
  const handleLoadMore = (categoryId: number) => {
    setGamesToShow((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] ? prev[categoryId] + 6 : 6, // Tăng 4 tin tức mỗi lần nhấn
    }));
  };

  return (
    <div className="bg-gray-100 p-6 mx-auto w-[1048px]">
      <Skeleton loading={isLoadingTintucs || isLoadingCategories} active>
        {/* Hiển thị danh mục và các tin tức liên quan */}
        {Object.entries(groupedTintucs).map(([categoryId, tintucs]) => {
          const categoryIdNumber = Number(categoryId);
          const gamesToDisplay = (tintucs as Tintuc[]).slice(0, gamesToShow[categoryIdNumber] || 6); // Hiển thị 6 tin tức mặc định

          return (
            <div key={categoryId} className="mb-8">
              {/* Tra cứu tên danh mục trong categoryMap */}
              <h2 className="text-md font-semibold mb-4">
                {categoryMap?.[categoryIdNumber] || "Không xác định"}
              </h2>
              <div className="game-grid grid grid-cols-3 gap-4">
                {(gamesToDisplay as Tintuc[]).map((tintuc) => (
                  <div className="game" key={tintuc.tintuc_id}>
                    <Card
                      hoverable
                      cover={
                        <Link to={`/tintucs/${tintuc.tintuc_id}`}>
                          <Image
                            src={tintuc.image}
                            alt={tintuc.title}
                            width={322.53}
                            height={150}
                            style={{ objectFit: "cover" }}
                          />
                        </Link>
                      }
                    >
                      {tintuc.title}
                    </Card>
                  </div>
                ))}
              </div>

              {/* Nút "Load More" */}
              {tintucs.length > gamesToDisplay.length && (
                <Button
                  onClick={() => handleLoadMore(categoryIdNumber)}
                  className="load-more-button"
                  style={{ marginTop: "20px" }}
                >
                  Hiện thêm
                </Button>
              )}
            </div>
          );
        })}
      </Skeleton>
    </div>
  );
};

export default NewsPage;
