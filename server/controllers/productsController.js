module.exports = {
  allProducts: async (req, res) => {
    //gets all user product to display
    console.log("hit");
    const db = req.app.get("db").products;
    db.get_all_products()
      .then(products => {
        return res.status(200).send(products);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).send(err);
      });
  },
  searchProducts: (req, res) => {
    //get products that match the req.query pass in
  },
  addProduct: async (req, res) => {
    //adds a new product to the db (only accessible by admin)
    console.log("hit", req.body);
    const db = req.app.get("db").products;
    const {
      product_name,
      product_img,
      price,
      description,
      available
    } = req.body;
    await db
      .add_product(product_name, product_img, price, description, available)
      .then(products => {
        return res.status(202).send(products);
      })
      .catch(err => {
        console.log(err);
      });
  },
  editProduct: async (req, res) => {
    //allows editing of a product
    console.log(req.body, req.params);
    const db = req.app.get("db").products;
    const { id } = req.params;
    const {
      product_name,
      product_img,
      price,
      description,
      available
    } = req.body;
    await db.edit_product([
      id,
      product_name,
      product_img,
      price,
      description,
      available
    ]);
    res.sendStatus(200);
  },
  deleteProduct: async (req, res) => {
    //allows admin to delete a product
    const db = req.app.get("db").products;
    const { id } = req.params;
    await db
      .delete_product(id)
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
      });
  },
  oneProduct: async (req, res) => {
    //used for getting one product will run in tandem with edit
    const db = req.app.get("db").products;
    const { id } = req.params;
    await db
      .get_one_product(id)
      .then(product => {
        return res.status(200).send(product);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }
};
