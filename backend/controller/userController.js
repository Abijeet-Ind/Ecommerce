const db = require("./../model/index");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = db.users;


const statusFuction = (res, status, message, data) => {
    data === undefined ? "empty" : data
    res.status(200).json({
        status,
        message,
        data
    })
}

exports.signup = async (req, res) => {
    console.log(req.body)
    console.log(req.params)

    try {
        console.log(req.body)
        const findInsertedEmail = await user.findOne(({
            where: {
                email: req.body.email,
                role: req.params.admin === "admin" ? "admin" : "user"
            }
        }));

        if (findInsertedEmail) {
            statusFuction(res, 'Failed', "email id already registered");
        }

        if (req.body.password.localeCompare(req.body.passwordConfirm) === 0) {
            const signinData = await user.create({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 12),
                role: req.params.admin ? "admin" : "user"
            })

            statusFuction(res, 'success', "user created successfully");

        } else {
            statusFuction(res, 'Failed', "please insert the correct password");

        }
    } catch (err) {
        console.log("error found", err);
    }
}


exports.login = async (req, res) => {
    console.log(req.body)
    try{
        const findUser = await user.findOne(({ where: { email: req.body.email } }));
        
        if(await bcrypt.compare(req.body.password, findUser.password)){
            // createCookie(findUser, res, 200, "logged in successfully");
            statusFuction(res, "success", "logged in successfully", findUser);
        }else {
            statusFuction(res, "FAILED", "NOT MATCHED");
        }

    } catch(err){
        console.log("error found", err);
    }
}