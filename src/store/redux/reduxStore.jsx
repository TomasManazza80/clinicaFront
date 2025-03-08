import { createStore } from "redux";



import { CartReducer } from "../../cart/cartreducer";



export const ReduxStore = createStore(CartReducer);
