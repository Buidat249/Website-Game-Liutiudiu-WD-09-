import { Card, Skeleton, Image } from "antd";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";

interface Tintuc {
  tintuc_id?: number;
  title?: string;
  description_id?: string;
  image?: string;
}

const NewsPage = () => {
  // Fetch dữ liệu tin tức bằng React Query
  const {
    data: tintucs,
    isLoading,
    error,
  } = useQuery<Tintuc[]>({
    queryKey: ["tintucs"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/tintucs");
      return data.data; // Đảm bảo trả về mảng tin tức
    },
  });

  if (error) return <div>Lỗi: {(error as Error).message}</div>;

  return (
    <div className=" bg-gray-100 p-6 mx-auto w-[1048px]">
      <div>
        <h1 className="text-lg font-bold mb-4">
          Tin nổi bật
        </h1>
        <Skeleton loading={isLoading} active>
          <div className="game-grid">
            {tintucs?.map((tintuc) => (
              <div className="game">
                <Card
                  key={tintuc.tintuc_id}
                  hoverable
                  cover={
                    <Link to={`/tintucs/${tintuc.tintuc_id}`}>
                      <Image
                        src={tintuc.image}
                        alt={tintuc.title}
                        width={233.8}
                        
                      />
                    </Link>
                  }
                >{tintuc.title}</Card>
              </div>
            ))}
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default NewsPage;
