import { PlusCircleFilled } from "@ant-design/icons";
import { Button, Image, message, Popconfirm, Skeleton, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IBrand } from "@/common/types/brand";
import { IFilter } from "@/common/types/filter";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICategory } from "@/common/types/category";
import { IPlatform } from "@/common/types/platform";
<<<<<<< HEAD
=======

type Props = {};
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c

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
<<<<<<< HEAD
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
=======
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
      return data.data.map((game: any) => ({
        key: game.game_id,
        ...game,
      }));
    },
  });

  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [platforms, setPlatforms] = useState<IPlatform[]>([]);
  const [filters, setFilter] = useState<IFilter[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/brands/")
      .then((response) => response.json())
      .then((data) => setBrands(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu brands:", error));

    fetch("http://localhost:8080/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu categories:", error));

    fetch("http://localhost:8080/platforms/")
      .then((response) => response.json())
      .then((data) => setPlatforms(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu platforms:", error));

      fetch("http://localhost:8080/filters/")
      .then((response) => response.json())
      .then((data) => setFilter(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu filter:", error));
  }, []);

  if (error) return <div>Lỗi: {error.message}</div>;

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
              return brand ? brand.name : "Hãng không xác định";
            })
            .join(", ");
        } else {
          const brand = brands.find((b) => b.brand_id === brand_id);
          return brand ? brand.name : "Hãng không xác định";
        }
      },
    },
    {
      key: "category_id",
      title: "Thể loại",
      dataIndex: "category_id",
      render: (category_id: any) => {
        if (isLoading || !categories.length) {
          return "Đang tải danh mục..."; // Nếu dữ liệu chưa có
        }

        if (Array.isArray(category_id)) {
          return category_id
            .map((id) => {
              const category = categories.find((c) => c.category_id === id);
              return category ? category.name : "Thể loại không xác định";
            })
            .join(", ");
        } else {
          const category = categories.find((c) => c.category_id === category_id);
          return category ? category.name : "Thể loại không xác định";
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
              return platform ? platform.name : "Nền tảng không xác định";
            })
            .join(", ");
        } else {
          const platform = platforms.find((p) => p.platform_id === platform_id);
          return platform ? platform.name : "Nền tảng không xác định";
        }
      },
<<<<<<< HEAD
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
=======
    },
    {
      key: "filter_id",
      title: "Danh mục",
      dataIndex: "filter_id",
      render: (filter_id: any) => {
        if (Array.isArray(filter_id)) {
          return filter_id
            .map((id) => {
              const filter = filters.find((p) => p.filter_id === id);
              return filter ? filter.name : "Danh mục không xác định";
            })
            .join(", ");
        } else {
          const filter = filters.find((p) => p.filter_id === filter_id);
          return filter ? filter.name : "Danh mục không xác định";
        }
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
      },
    },
    { key: "name", title: "Game", dataIndex: "name" },
    { key: "price", title: "Gía", dataIndex: "price" },
    { key: "discount", title: "Giảm giá", dataIndex: "discount" },
    { key: "rating", title: "Đánh giá", dataIndex: "rating" },
    {
<<<<<<< HEAD
      key: "image", title: "Ảnh", 
      render: (_: any, game: any) => (
          <Image src={game.image} width={100} height={100} />
      ),
=======
      key: "image",
      title: "Image",
      render: (_: any, game: any) => <Image src={game.image} width={100} height={100} />,
>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
    },
    { key: "description", title: "Mô tả", dataIndex: "description" },
    {
      key: "action",
      title: "Hành động",
      render: (_: any, game: any) => {
        return (
          <>
            <div className="flex gap-2">
              <Popconfirm
                title="Xóa tác vụ"
                description="Bạn có chắc muốn xóa không?"
                onConfirm={() => {
                  mutate(game.game_id);
                }}
                okText="Có"
                cancelText="Không"
              >
                <Button danger>Xóa</Button>
              </Popconfirm>
              <Link to={`/admin/games/${game.game_id}/edit`}>
                <Button>Cập nhật</Button>
              </Link>
            </div>
          </>
        );
      },
    },
  ];

<<<<<<< HEAD
=======

  if (isLoading) return <div>...Đang tải</div>;

>>>>>>> 1a28ab342f0403d237e4ae4c16aedbd46e6cf76c
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
