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
import { IGame } from "@/common/types/game";
import { ICart } from "@/common/types/cart";
import { IUser } from "@/common/types/user";

const CartPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (cart_id: number) =>
      axios.delete(`http://localhost:8080/carts/${cart_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carts"],
      });
      messageApi.success("Xóa thành công");
    },
  });

  const { data: cartData, isLoading, error } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const cartResponse = await axios.get(`http://localhost:8080/carts`);
      return cartResponse.data.data.map((cart: any) => ({
        key: cart.cart_id,
        ...cart,
      }));
    },
  });

  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const userResponse = await axios.get(`http://localhost:8080/users`);
      return userResponse.data.data;
    },
  });

  const [carts, setCarts] = useState<ICart[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [games, setGames] = useState<IGame[]>([]);
  
  console.log(users)

  useEffect(() => {
    fetch("http://localhost:8080/carts/")
      .then((response) => response.json())
      .then((data) => setCarts(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu carts:", error));

      fetch("http://localhost:8080/users/")
      .then((response) => response.json())
      .then((data) => setUsers(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu users:", error));

      fetch("http://localhost:8080/games/")
      .then((response) => response.json())
      .then((data) => setGames(data.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu users:", error));
  }, []);

  const columns = [
    { key: "cart_id", title: "Cart ID", dataIndex: "cart_id" },
    {
      key: "user_id",
      title: "Tên người dùng",
      dataIndex: "user_id",
      render: (user_id: any) => {
        const user = userData?.find((u: IUser) => u.user_id === user_id);
        return user ? user.username : "Unknown User";
      },
    },
    {
      key: "game_id",
      title: "Game",
      dataIndex: "game_id",
      render: (game_id: any) => {
        const game = userData?.find((u: IGame) => u.game_id === game_id);
        return game ? game.game_id : "Unknown Game";
      },
    },
    {
      key: "action",
      title: "Hành động",
      render: (_: any, cart: any) => (
        <div className="flex gap-2">
          <Popconfirm
            title="Xóa tác vụ"
            description="Bạn có chắc muốn xóa không?"
            onConfirm={() => mutate(cart.cart_id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xóa</Button>
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
  )
};
export default CartPage;
