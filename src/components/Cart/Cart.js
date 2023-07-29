import Model from '../UI/Model';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../context/cart';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const handlerCartItemRemove = (id) => {
    cartContext.removeItem(id);
  };
  const handlerCartItemAdd = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={handlerCartItemRemove.bind(null, item.id)}
          onAdd={handlerCartItemAdd.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Model onClick={props.onShowCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onShowCart}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={props.onShowCart}>
            Order
          </button>
        )}
      </div>
    </Model>
  );
};

export default Cart;
