import Cart from "../models/cart";

 // GET / carts
 export const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        return res.status(200).json({
            message: "Get All Carts Done",
            data: carts,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // GET /carts/ : id
 export const getCartDetail = async (req, res) => {
    try {
        const cart = await Cart.findOne({cart_id:req.params.id});
        if (!cart) {
            return res.status(404).json({
                message: "Cart Not Found",
            });
        }
        return res.status(200).json({
            message: "Get Cart Detail Done",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // POST /carts
 export const addCart = async (req, res) => {
    console.log(req.body);
    try {
        const cart = await Cart.create(req.body);
        return res.status(201).json({
            message: "Create Cart Done",
            data: cart,   
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // PUT / carts / :id

 export const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate({cart_id:req.params.id}, req.body, {
            new: true,
        });
        if (!cart) {
            return res.status(404).json({
                message: "Cart Not Found",
            });
        }
        return res.status(200).json({
            message: "Update Cart Done",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

 // DELETE / carts / :id

 export const removeCart = async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({cart_id:req.params.id});
        if (!cart) {
            return res.status(404).json({
                message: "Cart Not Found",
            });
        }
        return res.status(200).json({
            message: "Delete Cart Done",
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
