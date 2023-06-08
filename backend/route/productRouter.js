const router = require("express").Router();
const productController = require("./../controller/productController");

const { multer, storage } = require("../services/multer");
const upload = multer({ storage: storage });

router.post("/uploadProduct", upload.single("image"),productController.createProduct);
router.post("/addtocart", productController.cart);
router.post("/favorite", productController.favorite);


router.get('/all', productController.dispayAll)
router.get('/one/:slug', productController.findone)

router.post("/cart", productController.displayCart);
router.post("/favourite", productController.displayFav);

router.get("/search/:item", productController.searchItem);

module.exports = router;