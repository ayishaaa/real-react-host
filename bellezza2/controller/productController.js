const productForm = require('../models/productModel');
const asyncHandler = require('express-async-handler');

exports.productAdd = asyncHandler(async (req, res) => {
    try {
        const { productName, price, offerprice, description, category, tag, brand, material } = req.body;
        const files = req.files;
        const images = files.map((file) => file.filename);

        const product = await productForm.create({
            productname: productName,
            price,
            offerprice,
            description,
            category,
            tag,
            brand,
            material,
            images,
        });

        if (product) {
            res.send('Successfully collected data');
        } else {
            res.send('Failed to collect data');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


exports.collectedProduct = asyncHandler(async (req, res) => {
    try {
        let elements = await productForm.find();

        elements = elements.map((element) => {
            if (element.images) {
                return {
                    ...element.toObject(),
                    images: element.images.map((image) => `${image}`),
                };
            }
            console.log(images);
            return element;
        });

        // console.log(elements);

        res.json(elements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.detailProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productForm.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const formattedProduct = {
            id: product._id,
            productName: product.productname,
            price: product.price,
            offerprice: product.offerprice,
            description: product.description,
            category: product.category,
            tag: product.tag,
            brand: product.brand,
            material: product.material,
            images: product.images.map((image) => `${image}`),
        };
        //  console.log(formattedProduct)

        res.json(formattedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, price, offerprice, description, category, tag, brand, material } = req.body;
    const files = req.files;
    const newImages = files.map((file) => file.filename);

    try {
        let updatedProduct = await productForm.findById(id);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Only update the fields that are present in the request body
        updatedProduct.productname = productName || updatedProduct.productname;
        updatedProduct.price = price || updatedProduct.price;
        updatedProduct.offerprice = offerprice || updatedProduct.offerprice;
        updatedProduct.description = description || updatedProduct.description;
        updatedProduct.category = category || updatedProduct.category;
        updatedProduct.tag = tag || updatedProduct.tag;
        updatedProduct.brand = brand || updatedProduct.brand;
        updatedProduct.material = material || updatedProduct.material;

        // Update the images only if new images are present
        if (files && files.length > 0) {
            updatedProduct.images = newImages;
        }

        // Save the updated product
        updatedProduct = await updatedProduct.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await productForm.findByIdAndRemove(id);
        res.sendStatus(204); // Success, no content
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal server error
    }
};