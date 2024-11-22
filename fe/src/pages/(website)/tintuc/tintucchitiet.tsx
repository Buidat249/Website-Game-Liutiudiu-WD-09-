import { Skeleton, Image, Button } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BackwardFilled } from "@ant-design/icons";

const NewsDetailPage = () => {
  const { tintuc_id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["tintuc", tintuc_id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/tintucs/${tintuc_id}`
      );
      return data.data; // Trả về chi tiết bài viết
    },
  });

  if (error) return <div>Lỗi: {error.message}</div>;

  return (
    <div
      style={{
        paddingRight:"600px",
        padding: "20px",
        textAlign: "center",
        marginLeft: "250px"
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <Button type="primary">
          <Link to="/tintucs">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <h1 className="text-3xl font-bold mb-5">{data?.title}</h1>
        <Image src={data?.image} alt={data?.title}/>
        <p className="mt-5">{data?.content}</p>
        <p>{data?.description_id}</p>
      </Skeleton>
    </div>
  );
};

export default NewsDetailPage;
