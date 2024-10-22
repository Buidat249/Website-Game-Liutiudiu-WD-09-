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
        const category = await Category.findById(req.params.id);
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
    console.log(req.body);
    try {
        const category = await Category.create(req.body);
        return res.status(201).json({
            message: "Create Category Done",
            data: category,   
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // PUT / categories / :id

 export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
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
        const category = await Category.findByIdAndDelete(req.params.id);
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
