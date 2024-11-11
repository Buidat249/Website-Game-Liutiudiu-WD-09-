import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, Select, Upload, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { BackwardFilled, PlusOutlined } from "@ant-design/icons";

type FieldType = {
    description_id?: number;
    name?: string;
    descriptiondetail_id?: number;
};


const DescriptionEditPage: React.FC = () => {
    const { description_id } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    // Lấy dữ liệu mô tả cụ thể
    const { data, isLoading, error } = useQuery({
        queryKey: ["descriptions", description_id],
        queryFn: () =>
            axios
                .get(`http://localhost:8080/descriptions/${description_id}`)
                .then((response) => response.data),
    });

    const { mutate } = useMutation({
        mutationFn: (description: any) =>
            axios.put(`http://localhost:8080/descriptions/${description_id}`, description),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["descriptions"] });
            messageApi.success("Cập nhật mô tả thành công");
        },
        onError: (error) => {
            messageApi.open({
                type: "error",
                content: error.message,
            });
        },
    });

    const { data: descriptiondetail = { data: [] } } = useQuery({
        queryKey: ["descriptiondetails"],
        queryFn: () =>
            axios.get("http://localhost:8080/descriptiondetails").then((res) => res.data),
    });

    const descriptiondetailList = Array.isArray(descriptiondetail.data) ? descriptiondetail.data : [];


    const onFinish = (values: FieldType) => {
        console.log("Sending data:", values);
        mutate(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Thất bại", errorInfo);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading description: {error.message}</div>;

    // Kiểm tra cấu trúc dữ liệu
    console.log("description data:", data); // Kiểm tra dữ liệu

    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Cập nhật mô tả</h1>
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
                initialValues={{
                    name: data?.data?.name || "",
                    image: data?.data?.image || "",
                    descriptiondetail_id: data?.data?.descriptiondetail_id || "",
                }} // Đảm bảo truy cập đúng trường
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

                <Form.Item
                    label="Mô tả chi tiết"
                    name="descriptiondetail_id"
                    rules={[{ required: true, message: "Vui lòng chọn Mô tả chi tiết" }]}
                >
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
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Cập nhật mô tả
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default DescriptionEditPage;
