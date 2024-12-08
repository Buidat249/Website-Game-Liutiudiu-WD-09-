import CategoryNew from "../models/categorynews";

 // GET / categories
 export const getAllCategoriesNews = async (req, res) => {
    try {
        const categorynews = await CategoryNew.find();
        return res.status(200).json({
            message: "Get All Categories Done",
            data: categorynews,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


 // GET /categories/ : id
export const getCategoryDetailNews = async (req, res) => {
    try {
        const categorynew = await CategoryNew.findOne({categorynew_id:req.params.id});
        if (!categorynew) {
            return res.status(404).json({
                message: "Category Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Category Detail Done",
            data: categorynew,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // POST /categories
export const addCategoryNews = async (req, res) => {
     console.log("Received data:", req.body);
    try {
        // Tìm danh mục cuối cùng để lấy category_id
        const lastCategoryNew = await CategoryNew.findOne({}, {}, { sort: { categorynew_id: -1 } });
        const newCategoryId = lastCategoryNew ? lastCategoryNew.categorynew_id + 1 : 1;

         // Thêm categorynew_id vào dữ liệu trước khi tạo
        const categorynewData = {
            categorynew_id: newCategoryId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const categorynew = await CategoryNew.create(categorynewData);
        return res.status(201).json({
            message: "Create Category Done",
            data: categorynew,   
        });
    } catch (error) {
        console.error("Error creating Category:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};

 // PUT / categories / :id

 export const updateCategoryNews = async (req, res) => {
    try {
        const categorynew = await CategoryNew.findOneAndUpdate({categorynew_id:req.params.id}, req.body, {
            new: true,
        });
        if (!categorynew) {
            return res.status(404).json({
                message: "Category Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Category Done",
            data: categorynew,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / categories / :id

export const removeCategoryNews = async (req, res) => {
    try {
        const categorynew = await CategoryNew.findOneAndDelete({categorynew_id:req.params.id});
        if (!categorynew) {
            return res.status(404).json({
                message: "Category Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Category Done",
            data: categorynew,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
