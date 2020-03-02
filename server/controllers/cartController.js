module.exports = {
  getProducts: (req, res) => {
    // Will get all items from the user-products table that match the user-id
  },
  addToCart: (req, res) => {
    // adds a new item assigned to the user's id to the user-products table
  },
  deleteFromCart: (req, res) => {
    // takes in the cart_id of the item and deletes it from table
  }
};
