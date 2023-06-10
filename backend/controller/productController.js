const db = require("./../model/index");
const productModel = db.products;
const cartAdd = db.carts;
const favorite = db.favs;
const bought = db.boughts;
const user = db.users;

const multer = require("multer");

const statusFuction = (res, status, message) => {
    res.status(200).json({
        status,
        message
    })
}


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});


exports.createProduct = async (req, res) => {
    // console.log(req.file)
    const product = await productModel.create({
        product: req.body.name,
        productPrice: req.body.price,
        description: req.body.description,
        slug: req.body.name.replaceAll(" ", "-").toLowerCase(),
        category: req.body.category,
        image: req.file.filename,
        brand: req.body.brand
    })

    statusFuction(res, "success", product);
}

exports.cart = async (req, res) => {
    const cart = await cartAdd.create({
        productId: req.body.productId,
        userId: req.body.userId
    })

    statusFuction(res, "success", cart);
}

exports.favorite = async (req, res) => {
    const fav = await favorite.create({
        productId: req.body.productId,
        userId: req.body.userId
    })

    statusFuction(res, "success", fav);
}

exports.dispayAll = async (req, res) => {
    const data = await productModel.findAll({});
    // console.log(data)
    statusFuction(res, "success", data);
}

exports.findone = async (req, res) => {
    const data = await productModel.findOne({
        where: {
            slug: req.params.slug
        }
    })
    statusFuction(res, "success", data);
}

exports.displayCart = async (req, res) => {
    const productData = [];
    const userAddedToCard = await cartAdd.findAll({
        where: {
            userId: req.body.userId
        }
    })

    for (let i = 0; i < userAddedToCard.length; i++) {
        let data = await productModel.findAll({
            where: {
                id: userAddedToCard[i].productId
            }
        })
        productData.push(data)
    }

    statusFuction(res, "success", productData);
}

exports.displayFav = async (req, res) => {
    const productData = [];

    const userAddedToFav = await favorite.findAll({
        where: {
            userId: req.body.userId
        }
    })

    for (let i = 0; i < userAddedToFav.length; i++) {
        let data = await productModel.findAll({
            where: {
                id: userAddedToFav[i].productId
            }
        })
        productData.push(data)
    }

    statusFuction(res, "success", productData);
}

exports.searchItem = async(req, res) => {
    console.log(req.params);
    const searchItem = await productModel.findOne({where: {
        product: req.params.item
    }})

    statusFuction(res, "success", searchItem);
}



exports.ordered = async (req, res) => {
    console.log(req.body)
    const orderedItem = await bought.create({
        userId: req.body.userid,
        address: req.body.address,
        productId: req.body.id,
        areaDescription: req.body.area,
        isOrderSend: "0"
    })

    statusFuction(res, "success", "ordered")
}

exports.viewOrder = async(req, res) => {
    const items = [];
    const users = [];

    const orderList = await bought.findAll({});
    
    for (let i = 0; i < orderList.length; i++) {
        const orders = await productModel.findAll({
            where:{
                id: orderList[i].productId
            }
        })
        items.push(orders);
    }
    

    for (let i = 0; i < orderList.length; i++) {
        const userOrder = await user.findAll({
            where:{
                id: orderList[i].id
            }
        })
        users.push(userOrder);
    }
        

    res.status(200).json({
        status: "success",
        message: items,
        user: users
    })
    // statusFuction(res, "success", items);
}

exports.orderSend = async(req, res) => {
    console.log(req.body)
    const sendedOrder = await findOne({where:{
        isOrderSend: req.body.updateID
    }})
    sendedOrder.id = "1";
    statusFuction(res, "success", "udpated to send order");
}