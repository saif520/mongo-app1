const express = require('express');
const mongoose = require('mongoose');
const ProductModel = require('../models/Product.model');



exports.createProduct = async (req, res) => {
    try {
        const data = req.body;

        const product = new ProductModel(data);
        const result = await product.save();

        console.log("New Product Created:", result);

        return res.status(201).json({
            message: "Product created successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        console.log('Fetched Products:', products);
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};


exports.getProductById = async (req, res) => {
    try {
        const { pId } = req.params;
        const product = await ProductModel.findById(pId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log('Fetched Product:', product);
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const product = await ProductModel.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Updated Product:', product);
        return res.status(200).json({
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log("Deleted Product:", product);

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};