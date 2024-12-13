import instance from "@/configs/axios";
import {
    BackwardFilled,
    Loading3QuartersOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, Select, Spin, Upload, message } from "antd";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

type FieldType = {
    description_id?: number;
    name?: string;
    descriptiondetail_id?: number;

};

const DescriptionAddPage: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (description: any) =>
            axios.post(`http://localhost:8080/descriptions`, description),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["descriptions"],
            });
            messageApi.success("Thêm mô tả thành công");
        },
        onError: (error) => {
            messageApi.open({
                type: "error",
                content: error.message,
            });
        },
    });

    // fetch brand
  const { data: descriptiondetail = { data: [] }, isLoading } = useQuery({
    queryKey: ["descriptiondetail"],
    queryFn: () =>
      axios.get("http://localhost:8080/descriptiondetails").then((res) => res.data),
  });

  console.log("descriptiondetail:", descriptiondetail);

  const descriptiondetailList = Array.isArray(descriptiondetail.data) ? descriptiondetail.data : [];


    const onFinish = (values: FieldType) => {
        console.log("Sending data:", values);
        mutate(values);
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Thất bại", errorInfo);
    };

    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Thêm mô tả</h1>
                <Button type="primary">
                    <Link to="/admin/descriptions">
                        <BackwardFilled /> Quay lại
                    </Link>
                </Button>
            </div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên mô tả "
                    name="name"
                    rules={[{ required: true, message: "Không được bỏ trống" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
          label="Mô tả chi tiết"
          name="descriptiondetail_id"
          rules={[{ required: true, message: "Vui lòng chọn Mô tả chi tiết" }]}
        >
          {isLoading ? (
            <Spin indicator={<Loading3QuartersOutlined spin />} />
          ) : (
            <Select mode="multiple" placeholder="Chọn Mô tả chi tiết">
              {descriptiondetailList.map((descriptiondetail: any) => (
                <Select.Option
                  key={descriptiondetail.descriptiondetail_id}
                  value={descriptiondetail.descriptiondetail_id}
                >
                  {descriptiondetail.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm mô tả
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default DescriptionAddPage;
