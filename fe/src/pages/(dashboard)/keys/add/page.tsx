import { BackwardFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type FieldType = {
    key_id?: number;
    name?: string;
    is_used?: string;
};

const AddKeyPage: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    const [lastKeyId, setLastKeyId] = useState<number>(0);

    // Fetch the last key_id to generate a new one
    useEffect(() => {
        axios.get("http://localhost:8080/keys/lastkey")
            .then(response => {
                const lastKey = response.data.data;
                setLastKeyId(lastKey ? lastKey.key_id : 0);
            })
            .catch(error => {
                console.error("Failed to fetch last key:", error);
            });
    }, []);

    // Mutation for adding a new key
    const { mutate } = useMutation({
        mutationFn: (key: any) => axios.post(`http://localhost:8080/keys`, key),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["keys"],
            });
            messageApi.success("Thêm khóa game thành công");
        },
        onError: (error) => {
            messageApi.open({
                type: "error",
                content: error.message,
            });
        },
    });

    // Handle form submission
    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        // Kiểm tra lại trước khi gửi dữ liệu
        if (!values.name) {
            messageApi.open({
                type: "error",
                content: "Tên khóa không được bỏ trống",
            });
            return;
        }
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
                <h1 className="text-2xl font-semibold">Thêm Khóa Game</h1>
                <Button type="primary">
                    <Link to="/admin/keys">
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
                    label="Tên khóa"
                    name="name"
                    rules={[{ required: true, message: "Không được bỏ trống" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Trạng thái"
                    name="is_used"
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm khóa game
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddKeyPage;
