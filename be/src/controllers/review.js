import Review from "../models/review";

 // GET / reviews
 export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        return res.status(200).json({
            message: "Get All Reviews Done",
            data: reviews,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


 // GET /reviews/ : id
 export const getReviewDetail = async (req, res) => {
    try {
        const review = await Review.findOne({review_id:req.params.id});
        if (!review) {
            return res.status(404).json({
                message: "Review Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Review Detail Done",
            data: review,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // POST /reviews
 export const addReview = async (req, res) => {
    console.log(req.body);
    try {
        const review = await Review.create(req.body);
        return res.status(201).json({
            message: "Create Review Done",
            data: review,   
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// PUT / reviews / :id

export const updateReview = async (req, res) => {
    try {
        const review = await Review.findOneAndUpdate({review_id:req.params.id}, req.body, {
            new: true,
        });
        if (!review) {
            return res.status(404).json({
                message: "Review Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Review Done",
            data: review,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / reviews / :id

 export const removeReview = async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({review_id:req.params.id});
        if (!review) {
            return res.status(404).json({
                message: "Review Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Review Done",
            data: review,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};