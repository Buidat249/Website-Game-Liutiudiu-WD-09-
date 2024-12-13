import Key from "../models/key"; // Import Key model

// GET /keys - Lấy danh sách tất cả key
export const getAllKeys = async (req, res) => {
  try {
    const keys = await Key.find(); // Lấy thông tin game
    return res.status(200).json({
      message: "Lấy danh sách key thành công",
      data: keys,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /keys/:id - Lấy chi tiết key theo ID
export const getKeyDetail = async (req, res) => {
  try {
    const { game_id } = req.params; // Lấy game_id từ params

    // Tìm kiếm tất cả keys theo game_id
    const keys = await Key.find({ game_id: game_id });

    if (!keys || keys.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy key cho game_id này",
      });
    }

    return res.status(200).json({
      message: "Lấy chi tiết keys thành công",
      data: keys, // Trả về tất cả các keys liên quan đến game_id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /keys - Thêm key mới
export const addKeys = async (req, res) => {
  try {
    // Kiểm tra nếu trường name không có trong request body
    if (!req.body.name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Tìm khóa có key_id lớn nhất
    const lastKey = await Key.findOne({}, {}, { sort: { key_id: -1 } });
    const newKeyId = lastKey ? lastKey.key_id + 1 : 1;

    // Dữ liệu khóa mới
    const keyData = {
      key_id: newKeyId,
      name: req.body.name, // Đảm bảo rằng 'name' không null hoặc undefined
      is_used: req.body.is_used || false,
      used_at: req.body.is_used ? new Date() : null, // Nếu is_used là true, gán ngày giờ hiện tại, nếu false thì để null
      game_id:  req.body.game_id,
    };

    // Thêm khóa mới vào cơ sở dữ liệu
    const newKey = await Key.create(keyData);

    return res.status(201).json({
      message: "Key Created Successfully",
      data: newKey,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// PUT /keys/:id - Cập nhật thông tin key
export const updateKey = async (req, res) => {
  try {
    const key = await Key.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!key) {
      return res.status(404).json({
        message: "Key không tồn tại",
      });
    }
    return res.status(200).json({
      message: "Cập nhật key thành công",
      data: key,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /keys/:id - Xóa key
export const removeKey = async (req, res) => {
  try {
    // Sử dụng findOneAndDelete để xóa theo key_id
    const key = await Key.findOneAndDelete({ key_id: req.params.id });

    if (!key) {
      return res.status(404).json({
        message: "Key không tồn tại",
      });
    }

    return res.status(200).json({
      message: "Xóa key thành công",
      data: key,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const assignKeysToGame = async (req, res) => {
  try {
    const { game_id, key_ids } = req.body;

    // Cập nhật keys trong bảng Key với game_id
    await Key.updateMany({ _id: { $in: key_ids } }, { game_id: game_id });

    res.status(200).json({ message: "Keys assigned to game successfully" });
  } catch (error) {
    console.error("Error assigning keys:", error);
    res.status(500).json({ message: "An error occurred while assigning keys" });
  }
};
