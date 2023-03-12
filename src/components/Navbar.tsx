import { useStateContext, UseStateContextProps } from "@/context/StateContext";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } =
    useStateContext() as UseStateContextProps;
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Beat Store</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => {
          if (setShowCart) setShowCart(!showCart);
        }}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};
export default Navbar;
