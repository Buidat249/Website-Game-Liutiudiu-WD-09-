import Game from "../models/game";

 // GET / games
 export const getAllGames = async (req, res) => {
    try {
        const games = await Game.find();
        return res.status(200).json({
            message: "Get All Games Done",
            data: games,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // GET /games/ : id
export const getGameDetail = async (req, res) => {
    try {
        const game = await Game.findOne({game_id:req.params.id});
        if (!game) {
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
        // Tìm thương hiệu cuối cùng để lấy brand_id
        const lastGame = await Game.findOne({}, {}, { sort: { game_id: -1 } });
        const newGameId = lastGame ? lastGame.game_id + 1 : 1;

        const gameData = {
            game_id: newGameId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const game = await Game.create(gameData);
        return res.status(201).json({
            message: "Create Game Done",
            data: game,
        });
    } catch (error) {
        console.error("Error creating game:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};



 // PUT / games / :id

 export const updateGame = async (req, res) => {
    try {
        const game = await Game.findOneAndUpdate({game_id:req.params.id}, req.body, {
            new: true,
        });
        if (!game) {
            return res.status(404).json({
                message: "Game Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Game Done",
            data: game,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / games / :id

export const removeGame = async (req, res) => {
    try {
        const game = await Game.findOneAndDelete({game_id:req.params.id});
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
