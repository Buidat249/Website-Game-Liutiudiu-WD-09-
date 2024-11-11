import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Image, message, Popconfirm, Skeleton, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBrand } from "@/common/types/brand";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { ICategory } from "@/common/types/category";
import { IPlatform } from "@/common/types/platform";

const GamePage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (game_id: number) =>
      axios.delete(`http://localhost:8080/games/${game_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["games"],
      });
      messageApi.success("Xóa thành công");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/games`);
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((game: any) => ({
        key: game.game_id,
        ...game,
      }));
    },
  });

  const [brands, setBrands] = useState<IBrand[]>([]); // Ensure brands is initialized as an array

  useEffect(() => {
    // Fetch dữ liệu brands từ backend
    fetch("http://localhost:8080/brands/") // Thay đường dẫn API phù hợp
      .then((response) => response.json())
      .then((data) => {
        console.log("Brands fetched:", data.data); // Inspect the response
        setBrands(data.data);
      })
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  const [categories, setCategories] = useState<ICategory[]>([]); // Ensure categories is initialized as an array

  useEffect(() => {
    // Fetch dữ liệu categories từ backend
    fetch("http://localhost:8080/categories/") // Thay đường dẫn API phù hợp
      .then((response) => response.json())
      .then((data) => {
        console.log("Categories fetched:", data.data); // Inspect the response
        setCategories(data.data);
      })
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  const [platforms, setPlatforms] = useState<IPlatform[]>([]); // Ensure platforms is initialized as an array

  useEffect(() => {
    // Fetch dữ liệu categories từ backend
    fetch("http://localhost:8080/platforms/") // Thay đường dẫn API phù hợp
      .then((response) => response.json())
      .then((data) => {
        console.log("Platforms fetched:", data.data); // Inspect the response
        setPlatforms(data.data);
      })
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);
  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "game_id", title: "Game ID", dataIndex: "game_id" },
    {
      key: "brand_id",
      title: "Hãng phát triển",
      dataIndex: "brand_id",
      render: (brand_id: any) => {
        if (Array.isArray(brand_id)) {
          return brand_id
            .map((id) => {
              const brand = brands.find((b) => b.brand_id === id);
              return brand ? brand.name : "Unknown Brand";
            })
            .join(", ");
        } else {
          const brand = brands.find((b) => b.brand_id === brand_id);
          return brand ? brand.name : "Unknown Brand";
        }
      }
    },
    {
        key: "category_id",
        title: "Danh mục",
        dataIndex: "category_id",
        render: (category_id: any) => {
            if (Array.isArray(category_id)) {
              return category_id
                .map((id) => {
                  const category = categories.find((c) => c.category_id === id);
                  return category ? category.name : "Unknown Category";
                })
                .join(", ");
            } else {
              const category = categories.find((c) => c.category_id === category_id);
              return category ? category.name : "Unknown Category";
            }
          }
      },
      {
        key: "platform_id",
        title: "Nền tảng",
        dataIndex: "platform_id",
        render: (platform_id: any) => {
            if (Array.isArray(platform_id)) {
              return platform_id
                .map((id) => {
                  const platform = platforms.find((p) => p.platform_id === id);
                  return platform ? platform.name : "Unknown Platform";
                })
                .join(", ");
            } else {
              const platform = platforms.find((p) => p.platform_id === platform_id);
              return platform ? platform.name : "Unknown Platform";
            }
          }
      },
    { key: "name", title: "Game", dataIndex: "name" },
    { key: "price", title: "Gía", dataIndex: "price" },
    { key: "discount", title: "Giảm giá", dataIndex: "discount" },
    { key: "rating", title: "Đánh giá", dataIndex: "rating" },
    {
      key: "image", title: "Ảnh", 
      render: (_: any, game: any) => (
          <Image src={game.image} width={100} height={100} />
      ),
    },
    { key: "description", title: "Mô tả", dataIndex: "description" },
    {
      key: "action",
      title: "Action",
      render: (_: any, game: any) => {
        return (
          <>
            <Popconfirm
              title="Delete the task"
              description="Bạn có chắc muốn xóa không?"
              onConfirm={() => {
                console.log("Deleting game with ID:", game.game_id); // kiểm tra game_id
                mutate(game.game_id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
            <Link to={`/admin/games/${game.game_id}/edit`}>
              <Button>Cập nhật</Button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Quản lý game</h1>
        <Button type="primary">
          <Link to="/admin/games/add">
            <PlusCircleFilled /> Thêm game
          </Link>
        </Button>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default GamePage;
