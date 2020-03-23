require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const cors = require("cors");
const stripe = require("stripe")("STRIPE_SECRET_KEY");
const uuid = require("uuid/v4");
const paymentCtrl = require("./controllers/stripeController");

const authCTRL = require("./controllers/authController");
const blogCtrl = require("./controllers/blogController");
const cartCtrl = require("./controllers/cartController");
const productCtrl = require("./controllers/productsController");
const aboutCtrl = require("./controllers/aboutController");
const contactCtrl = require(`./controllers/contactCtrl`),
  subCtrl = require("./controllers/subscriptionController");
(checkUser = require("./middlewares/checkUser")),
  (checkAdmin = require("./middlewares/checkAdmin")),
  (mailerCtrl = require("./controllers/subscriptionMailerController")),
  (coinCTRL = require("./controllers/coinDeskController"));
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/../build`));
// <------------------S3 Code-------------------------->
const aws = require("aws-sdk");

const { S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

app.get("/sign-s3", (req, res) => {
  aws.config = {
    region: "us-west-1",
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  };

  const s3 = new aws.S3({ signatureVersion: "v4" });
  const fileName = req.query["file-name"];
  const fileType = req.query["file-type"];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read"
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    // console.log(data);
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData);
  });
});
// <--------------------S3 Code------------------------>
//<-----------------Socket code------------------------>
const socketio = require("socket.io"),
  http = require("http");
const server = http.createServer(app);
// console.log(server);

const io = socketio(server);
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./sockets/users");
const router = require("./sockets/router");

io.on("connect", socket => {
  socket.on("join", ({ name, room }, callback) => {
    console.log("join room hit");
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    console.log("send message hit");
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});
app.use(router);
//<-----------------Socket code------------------------>
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: SESSION_SECRET
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(db => {
  app.set("db", db);
  app.listen(SERVER_PORT || 4133, () =>
    console.log(`Server running on ${SERVER_PORT}`)
  );
  console.log("Database connected");
});

//Auth Endpoints
app.post(`/api/login`, checkUser, authCTRL.login);
app.post(`/api/register`, authCTRL.register);
app.post(`/api/logout`, authCTRL.logout);
app.get(`/api/user`, checkUser);

//Products Endpoints
app.get(`/api/products`, productCtrl.allProducts);
// app.get(`/api/products`, productCtrl.searchProducts)
app.post(`/api/products`, productCtrl.addProduct);
app.put(`/api/products/:id`, productCtrl.editProduct);
app.delete(`/api/products/:id`, productCtrl.deleteProduct);
app.get(`/api/product/:id`, productCtrl.oneProduct);

//Cart Endpoints

app.get(`/api/carts/:id`, cartCtrl.getUsersProducts);
app.post(`/api/carts`, cartCtrl.addToCart);
app.delete(`/api/carts/:id`, cartCtrl.deleteFromCart);

//Blog Endpoints
app.get(`/api/blog`, blogCtrl.allBlogPosts);
app.post(`/api/blog`, blogCtrl.newBlogPost);
app.put(`/api/blog/:id`, blogCtrl.editBlogPost);
app.delete(`/api/blog/:id`, blogCtrl.deleteBlogPost);
app.get(`/api/blog/:id`, blogCtrl.oneBlogPost);

// //About Endpoints
// app.get(`/api/about`, aboutCtrl.getAboutData);
// app.put(`/api/about/:id`, aboutCtrl.editAboutData);

//Contact Endpoints
app.get(`/api/contact`, contactCtrl.getAllMessages);
app.get(`/api/contact/:id`, contactCtrl.getOneMessage);
app.post(`/api/contact`, contactCtrl.newMessage);
app.delete(`/api/contact/:id`, contactCtrl.deleteMessage);

//Email Subscription Endpoints
app.get(`/api/subscription`, subCtrl.getSubs);
app.post(`/api/subscription`, subCtrl.addSub);

//Nodemailer endpoints
app.post("/api/mail", mailerCtrl.sendEmail);
// app.post("/mail/blog/:id", mailerCtrl.sendEmail);

//CMC request endpoints
// app.get("/api/cmc", coinCTRL.getCoinData);
// app.get("/api/coindesk", coinCTRL.getBTCPrices);

//Stripe controller
app.post("/api/payment", paymentCtrl.payment);
