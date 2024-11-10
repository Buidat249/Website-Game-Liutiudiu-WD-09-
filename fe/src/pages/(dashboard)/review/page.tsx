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
import { IGame } from "@/common/types/game";
import { IUser } from "@/common/types/user";

const ReviewPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (review_id: number) =>
      axios.delete(`http://localhost:8080/reviews/${review_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      messageApi.success("Xóa thành công");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:8080/reviews`);
      console.log(data); // Kiểm tra lại cấu trúc dữ liệu
      return data.data.map((review: any) => ({
        key: review.review_id,
        ...review,
      }));
    },
  });

  const [users, setUsers] = useState<IUser[]>([]); // Ensure users is initialized as an array

  useEffect(() => {
    // Fetch dữ liệu brands từ backend
    fetch("http://localhost:8080/users/") // Thay đường dẫn API phù hợp
      .then((response) => response.json())
      .then((data) => {
        console.log("Users fetched:", data.data); // Inspect the response
        setUsers(data.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const [games, setGames] = useState<IGame[]>([]); // Ensure categories is initialized as an array

  useEffect(() => {
    // Fetch dữ liệu categories từ backend
    fetch("http://localhost:8080/games/") // Thay đường dẫn API phù hợp
      .then((response) => response.json())
      .then((data) => {
        console.log("games fetched:", data.data); // Inspect the response
        setGames(data.data);
      })
      .catch((error) => console.error("Error fetching brands:", error));
  }, []);

  if (error) return <div>Error: {error.message}</div>;

  const columns = [
    { key: "review_id", title: "Review ID", dataIndex: "review_id" },
    {
      key: "user_id",
      title: "Người dùng",
      dataIndex: "user_id",
      render: (user_id: any) => {
        if (Array.isArray(user_id)) {
          return user_id
            .map((id) => {
              const user = users.find((b) => b.user_id === id);
              return user ? user.username : "Unknown user";
            })
            .join(", ");
        } else {
          const user = users.find((b) => b.user_id === user_id);
          return user ? user.username : "Unknown user";
        }
      },
    },
    {
      key: "game_id",
      title: "Game",
      dataIndex: "game_id",
      render: (game_id: any) => {
        if (Array.isArray(game_id)) {
          return game_id
            .map((id) => {
              const game = games.find((c) => c.game_id === id);
              return game ? game.name : "Unknown Game";
            })
            .join(", ");
        } else {
          const game = games.find((c) => c.game_id === game_id);
          return game ? game.name : "Unknown Game";
        }
      },
    },

    { key: "title", title: "Tiêu đề", dataIndex: "title" },
    { key: "comment", title: "Nội dung cmt", dataIndex: "comment" },
    {
      key: "image",
      title: "Ảnh",
      render: (_: any, review: any) => (
        <Image src={review.image} width={100} height={100} />
      ),
    },
    {
      key: "action",
      title: "Action",
      render: (_: any, review: any) => {
        return (
          <>
            <Popconfirm
              title="Delete the task"
              description="Bạn có chắc muốn xóa không?"
              onConfirm={() => {
                console.log("Deleting review with ID:", review.review_id); // kiểm tra game_id
                mutate(review.review_id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
            <Link to={`/admin/reviews/${review.review_id}/edit`}>
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
        <h1 className="text-2xl font-semibold">Quản lý bình luận</h1>
      </div>
      <Skeleton loading={isLoading} active>
        <Table dataSource={data} columns={columns} />
      </Skeleton>
    </div>
  );
};

export default ReviewPage;
