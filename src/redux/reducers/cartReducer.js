const initialState = {
  cart: []
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
