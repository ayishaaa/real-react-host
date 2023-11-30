const Product = require('../models/productModel');
const Order = require('../models/orderModel');

exports.pageProduct = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const category = req.query.category; 
  const tag = req.query.tag; 
  const brand = req.query.brand; 
  const material = req.query.material; 
  const pricerange = req.query.pricerange;
  const sortBy = req.query.sortBy;
  const priceRangeArray = (pricerange && pricerange !== 'undefined-undefined') ? pricerange.split('-').map(Number) : [];

  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  try {
    // Create an empty query object
    const query = {};

    // Add filters conditionally based on the selected filters
    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tag = tag;
    }

    if (brand) {
      query.brand = brand;
    }

    if (material) {
      query.material = material;
    }
    if (priceRangeArray.length > 0) {
        query.offerprice = { $gte: priceRangeArray[0] };
        if (priceRangeArray.length > 1) {
          query.offerprice.$lte = priceRangeArray[1];
        }
      }

    let products = await Product.find(query);

    if (sortBy === "lowToHigh") {
      products = products.sort((a, b) => a.offerprice - b.offerprice);
    } else if (sortBy === "highToLow") {
      products = products.sort((a, b) => b.offerprice - a.offerprice);
    }

    const productsForCurrentPage = products.slice(offset, offset + limit);

    const totalProductCount = products.length;

    const totalPages = Math.ceil(totalProductCount / pageSize);

    const response = {
      products: productsForCurrentPage,
      totalProducts: totalProductCount,
      totalPages: totalPages,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching products.' });
  }
};
exports.getpage = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    
    // Calculate the skip value based on page and page size
    const skip = (page - 1) * pageSize;
  
    // Query the database with skip and limit based on pagination parameters
    try {
      const products = await Product.find()
        .skip(skip)
        .limit(pageSize)
        .exec();
  
      // Return the paginated products as a JSON response
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
  }