import { ProductModel } from "../model/ProductModel.js";
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Helper function to get full image URL
const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:9595${imagePath.startsWith('/') ? imagePath : '/uploads/' + imagePath}`;
};

export const AddProduct = async (req, res) => {
    try {
        const { name, Image, title, des, rating, price, weight, tag, category } = req.body;

        // Agar Image upload folder se hai to full URL banayein
        let imageUrl = Image;
        if (Image && !Image.startsWith('http') && !Image.startsWith('/uploads/')) {
            imageUrl = `/uploads/${Image}`;
        }

        const productData = {
            name,
            Image: imageUrl, // Full URL save karein
            title,
            des,
            rating,
            price,
            weight,
            tag,
            category
        };

        const data = await ProductModel.create(productData);

        // Return product with full URL
        const productWithFullUrl = {
            ...data.toObject(),
            Image: getFullImageUrl(data.Image)
        };

        return res.json({ message: 'Product added successfully', data: productWithFullUrl });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to add product', error: err.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const data = await ProductModel.find();

        // Return all products with full URLs
        const productsWithFullUrls = data.map(product => ({
            ...product.toObject(),
            Image: getFullImageUrl(product.Image)
        }));

        return res.json({ message: 'Products fetched successfully', data: productsWithFullUrls });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to get products', error: err.message });
    }
};

export const Del = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        const data = await ProductModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Product deleted successfully", data });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to delete product', error: err.message });
    }
};

export const edite_get = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const data = await ProductModel.findById(id);

        if (!data) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Return product with full URL
        const productWithFullUrl = {
            ...data.toObject(),
            Image: getFullImageUrl(data.Image)
        };

        return res.status(200).json({ message: productWithFullUrl });
    } catch (err) {
        return res.status(500).send({ message: "Something went wrong", error: err });
    }
};

export const edite_post = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, Image, title, des, rating, price, weight, tag, category } = req.body;

        const updatedData = {
            name,
            Image,
            title,
            des,
            rating,
            price,
            weight,
            tag,
            category
        };

        const data = await ProductModel.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!data) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Return updated product with full URL
        const productWithFullUrl = {
            ...data.toObject(),
            Image: getFullImageUrl(data.Image)
        };

        return res.status(200).json({
            message: "Product updated successfully",
            data: productWithFullUrl
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Failed to update product',
            error: err.message
        });
    }
};