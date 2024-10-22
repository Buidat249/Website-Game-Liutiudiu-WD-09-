import Game from "../models/game";

 // GET / games
 export const getAllGames = async (req, res) => {
    try {
        const games = await Game.find().populate('brand_id').populate('category_id');
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
        const game = await Game.findById(req.params.id).populate('brand_id').populate('category_id');
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

 // POST /games
export const addGame = async (req, res) => {
    console.log(req.body);
    try {
        const game = await Game.create(req.body);
        return res.status(201).json({
            message: "Create Game Done",
            data: game,   
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // PUT / games / :id

 export const updateGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
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
        const game = await Game.findByIdAndDelete(req.params.id);
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
