import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// Định nghĩa các interface
interface Description {
  description_id?: number[]; // Sử dụng mảng số để lưu các description_id
  name?: string;
  descriptiondetail_id?: number;
}

interface DescriptionDetail {
  descriptiondetail_id?: number;
  name?: string;
  content?: string;
  image?: string;
  updateAt?: string;
}

const NewsDetailPage = () => {
  const { tintuc_id } = useParams(); // Lấy ID bài viết từ URL
  const [description, setDescription] = useState<Description[] | null>([]);
  const [descriptionDetail, setDescriptionDetail] = useState<DescriptionDetail[] | null>([]);
  const [data, setData] = useState<any | null>(null); // Dữ liệu bài viết
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  console.log('gido', relatedPosts)


  // Fetch dữ liệu chi tiết bài viết từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tintucs/${tintuc_id}`);
        setData(response.data.data);
        setIsLoading(false);
      } catch (err) {  //eroroo
        setError("Lỗi khi tải dữ liệu bài viết.");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [tintuc_id]);

  // Fetch mô tả từ các description_id
  useEffect(() => {
    const fetchDescriptions = async () => {
      if (data && Array.isArray(data.description_id) && data.description_id.length > 0) {
        try {
          const descriptionDetails = await Promise.all(
            data.description_id.map(async (id: any) => {
              const response = await axios.get<{ data: Description[] }>(
                `http://localhost:8080/descriptions/${id}`
              );
              return response.data.data;
            })
          );

          // Kết hợp tất cả kết quả mô tả
          setDescription(descriptionDetails.flat());

          // Lấy tất cả descriptiondetails từ descriptiondetail_id
          const allDescriptionDetailIds = descriptionDetails
            .map((desc) => desc.descriptiondetail_id)
            .flat()
            .filter((id) => id !== undefined);

          if (allDescriptionDetailIds.length > 0) {
            const descriptionDetailResponse = await axios.get<{ data: DescriptionDetail[] }>(
              `http://localhost:8080/descriptiondetails/${allDescriptionDetailIds.join(",")}`
            );
            setDescriptionDetail(descriptionDetailResponse.data.data);
          }
        } catch (error) {
          console.error("Lỗi khi tải mô tả hoặc chi tiết mô tả:", error);
        }
      }
    };

    fetchDescriptions();
  }, [data]);

  // Fetch danh mục từ các categorynew_id
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        // Lấy chi tiết bài viết
        const response = await axios.get<{ data: any }>(`http://localhost:8080/tintucs/${tintuc_id}`);
        const articleData = response.data.data;

        console.log('id', articleData)

        // Lấy các bài viết liên quan
        const relatedResponse = await axios.get<{ data: any[] }>(
          `http://localhost:8080/tintucs?categorynew_id=${articleData.categorynew_id.join(",")}`
        );
        console.log('relatedResponse', relatedResponse.data.data);


        // Lọc bài viết liên quan
        const relatedPostsList = relatedResponse.data.data.filter((relatedPost) => {

          console.log('Checking post', relatedPost);  // Kiểm tra bài viết đang được kiểm tra
          console.log('Related categories', relatedPost.categorynew_id);  // Kiểm tra categorynew_id của bài viết liên quan
          console.log('Article categories', articleData.categorynew_id);  // Kiểm tra categorynew_id của bài viết hiện tại

          return (
            relatedPost.tintuc_id !== articleData.tintuc_id &&
            Array.isArray(relatedPost.categorynew_id) &&  // Đảm bảo categorynew_id là mảng
            relatedPost.categorynew_id.some((catId: any) => articleData.categorynew_id.includes(catId)) // Kiểm tra trùng category
          );
        });

        // Cập nhật state với danh sách bài viết liên quan
        setRelatedPosts(relatedPostsList);

      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    if (tintuc_id) {
      fetchRelatedPosts();
    }
  }, [tintuc_id]);




  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main">
      <div className="main-container">
        <div className="left-column">
          <h1 className="title1">{data?.title}</h1>
          <div className="post-info1">
            <span>By {data?.author || "N/A"}</span> | <span>{data?.date}</span>
          </div>
          <img
            src={data?.image || "https://via.placeholder.com/800x400"}
            alt={data?.title}
            className="main-image1"
          />
          <p className="content1">{data?.content}</p>
          {/* Hiển thị mô tả sản phẩm */}
          {description && description.length > 0 && (
            <div className="mt-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Mô tả bài viết</h2>
              {description.map((desc) => (
                <div key={desc.description_id ? desc.description_id[0] : "default-key"} className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  {/* Kiểm tra xem descriptiondetail_id có phải là mảng và có chứa descriptiondetail_id không */}
                  {Array.isArray(desc.descriptiondetail_id) && desc.descriptiondetail_id.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-xl font-semibold text-gray-700 mb-3">Description Details</h4>
                      {descriptionDetail && descriptionDetail.length > 0 && (
                        <ul className="space-y-4">
                          {descriptionDetail
                            .filter((detail) =>
                              Array.isArray(desc.descriptiondetail_id) &&
                              desc.descriptiondetail_id.includes(detail.descriptiondetail_id)
                            )
                            .map((detail) => (
                              <li key={detail.descriptiondetail_id} className="border-t pt-4">
                                <h5 className="text-xl font-medium text-gray-800">{detail.name}</h5>
                                <p className="text-gray-600">{detail.content}</p>
                                {detail.image && (
                                  <img
                                    src={detail.image}
                                    alt={detail.name}
                                    className="mt-2 w-full max-w-xs rounded-md"
                                  />
                                )}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="right-column">
          <div className="advertisement1">
            <p>YouTube Premium - 59K 2 tháng</p>
          </div>

          <div className="popular-posts1">
            <h2>Bài viết phổ biến</h2>
            <ul>
              {relatedPosts.length > 0 ? (
                relatedPosts.map((post) => (
                  <li key={post.tintuc_id}>
                    <Link to={`/tintucs/${post.tintuc_id}`} className="post-link flex items-center">
                      <img src={post.image} width={110} alt={post.title} className="post-image" />
                      <div style={{ marginLeft: "5px", fontSize: "14px", color: "black" }}>
                        <p className="post-title">{post.title}</p>
                        <p className="post-date">{new Date(post.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li>Không có bài viết liên quan</li>
              )}
            </ul>
          </div>



        </div>
      </div>


    </div>
  );
};

export default NewsDetailPage;
