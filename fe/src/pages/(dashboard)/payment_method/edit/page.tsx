import { BackwardFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

type FieldType = {
    payment_method_id?: number;
    name?: string;
  };

const Payment_MethodEditPage: React.FC = () => {
    const { payment_method_id } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

      // Lấy dữ liệu phương thức thanh toán cụ thể
  const { data, isLoading, error } = useQuery({
    queryKey: ["payment_methods", payment_method_id],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/payment_methods/${payment_method_id}`)
        .then((response) => response.data),
  });

  const { mutate } = useMutation({
    mutationFn: (payment_method: any) =>
      axios.put(`http://localhost:8080/payment_methods/${payment_method_id}`, payment_method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment_methods"] });
      messageApi.success("Cập nhật phương thức thanh toán thành công");
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const onFinish = (values: FieldType) => {
    console.log("Sending data:", values);
    mutate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Thất bại", errorInfo);
  };

    // Kiểm tra cấu trúc dữ liệu
    console.log("Payment_method data:", data); // Kiểm tra dữ liệu

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading payment_method: {error.message}</div>;
    return (
        <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Cập nhật phương thức thanh toán</h1>
        <Button type="primary">
          <Link to="/admin/payment_methods">
            <BackwardFilled /> Quay lại
          </Link>
        </Button>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ name: data?.data?.name || "" }} // Đảm bảo truy cập đúng trường
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên phương thức thanh toán"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Cập nhật phương thức thanh toán
          </Button>
        </Form.Item>
      </Form>
    </>
    );
};
export default Payment_MethodEditPage;