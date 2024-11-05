import Category from "../models/category";

 // GET / categories
 export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({
            message: "Get All Categories Done",
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


 // GET /categories/ : id
export const getCategoryDetail = async (req, res) => {
    try {
        const category = await Category.findOne({category_id:req.params.id});
        if (!category) {
            return res.status(404).json({
                message: "Category Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Category Detail Done",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // POST /categories
export const addCategory = async (req, res) => {
     console.log("Received data:", req.body);
    try {
        // Tìm danh mục cuối cùng để lấy category_id
        const lastCategory = await Category.findOne({}, {}, { sort: { category_id: -1 } });
        const newCategoryId = lastCategory ? lastCategory.category_id + 1 : 1;

         // Thêm category_id vào dữ liệu trước khi tạo
        const categoryData = {
            category_id: newCategoryId,
            ...req.body // Chứa các trường khác từ frontend
        };

        const category = await Category.create(categoryData);
        return res.status(201).json({
            message: "Create Category Done",
            data: category,   
        });
    } catch (error) {
        console.error("Error creating Category:", error); // Ghi log lỗi
        return res.status(500).json({ message: error.message });
    }
};

 // PUT / categories / :id

 export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate({category_id:req.params.id}, req.body, {
            new: true,
        });
        if (!category) {
            return res.status(404).json({
                message: "Category Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Category Done",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / categories / :id

export const removeCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({category_id:req.params.id});
        if (!category) {
            return res.status(404).json({
                message: "Category Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Category Done",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
