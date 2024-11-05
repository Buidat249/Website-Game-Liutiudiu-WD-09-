import { PlusCircleFilled } from '@ant-design/icons';
import { Button, message, Popconfirm, Skeleton, Table } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import { IBrand } from "@/common/types/brand";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
type Props = {}

const GamePage = () => {
  const [ messageApi, contextHolder ] = message.useMessage();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
      mutationFn: (game_id:number) => axios.delete(`http://localhost:8080/games/${game_id}`),
      onSuccess: () => {
          queryClient.invalidateQueries({
              queryKey: ['games'],
          });
          messageApi.success('Xóa thành công');
      },
  });

  const { data, isLoading, error } = useQuery({
      queryKey: ['games'],
      queryFn: async () => {
          const {data} = await axios.get(`http://localhost:8080/games`);
          console.log(data); // Kiểm tra lại cấu trúc dữ liệu
          return data.data.map((brand: any) => ({
              key: brand.brand_id,
              ...brand,
          }));            
      },
  });
  if (error) return <div>Error: {error.message}</div>;
  
  const columns = [
  { key: "game_id", title: "Game_ID", dataIndex: "game_id" },
  { key: "name", title: "Name", dataIndex: "name" },
  {
      key: "action", title: "Action", 
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

  
  

  if (isLoading) return <div>...Loading</div>;

  return (
      <div>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-semibold">Quản lý hãng phát triển</h1>
          <Button type="primary">
              <Link to="/admin/games/add">
                  <PlusCircleFilled /> Thêm hãng phát triển
              </Link>
          </Button>
      </div>
      <Skeleton loading={isLoading} active>
          <Table dataSource={data} columns={columns} />
      </Skeleton>
  </div>
  );
};

export default GamePage