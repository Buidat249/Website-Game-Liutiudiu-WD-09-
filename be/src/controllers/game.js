import Game from "../models/game";
import Key from "../models/key"; // Import model Key

// GET / games
export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    return res.status(200).json({
      message: "Get All Games Done",
      data: games,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });

    return res.status(500).json({ message: error.message });
  }
};

// GET /games/ : id
export const getGameDetail = async (req, res) => {
  try {
    const game = await Game.findOne({ game_id: req.params.id });
    if (!game) {
      const response = {
        ...game.toObject(),
        price: formatPrice(game.price), // Định dạng trước khi trả về
      };
      res.json(response);

      return res.status(404).json({
        message: "Game Not Found",
      });
    }
    return res.status(200).json({
      message: "Get Game Detail Done",
      data: game,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addGame = async (req, res) => {
  console.log("Received data:", req.body); // Kiểm tra dữ liệu nhận được
  try {
    const {
      name,
      brand_id,
      category_id,
      platform_id,
      filter_id, // Kiểm tra mảng filter_id
      description_id, // Kiểm tra mảng description_id
      price,
      discount,
      image,
      configuration,
      key_id, // Kiểm tra mảng key_id
    } = req.body;

    // Kiểm tra xem key_id có phải là mảng không và không rỗng
    if (!Array.isArray(key_id) || key_id.length === 0) {
      return res.status(400).json({ message: "Key ID is missing or invalid" });
    }

    // Tính toán game_id tự động tăng
    const lastGame = await Game.findOne({}, {}, { sort: { game_id: -1 } });
    const newGameId = lastGame ? lastGame.game_id + 1 : 1;

    // Tạo dữ liệu game mới với game_id và các key đã tạo
    const gameData = {
      game_id: newGameId,
      name,
      brand_id,
      category_id,
      platform_id,
      filter_id, // Lưu mảng filter_id vào game
      description_id, // Lưu mảng description_id vào game
      price,
      discount,
      image,
      configuration,
      key_id, // Lưu mảng key_id vào game
    };

    // Thêm game vào cơ sở dữ liệu
    const game = await Game.create(gameData);

    return res.status(201).json({
      message: "Game created successfully",
      data: game,
    });
  } catch (error) {
    console.error("Error creating game:", error);
    return res.status(500).json({ message: error.message });
  }
};

// PUT / games / :id

export const updateGame = async (req, res) => {
  try {
    const { key_ids, key_id, ...gameData } = req.body;
    const keysToUpdate = key_ids || key_id || [];

    console.log("Received key_ids:", keysToUpdate); // Kiểm tra đầu vào

    const game = await Game.findOneAndUpdate(
      { game_id: req.params.id },
      gameData,
      { new: true }
    );

    if (!game) {
      return res.status(404).json({ message: "Game Not Found" });
    }

    if (keysToUpdate.length > 0) {
      game.key_id = keysToUpdate;
      await game.save();

      await Key.updateMany(
        { key_id: { $in: keysToUpdate } },
        { game_id: game.game_id }
      );
    }

    return res.status(200).json({
      message: "Update Game and Keys Done",
      data: game,
    });
  } catch (error) {
    console.error("Error updating game and keys:", error); // Thêm log chi tiết lỗi
    return res.status(500).json({
      message: "An error occurred while updating the game and keys.",
      error: error.message, // Trả lỗi chi tiết ra response để tiện debug
    });
  }
};

// DELETE / games / :id

export const removeGame = async (req, res) => {
  try {
    const game = await Game.findOneAndDelete({ game_id: req.params.id });
    if (!game) {
      return res.status(404).json({
        message: "Game Not Found",
      });
    }
    return res.status(200).json({
      message: "Delete Game Done",
      data: game,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAvailableKeysForGame = async (req, res) => {
  try {
    const gameId = req.params.id;
    const availableKeys = await Key.find({
      game_id: gameId,
      is_used: false,
    });
    res.status(200).json({
      availableKeys,
      count: availableKeys.length,
    });
  } catch (error) {
    console.error("Error fetching available keys:", error);
    res.status(500).json({
      message: "Error fetching available keys",
    });
  }
};
