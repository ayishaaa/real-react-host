var express = require('express');
var verifyToken = require('../middleware/verifyToken');
var adminController = require('../controller/adminController');
var userController = require('../controller/userController');
var bannerController = require('../controller/bannerController');
var categoryController = require('../controller/categoryController');
var tagController = require('../controller/tagController');
var brandController = require('../controller/brandController');
var materialController = require('../controller/materialController');
var couponController = require('../controller/couponController');
var productController = require('../controller/productController');
var orderController = require('../controller/orderController');
var cancelController = require('../controller/cancelController');
var filterController = require('../controller/filterController')
var router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  var upload = multer({ storage: storage });

console.log('Backend connected');
//adminController
// router.post('/', adminController.adminOnly);
router.post('/collect', adminController.adminLogin);
router.get('/profile', verifyToken, adminController.getAdminProfile);
router.post('/addadmin', verifyToken, adminController.adminAdd);
router.get('/listadmin', verifyToken, adminController.collectedAdmin);
router.post('/editadmin/:id', verifyToken, adminController.updateAdmin);
router.delete('/removeadmin/:id', verifyToken, adminController.deleteAdmin);
//userController
router.post('/adduser', verifyToken, userController.userAdd);
router.get('/listuser', verifyToken, userController.collectedUser);
router.post('/edituser/:id', verifyToken, userController.updateUser);
router.delete('/remove/:id', verifyToken, userController.deleteUser);
//bannerController
router.post('/addbanner', verifyToken, bannerController.bannerAdd);
router.get('/listbanner', verifyToken, bannerController.collectedBanner);
router.put('/editbanner/:id', verifyToken, bannerController.updateBanner);
router.delete('/removebanner/:id', verifyToken, bannerController.deleteBanner);
//categoryController
router.post('/addcategory', verifyToken, categoryController.categoryAdd);
router.get('/listcategory', verifyToken, categoryController.collectedCategory);
router.put('/editcategory/:id', verifyToken, categoryController.updateCategory);
router.delete('/removecategory/:id', verifyToken, categoryController.deleteCategory);
//tagController
router.post('/addtag', verifyToken, tagController.tagAdd);
router.get('/listtag', verifyToken, tagController.collectedTag);
router.put('/edittag/:id', verifyToken, tagController.updateTag);
router.delete('/removetag/:id', verifyToken, tagController.deleteTag);
//brandController
router.post('/addbrand', verifyToken, brandController.brandAdd);
router.get('/listbrand', verifyToken, brandController.collectedBrand);
router.put('/editbrand/:id', verifyToken, brandController.updateBrand);
router.delete('/removebrand/:id', verifyToken, brandController.deleteBrand);
//materialController
router.post('/addmaterial', verifyToken, materialController.materialAdd);
router.get('/listmaterial', verifyToken, materialController.collectedMaterial);
router.put('/editmaterial/:id', verifyToken, materialController.updateMaterial);
router.delete('/removematerial/:id', verifyToken, materialController.deleteMaterial);
//couponController
router.post('/addcoupon', verifyToken, couponController.couponAdd);
router.get('/listcoupon', verifyToken, couponController.collectedCoupon);
router.put('/editcoupon/:id', verifyToken, couponController.updateCoupon);
router.delete('/removecoupon/:id', verifyToken, couponController.deleteCoupon);
//productController
router.post('/addproduct', verifyToken, upload.array('images'), productController.productAdd);
router.get('/listproduct', verifyToken, productController.collectedProduct);
router.get('/detailproduct/:id', verifyToken, productController.detailProduct);
router.put('/editproduct/:id', verifyToken, upload.array('images'), productController.updateProduct);
router.delete('/removeproduct/:id', verifyToken, productController.deleteProduct);
//orderController
router.get('/listorder', verifyToken, orderController.getAllOrders);
router.post('/addstatus/:id', verifyToken, orderController.orderStatus);
//cancelController
router.get('/cancellist', verifyToken, cancelController.listCancel);
router.put('/cancelorder/:id', verifyToken, cancelController.statusCancel);
router.delete('/removecancel/:id', verifyToken, cancelController.deleteCancel);
//filterController
router.get('/pageproduct', verifyToken, filterController.pageProduct);


module.exports = router;
