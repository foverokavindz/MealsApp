import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import { useState } from 'react';
import CartProvider from './context/CartProvider';

function App() {
  const [isCartShow, setIsCartShow] = useState(false);

  const handleToggleIsCartShow = () => {
    setIsCartShow((prevState) => !prevState);
  };
  return (
    <CartProvider>
      {isCartShow && <Cart onShowCart={handleToggleIsCartShow} />}
      <Header onShowCart={handleToggleIsCartShow} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
