import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Spin,
  Tag,
  Table,
} from "antd";

import {
  PlusOutlined,
  Loading3QuartersOutlined,
  BackwardFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { options } from "joi";
import { Link, useParams } from "react-router-dom";

type FieldType = {
  game_id?: number;
  brand_id?: number;
  category_id?: number;
  platform_id?: number;
  filter_id?: number;
  name?: string;
  price?: number;
  discount?: number;
  final_price?: number;
  rating?: number;
  image?: string;
  key_id?: number;
  configuration?: string;
  description_id?: number;
};

const GameEditPage: React.FC = () => {
  const [users, setUsers] = useState<{ [key: number]: string }>({}); // Lưu trữ tên người dùng theo user_id
  const [dataSource, setDataSource] = useState<any[]>([]); // Dữ liệu bảng
  const { game_id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const CLOUD_NAME = "dlcxulvmu"; // Thay bằng cloud name của bạn
  const UPLOAD_PRESET = "DATNWD-09"; // Thay bằng upload preset của bạn

  console.log("user", users)

  // Fetch game data
  const { data, isLoading, error } = useQuery({
    queryKey: ["games", game_id],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/games/${game_id}`)
        .then((response) => response.data),
  });

  // Lấy dữ liệu người dùng từ backend khi component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users"); // API lấy danh sách người dùng
        const usersData = response.data.data.reduce((acc: any, user: any) => {
          if (user.user_id && user.username) { // Sử dụng username thay vì name
            acc[user.user_id] = user.username; // Ánh xạ user_id với username
          } else {
            console.error(`Invalid user data: ${JSON.stringify(user)}`);
          }
          return acc;
        }, {});
        console.log("Mapped Users Data:", usersData);
        setUsers(usersData); // Lưu dữ liệu người dùng vào state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Mutation for updating game
  const { mutate } = useMutation({
    mutationFn: (game: any) => {
      console.log("Updating game with key_ids:", game.key_id); // In ra key_id để kiểm tra
      return axios.put(`http://localhost:8080/games/${game_id}`, {
        ...game,
        key_ids: game.key_id, // Đồng nhất tên key_ids hoặc key_id theo backend
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      messageApi.success("Cập nhật game thành công");
    },
    onError: (error) => {
      messageApi.error(error.message);
    },
  });

  const handleImageUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url); // Cập nhật URL ảnh mới
        message.success("Ảnh đã được tải lên thành công!");
      } else {
        message.error("Không thể tải ảnh lên. Vui lòng thử lại.");
      }
    } catch (error) {
      message.error("Không thể tải ảnh lên. Vui lòng thử lại.");
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values: FieldType) => {
    const price = values.price || 0;
    const discount = values.discount || 0;
    const final_price = price - (price * discount) / 100;
    const gameData = {
      ...values,
      final_price,
      image: imageUrl || data?.data?.image,
    }; // Nếu không có ảnh mới, giữ ảnh cũ
    mutate(gameData);
    console.log(gameData);

  };

  // Fetch lists for brands, categories, platforms, and filters
  const { data: brands = { data: [] } } = useQuery({
    queryKey: ["brands"],
    queryFn: () =>
      axios.get("http://localhost:8080/brands").then((res) => res.data),
  });

  const brandList = Array.isArray(brands.data) ? brands.data : [];

  const { data: categories = { data: [] } } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios.get("http://localhost:8080/categories").then((res) => res.data),
  });

  const categoriesList = Array.isArray(categories.data) ? categories.data : [];

  const { data: platforms = { data: [] } } = useQuery({
    queryKey: ["platforms"],
    queryFn: () =>
      axios.get("http://localhost:8080/platforms").then((res) => res.data),
  });

  const platformsList = Array.isArray(platforms.data) ? platforms.data : [];

  const { data: filters = { data: [] } } = useQuery({
    queryKey: ["filters"],
    queryFn: () =>
      axios.get("http://localhost:8080/filters").then((res) => res.data),
  });

  const filtersList = Array.isArray(filters.data) ? filters.data : [];

  const { data: descriptions = { data: [] } } = useQuery({
    queryKey: ["descriptions"],
    queryFn: () =>
      axios.get("http://localhost:8080/descriptions").then((res) => res.data),
  });

  const descriptionList = Array.isArray(descriptions.data)
    ? descriptions.data
    : [];

  // fetch keys
  const { data: keys = { data: [] } } = useQuery({
    queryKey: ["keys"],
    queryFn: () =>
      axios.get(`http://localhost:8080/keys/${game_id}`).then((res) => res.data),
  });

  const keysList = Array.isArray(keys.data) ? keys.data : [];
  console.log("keylist", keysList)


  // Hàm tính toán final_price
  const calculateFinalPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  // Cập nhật final_price khi giá trị price hoặc discount thay đổi
  const handlePriceChange = (value: number | null) => {
    const validValue = value !== null ? value : 0;
    const newFinalPrice = calculateFinalPrice(validValue, discount);
    setFinalPrice(newFinalPrice);
    setPrice(validValue);
  };

  const handleDiscountChange = (value: number | null) => {
    const validValue = value !== null ? value : 0;
    const newFinalPrice = calculateFinalPrice(price, validValue);
    setFinalPrice(newFinalPrice);
    setDiscount(validValue);
  };

  useEffect(() => {
    if (data?.data?.price && data?.data?.discount) {
      setPrice(data?.data?.price);
      setDiscount(data?.data?.discount);
      setFinalPrice(
        calculateFinalPrice(data?.data?.price, data?.data?.discount)
      );
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading brand: {error.message}</div>;
  console.log("key", keysList)

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_: any, __: any, index: number) => index + 1, // Hiển thị số thứ tự
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng Thái",
      dataIndex: "is_used",
      key: "is_used",
      render: (is_used: boolean, record: any) => {
        // Kiểm tra trạng thái và thời gian sử dụng (used_at)
        let statusText = "Chưa dùng";
        let color = "green"; // Màu mặc định cho "Chưa dùng"

        if (is_used) {
          if (record.used_at) {
            // Nếu đã sử dụng và có thời gian sử dụng
            statusText = "Đã dùng";
            color = "red";
          } else {
            // Nếu đang xử lý (chưa có used_at)
            statusText = "Đang xử lý";
            color = "orange";
          }
        }

        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: "Thời gian sử dụng",
      dataIndex: "used_at",
      key: "used_at",
    },
    {
      title: "Người dùng",
      dataIndex: "user_id",
      key: "user_id",
      render: (user_id: number) => {
        const userName = users[user_id]; // Tra cứu tên người dùng từ state
        return userName ? userName : "Không có tên"; // Hiển thị tên người dùng nếu có
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Cập nhật game</h1>
        <div>
          <Button type="default" // Thay type thành "default" để không sử dụng màu primary
            style={{ backgroundColor: 'green', color: '#fff', marginRight: "10px" }}>
            <Link to={`/admin/keys/add?game_id=${game_id}`}>
              <PlusCircleFilled /> Thêm Khóa Game
            </Link>
          </Button>
          <Button type="primary">
            <Link to="/admin/games">
              <BackwardFilled /> Quay lại
            </Link>
          </Button></div>
      </div>

      <div className="flex ">
        <div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{
              name: data?.data?.name || "",
              brand_id: data?.data?.brand_id || [],
              category_id: data?.data?.category_id || [],
              platform_id: data?.data?.platform_id || [],
              filter_id: data?.data?.filter_id || [],
              price: data?.data?.price || 0,
              discount: data?.data?.discount || 0,
              image: data?.data?.image || "",

              key_id: data?.data?.key_id || [],
              description: data?.data?.description || "",
              configuration: data?.data?.configuration || "",

              description_id: data?.data?.description_id || [],
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Tên game"
              name="name"
              rules={[{ required: true, message: "Không được bỏ trống" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Tên hãng phát triển"
              name="brand_id"
              rules={[
                { required: true, message: "Vui lòng chọn tên hãng phát triển" },
              ]}
            >
              <Select mode="multiple" placeholder="Chọn tên hãng phát triển">
                {brandList.map((brand: any) => (
                  <Select.Option key={brand.brand_id} value={brand.brand_id}>
                    {brand.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Tên thể loại"
              name="category_id"
              rules={[{ required: true, message: "Vui lòng chọn tên thể loại" }]}
            >
              <Select mode="multiple" placeholder="Chọn tên thể loại">
                {categoriesList.map((category: any) => (
                  <Select.Option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Tên nền tảng"
              name="platform_id"
              rules={[{ required: true, message: "Vui lòng chọn tên nền tảng" }]}
            >
              <Select mode="multiple" placeholder="Chọn tên nền tảng">
                {platformsList.map((platform: any) => (
                  <Select.Option
                    key={platform.platform_id}
                    value={platform.platform_id}
                  >
                    {platform.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Tên danh mục"
              name="filter_id"
              rules={[{ required: true, message: "Vui lòng chọn tên danh mục" }]}
            >
              <Select mode="multiple" placeholder="Chọn tên danh mục">
                {filtersList.map((filter: any) => (
                  <Select.Option key={filter.filter_id} value={filter.filter_id}>
                    {filter.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Tên mô tả"
              name="description_id"
              rules={[{ required: true, message: "Vui lòng chọn tên mô tả" }]}
            >
              <Select mode="multiple" placeholder="Chọn tên mô tả">
                {descriptionList.map((description: any) => (
                  <Select.Option
                    key={description.description_id}
                    value={description.description_id}
                  >
                    {description.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* <Form.Item
          label="Tên keys"
          name="key_id"
          rules={[{ required: true, message: "Vui lòng chọn tên keys" }]}
        >
          <Select mode="multiple" placeholder="Chọn tên keys">
            {keysList.map((key: any) => (
              <Select.Option key={key.key_id} value={key.key_id}>
                {key.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item> */}

            <Form.Item
              label="Giá game"
              name="price"
              rules={[{ required: true, message: "Không được bỏ trống" }]}
            >
              <InputNumber
                value={price}
                onChange={handlePriceChange}
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Giảm giá"
              name="discount"
              rules={[{ required: true, message: "Không được bỏ trống" }]}
            >
              <InputNumber
                value={discount}
                onChange={handleDiscountChange}
                min={0}
                max={100}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="Giá sau giảm giá">
              <InputNumber value={finalPrice} disabled style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Vui lòng tải lên hình ảnh" }]}
            >
              <Upload
                name="file"
                action=""
                listType="picture"
                beforeUpload={handleImageUpload}
                maxCount={1}
              >
                <Button icon={<PlusOutlined />}>Tải lên ảnh</Button>
              </Upload>
              {imageUrl || data?.data?.image ? (
                <img
                  src={imageUrl || data?.data?.image}
                  alt="Uploaded"
                  style={{ width: "50%", marginTop: 10 }}
                />
              ) : null}
            </Form.Item>

            <Form.Item label="Cấu hình" name="configuration">
              <TextArea rows={5} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Cập nhật game
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="flex-1 flex flex-col items-center justify-start w-full max-w-screen-xl">
          <Table pagination={{ pageSize: 14 }} className="custom-table w-2/4 max-w-screen-lg" dataSource={keysList} columns={columns} rowKey="id" bordered />
        </div>
      </div>

    </>
  );
};

export default GameEditPage;
