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
import { IDescription } from "@/common/types/description";
import { IKey } from "@/common/types/key";

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

  const [brands, setBrands] = useState<IBrand[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [platforms, setPlatforms] = useState<IPlatform[]>([]);
  const [filters, setFilter] = useState<IFilter[]>([]);
  const [keys, setKey] = useState<IKey[]>([]);
  const [descriptions, setDescription] = useState<IDescription[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/brands/")
      .then((response) => response.json())
      .then((data) => setBrands(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu brands:", error));

    fetch("http://localhost:8080/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) =>
        console.error("Lỗi khi lấy dữ liệu categories:", error)
      );

    fetch("http://localhost:8080/platforms/")
      .then((response) => response.json())
      .then((data) => setPlatforms(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu platforms:", error));

    fetch("http://localhost:8080/filters/")
      .then((response) => response.json())
      .then((data) => setFilter(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu filters:", error));

    fetch("http://localhost:8080/descriptions/")
      .then((response) => response.json())
      .then((data) => setDescription(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu descriptions:", error));

    fetch("http://localhost:8080/keys/")
      .then((response) => response.json())
      .then((data) => setKey(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu keys:", error));
  }, []);

  if (error) return <div>Lỗi: {error.message}</div>;

  const columns = [
    { key: "game_id", title: "Game_ID", dataIndex: "game_id" },
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
          const category = categories.find(
            (c) => c.category_id === category_id
          );
          return category ? category.name : "Thể loại không xác định";
        }
      },
      ellipsis: true,
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
      ellipsis: true,
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
      },
      ellipsis: true,
    },
    {
      key: "description_id",
      title: "mô tả",
      dataIndex: "description_id",
      render: (description_id: any) => {
        if (isLoading || !descriptions.length) {
          return "Đang tải danh mục..."; // Nếu dữ liệu chưa có
        }

        if (Array.isArray(description_id)) {
          return description_id
            .map((id) => {
              const description = descriptions.find((c) => c.description_id === id);
              return description ? description.name : "mô tả không xác định";
            })
            .join(", ");
        } else {
          const description = descriptions.find(
            (c) => c.description_id === description_id
          );
          return description ? description.name : "mô tả không xác định";
        }
      },
      ellipsis: true,
    },
    { key: "name", title: "Game", dataIndex: "name" },
    {
      key: "final_price",
      title: "Giá cuối cùng",
      dataIndex: "final_price",
      render: (final_price: any) => {
        return final_price
          ? `${final_price.toLocaleString()}đ`
          : "Chưa có giá cuối cùng";
      },
    },
    {
      key: "image",
      title: "Ảnh",
      render: (_: any, game: any) => (
        <Image src={game.image} width={100} height={100} />
      ),
    },
    // Thêm cột keys
    {
      key: "key_id",
      title: "Keys",
      dataIndex: "key_id",
      render: (key_id: any) => {
        if (isLoading || !keys.length) {
          return "Đang tải keys..."; // Nếu dữ liệu chưa có
        }

        // Nếu `key_id` là mảng, đếm tổng số lượng keys
        if (Array.isArray(key_id)) {
          return `Tổng số keys: ${key_id.length}`;
        } else {
          // Nếu là một key duy nhất, hiển thị số 1
          return `Tổng số keys: 1`;
        }
      },
      ellipsis: true,
    },

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
