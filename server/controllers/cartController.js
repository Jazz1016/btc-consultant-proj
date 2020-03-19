module.exports = {
  getUsersProducts: async (req, res) => {
    // Will get all items from the user-products table that match the user-id
    console.log("hit cart get user products");
    const db = req.app.get("db").cart;
    const { id } = req.params;
    let products = await db.get_users_products(+id);
    console.log(products);
    if (products) {
      return res.status(200).send(products);
    } else {
      return res.sendStatus(500);
    }
  },
  addToCart: async (req, res) => {
    // adds a new item assigned to the user's id to the user-products table
    const db = req.app.get("db").cart;
    const { user_id, product_id } = req.body;
    try {
      console.log(user_id, product_id);
      await db.add_to_cart([user_id, product_id]);
      let newCart = await db.get_users_products(user_id);
      // console.log(newCart);
      res.status(200).send(newCart);
    } catch {
      res.sendStatus(500);
    }
  },
  deleteFromCart: async (req, res) => {
    // takes in the cart_id of the item and deletes it from table
    const db = req.app.get("db").cart;
    // console.log("hit", req.params);
    const { id } = req.params;
    try {
      await db.delete_from_cart(+id);
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }
};
