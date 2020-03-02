module.exports = {
  allProducts: (req, res) => {
    //gets all user product to display
  },
  searchProducts: (req, res) => {
    //get products that match the req.query pass in
  },
  addProduct: (req, res) => {
    //adds a new product to the db (only accessible by admin)
  },
  editProduct: (req, res) => {
    //allows editing of a product
  },
  deleteProduct: (req, res) => {
    //allows admin to delete a product
  },
  oneProduct: (req, res) => {
    //used for getting one product will run in tandem with edit
  }
};
