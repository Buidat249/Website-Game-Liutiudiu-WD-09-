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
    <div className="">
      <div
        style={{

        }}
      >
        <h1
          style={{
            paddingRight: "1500px",
            fontSize: "23px",
            fontWeight: "bold",
          }}
        >
          Tin nổi bật
        </h1>
        <Skeleton loading={isLoading} active>
          <div className="news-container">
            {tintucs?.map((tintuc) => (
              <div className="news-card">
                <Card
                  key={tintuc.tintuc_id}
                  hoverable
                  cover={
                    <Link to={`/tintucs/${tintuc.tintuc_id}`}>
                      <Image
                        src={tintuc.image}
                        alt={tintuc.title}
                        className="news-image"
                      />
                    </Link>
                  }
                ></Card>
                <div className="news-content">
                  <Card.Meta
                    title={
                      <Link
                        to={`/tintucs/${tintuc.tintuc_id}`}
                        className="news-title"
                      >
                        {tintuc.title}
                      </Link>
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </Skeleton>
      </div>
      <div
        style={{

        }}
      >
        <h1
          style={{
            marginRight: "1500px",
            fontSize: "23px",
            fontWeight: "bold",
          }}
        >
          Tin hot
        </h1>
        <Skeleton loading={isLoading} active>
          <div className="news-container">
            {tintucs?.map((tintuc) => (
              <div className="news-card">
                <Card
                  key={tintuc.tintuc_id}
                  hoverable
                  cover={
                    <Link to={`/tintucs/${tintuc.tintuc_id}`}>
                      <Image
                        src={tintuc.image}
                        alt={tintuc.title}
                        className="news-image"
                      />
                    </Link>
                  }
                ></Card>
                <div className="news-content">
                  <Card.Meta
                    title={
                      <Link
                        to={`/tintucs/${tintuc.tintuc_id}`}
                        className="news-title"
                      >
                        {tintuc.title}
                      </Link>
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </Skeleton>
      </div>
      <div
        style={{

        }}
      >
        <h1
          style={{
            marginRight: "1500px",
            fontSize: "23px",
            fontWeight: "bold",
          }}
        >
          Tin mới
        </h1>
        <Skeleton loading={isLoading} active>
          <div className="news-container">
            {tintucs?.map((tintuc) => (
              <div className="news-card">
                <Card
                  key={tintuc.tintuc_id}
                  hoverable
                  cover={
                    <Link to={`/tintucs/${tintuc.tintuc_id}`}>
                      <Image
                        src={tintuc.image}
                        alt={tintuc.title}
                        className="news-image"
                      />
                    </Link>
                  }
                ></Card>
                <div className="news-content">
                  <Card.Meta
                    title={
                      <Link
                        to={`/tintucs/${tintuc.tintuc_id}`}
                        className="news-title"
                      >
                        {tintuc.title}
                      </Link>
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </Skeleton>
      </div>
    </div>
  );
};

export default NewsPage;
