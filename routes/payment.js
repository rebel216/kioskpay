require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
        

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
        app.post('/done', asyncHandler((req, res) => {
            res.redirect(301,
                `http://localhost:3000/Kiosk-smartSolutions/#/success`)}))
    }
    catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router ;


// const express = require('express'),
//     enrouten = require('express-enrouten'),
//     path = require('path'),
//     bodyParser = require('body-parser');

// var app = express();
// var port = 9000;

// app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, 'server', 'views'));

// app.use(express.static(path.resolve(__dirname, 'public')));
// app.use(express.static(path.resolve(__dirname, 'server')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(enrouten({directory: 'controllers'}));

// app.listen(port);
