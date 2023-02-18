import React, { useState } from "react";
import Cart from "./Component/Cart/Cart";
import Header from "./Component/Header/Header";
import Meals from "./Component/Meals/Meals";
import CartContextProvider from "./Component/store/CartContextProvider";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const cartOpenHndlr = () => {
    setCartOpen(true);
  };
  const cartCloseHndlr = () => {
    setCartOpen(false);
  };
  return (
    <CartContextProvider>
      {cartOpen && <Cart onClose={cartCloseHndlr} />}
      <Header onCartBtnClick={cartOpenHndlr} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
