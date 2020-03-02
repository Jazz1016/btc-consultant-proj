require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const authCTRL = require("./controllers/authController");
const aboutCtrl = require("./controllers/authController");
const blogCtrl = require("./controllers/blogController");
const cartCtrl = require("./controllers/cartController");
const productCtrl = require("./controllers/productsController");
const contactCtrl = require(`./controllers/contactCtrl`);
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();
app.use(express.json());

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
app.post(`/api/login`, authCTRL.login);
app.post(`/api/register`, authCTRL.register);
app.post(`/api/logout`, authCTRL.logout);
// app.get(`/api/user`, authCTRL);

// //Cart Endpoints

// app.get(`/api/carts`, cartCtrl.getProducts);
// app.post(`/api/carts`, cartCtrl.addToCart);
// app.delete(`/api/carts/:id`, cartCtrl.deleteFromCart);

// //Blog Endpoints
// app.get(`/api/blog`, blogCtrl.allBlogPosts);
// app.post(`/api/blog`, blogCtrl.newBlogPost);
// app.put(`/api/blog/:id`, blogCtrl.editBlogPost);
// app.delete(`/api/blog/:id`, blogCtrl.deleteBlogPost);
// app.get(`/api/blog/:id`, blogCtrl.oneBlogPost);

// //About Endpoints
// app.get(`/api/about`, aboutCtrl.getAboutData);
// app.put(`/api/about/:id`, aboutCtrl.editAboutData);

// //Contact Endpoints
// app.get(`/api/contact`, contactCtrl.getAllMessages);
// app.post(`/api/contact`, contactCtrl.newMessage);
// app.delete(`/api/contact/:id`, contactCtrl.deleteMessage);

// //Products Endpoints
// app.get(`/api/products`, productCtrl.allProducts);
// // app.get(`/api/products`, productCtrl.searchProducts)
// app.post(`/api/products`, productCtrl.addProduct);
// app.put(`/api/products`, productCtrl.editProduct);
// app.delete(`/api/products`, productCtrl.deleteProduct);
// app.get(`/api/product/:id`, productCtrl.oneProduct);
