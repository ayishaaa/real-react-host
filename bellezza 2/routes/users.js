var express = require('express');
var router = express.Router();
var verifyToken = require("../middleware/userToken");
var userController = require("../controller/userController");
var otpController = require("../controller/otpController");
var bannerController = require("../controller/bannerController");
var categoryController = require("../controller/categoryController");
var tagController = require("../controller/tagController");
var brandController = require("../controller/brandController");
var materialController = require("../controller/materialController");
var couponController = require("../controller/couponController");
var productController = require("../controller/productController");
var orderController = require("../controller/orderController");
var cancelController = require("../controller/cancelController");
var filterController = require("../controller/filterController");

/* GET users listing. */
//userController
router.post('/usercollect',userController.userLogin);
router.post('/adduser', userController.userSide);
router.post('/edituser/:id', userController.updateUser);
router.post('/changepassword/:id', userController.changePassword);
router.get('/profile', verifyToken, userController.getUserProfile);
//otpController
router.post('/forgotpassword', otpController.forgotPassword);
router.post('/verifyotp', otpController.verifyOtp);
router.post('/resetpassword', otpController.resetPassword);
//bannerController
router.get('/listbanner', bannerController.collectedBanner);
//categoryController
router.get('/listcategory', categoryController.collectedCategory);
//tagController
router.get('/listtag', tagController.collectedTag);
//brandController
router.get('/listbrand', brandController.collectedBrand);
//materialController
router.get('/listmaterial', materialController.collectedMaterial);
//couponController
router.get('/listcoupon', couponController.collectedCoupon);
//productController
router.get('/listproduct', productController.collectedProduct);
router.get('/detailproduct/:id', productController.detailProduct);
//orderController
router.post('/addorder', orderController.orderAdd);
router.get('/detailorders/:id', orderController.detailOrders);
router.get('/detailorder/:id', orderController.detailOrder);
router.get('/trackorder/:id', orderController.trackOrder);
//cancelController
router.post('/cancelorder/:id', cancelController.orderCancel);
//filterController
router.get('/pageproduct', filterController.pageProduct);

module.exports = router;
