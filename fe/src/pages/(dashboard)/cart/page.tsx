import { PlusCircleFilled } from "@ant-design/icons";
import { Button, message, Popconfirm, Skeleton, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICart } from "@/common/types/cart";
import { IUser } from "@/common/types/user";
import { IGame } from "@/common/types/game";

const CartPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  // Mutation để xóa toàn bộ giỏ hàng
const { mutate } = useMutation({
  mutationFn: (cartId: number) =>
    axios.delete(`http://localhost:8080/carts/${cartId}`), // Xóa toàn bộ giỏ hàng
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["carts"] });
    messageApi.success("Xóa giỏ hàng thành công");
  },
});

  // Lấy dữ liệu giỏ hàng
  const { data: cartData, isLoading, error } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8080/carts`);
      return response.data.data.map((cart: ICart) => ({
        key: cart.cart_id,
        ...cart,
      }));
    },
  });

  // Lấy dữ liệu người dùng
  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8080/users`);
      return response.data.data;
    },
  });

  // Lấy dữ liệu game
  const { data: gameData } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8080/games`);
      return response.data.data;
    },
  });

  const columns = [
    { key: "cart_id", title: "Cart ID", dataIndex: "cart_id" },
    {
      key: "user_id",
      title: "Tên người dùng",
      dataIndex: "user_id",
      render: (user_id: number) => {
        const user = userData?.find((u: IUser) => u.user_id === user_id);
        return user ? user.username : "Unknown User";
      },
    },
    {
      key: "game_id",
      title: "Game",
      dataIndex: "games", // Sử dụng "games" thay vì "game_id"
      render: (games: { game_id: number; quantity: number }[]) => {
        if (!Array.isArray(games)) return "Unknown Game";
  
        const gameNames = games
          .map((item) => {
            const game = gameData?.find((g: IGame) => g.game_id === item.game_id);
            return game ? `${game.name} (x${item.quantity})` : "Unknown Game";
          })
          .join(", "); // Nối tên các game bằng dấu phẩy
  
        return gameNames || "Unknown Game";
      },
    },
    {
      key: "action",
      title: "Hành động",
      render: (_: any, cart: ICart) => (
        <div className="flex gap-2">
          <Popconfirm
            title="Xóa giỏ hàng?"
            description="Bạn có chắc chắn muốn xóa giỏ hàng này?"
            onConfirm={() => {
              if (cart.cart_id !== undefined) {
                mutate(cart.cart_id); // Gọi mutate để xóa giỏ hàng
              } else {
                messageApi.error("Không thể xác định cart_id");
              }
            }}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xóa Giỏ Hàng</Button>
          </Popconfirm>
          <Link to={`/admin/carts/${cart.cart_id}/edit`}>
            <Button>Cập nhật</Button>
          </Link>
        </div>
      ),
    },
  ];
  
  

  if (error) return <div>Lỗi: {error.message}</div>;

  return (
    <div>
      {contextHolder}
      <Skeleton loading={isLoading} active>
        <Table dataSource={cartData} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default CartPage;
