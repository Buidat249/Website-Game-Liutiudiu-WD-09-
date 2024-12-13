import instance from "@/configs/axios";
import {
  BackwardFilled,
  Loading3QuartersOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { date } from "joi";
import React from "react";
import { Link } from "react-router-dom";

type FieldType = {
    order_id?: number,
    user_id?: number,
    payment_method_id?: number,
    game_id?: number,
    total_price?: number,
    status?: string,
    quantity?: number,
};

const OrderAddPage: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const { mutate } = useMutation({
        mutationFn: (order: any) => axios.post(`http://localhost:8080/orders`, order),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["orders"],
          });
          messageApi.success("Thêm đơn hàng thành công");
          form.resetFields();
        },
        onError: (error) => {
          messageApi.open({
            type: "error",
            content: error.message,
          });
        },
      });

      const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
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
          
        </>
    );
};
export default OrderAddPage;