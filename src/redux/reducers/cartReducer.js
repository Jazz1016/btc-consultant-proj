const initialState = {
  cart: [
    {
      user_id: 3,
      product_id: 13,
      cart_id: 95,
      product_name: "Bitcoin Security Course",
      product_img:
        "https://james-personal-proj.s3.amazonaws.com/e970a159-da7b-459b-a51e-c46bdf031810-Coinbase-Patent-Proposes-an-Upgraded-Security-for-Bitcoin-Payments-740x492.jpg",
      price: 50,
      description: "Learn how to hold your coins completely safe offline",
      available: true
    }
  ]
};

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DELETE_FROM_CART = "DELETE_FROM_CART";

export function getCart(data) {
  return {
    type: GET_CART,
    payload: data
  };
}

export function addToCart(data) {
  return {
    type: ADD_TO_CART,
    payload: data
  };
}

export function deleteFromCart(data) {
  return {
    type: DELETE_FROM_CART,
    payload: data
  };
}

export default function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CART:
      return { ...state, cart: payload };
    case ADD_TO_CART:
      return { ...state, cart: payload };
    case DELETE_FROM_CART:
      return { ...state, cart: payload };
    default:
      return state;
  }
}
