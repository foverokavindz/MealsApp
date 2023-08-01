/*
import CartContext from './cart';
import { useReducer } from 'react';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const handleAddItemToCart = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const HandleRemoveItemFromCart = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItemToCart,
    removeItem: HandleRemoveItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;


*/

// Importing necessary modules and components
import CartContext from './cart'; // Importing the CartContext to use as the provider
import { useReducer } from 'react'; // Importing the useReducer hook from React

// Defining the default state for the cart
const defaultCartState = {
  items: [], // An array to hold the cart items
  totalAmount: 0, // The total amount (e.g., price) of all items in the cart
};

// Defining the cartReducer function to handle state changes for the cart
const cartReducer = (state, action) => {
  // If the action type is 'ADD'
  if (action.type === 'ADD') {
    // Calculate the updated total amount by adding the price of the new items
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // Find the index of the existing item (if any) in the cart based on its ID
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // Get the existing item (if it exists) from the cart based on the index
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems; // Variable to hold the updated items array

    // If the item already exists in the cart, update its quantity
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount, // Update the quantity
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // If the item doesn't exist in the cart, add it as a new item
      updatedItems = state.items.concat(action.item);
    }

    // Return the updated state with the new items array and total amount
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // If the action type is 'REMOVE'
  if (action.type === 'REMOVE') {
    // Find the index of the existing item to be removed based on its ID
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    // Get the existing item from the cart based on the index
    const existingItem = state.items[existingCartItemIndex];
    // Calculate the updated total amount by subtracting the price of the removed item
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems; // Variable to hold the updated items array

    // If the quantity of the existing item is 1, remove it from the cart
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      // If the quantity is greater than 1, decrease the quantity by 1
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // Return the updated state with the new items array and total amount
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // If the action type doesn't match any of the defined types, return the default state
  return defaultCartState;
};

// CartProvider component that wraps the application and provides the cart context
const CartProvider = (props) => {
  // useReducer hook to manage the cart state with the cartReducer function and the default state
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // Function to add an item to the cart by dispatching the 'ADD' action
  const handleAddItemToCart = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  // Function to remove an item from the cart by dispatching the 'REMOVE' action
  const handleRemoveItemFromCart = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  // cartContext object containing the current cart state and functions
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItemToCart,
    removeItem: handleRemoveItemFromCart,
  };

  // The CartProvider component renders the CartContext.Provider, passing cartContext as the value
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

// Exporting the CartProvider component as the default export
export default CartProvider;
