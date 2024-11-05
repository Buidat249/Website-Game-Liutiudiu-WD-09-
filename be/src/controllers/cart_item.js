import Cart_Item from "../models/cart_item";

 // GET / cart_items
 export const getAllCart_Items = async (req, res) => {
    try {
        const cart_items = await Cart_Item.find();
        return res.status(200).json({
            message: "Get All Cart_Items Done",
            data: cart_items,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // GET /cart_items/ : id
 export const getCart_ItemDetail = async (req, res) => {
    try {
        const cart_item = await Cart_Item.findOne({cart_item_id:req.params.id});
        if (!cart_item) {
            return res.status(404).json({
                message: "Cart_Item Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Cart_Item Detail Done",
            data: cart_item,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // POST /cart_items
 export const addCart_Item = async (req, res) => {
    console.log(req.body);
    try {
        const cart_item = await Cart_Item.create(req.body);
        return res.status(201).json({
            message: "Create Cart_Item Done",
            data: cart_item,   
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// PUT / cart_items / :id

export const updateCart_Item = async (req, res) => {
    try {
        const cart_item = await Cart_Item.findOneAndUpdate({cart_item_id:req.params.id}, req.body, {
            new: true,
        });
        if (!cart_item) {
            return res.status(404).json({
                message: "Cart_Item Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Cart_Item Done",
            data: cart_item,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / cart_items / :id

 export const removeCart_Item = async (req, res) => {
    try {
        const cart_item = await Cart_Item.findOneAndDelete({cart_item_id:req.params.id});
        if (!cart_item) {
            return res.status(404).json({
                message: "Cart_Item Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Cart_Item Done",
            data: cart_item,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};