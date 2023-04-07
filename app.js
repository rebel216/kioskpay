const express = require("express");


const app = express();
const cors = require('cors');
app.use(cors())
const port = 10000;

// middlewares
app.use(express.json({ extended: false }));
app.use("/payment", require("./routes/payment"))
// app.use("/email", require("./routes/email"))
//app.use("/weight", require("./routes/weightread"))
//app.use("/app" , require("./routes/app"))

app.listen(port, () => console.log(`server started on port ${port}`));
// const cors = require('cors');

// const express = require('express'),
//     enrouten = require('express-enrouten'),
//     path = require('path'),
//     bodyParser = require('body-parser');

// var app = express();
// var port = 9000;

// app.use(cors({origin:"*"}))

// app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, 'server', 'views'));

// app.use(express.static(path.resolve(__dirname, 'public')));
// app.use(express.static(path.resolve(__dirname, 'server')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(enrouten({directory: 'controllers'}));

// app.listen(port, () => console.log(`server started on port ${port}`));
