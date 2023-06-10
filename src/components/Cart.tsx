import Link from "next/link";
import { useRef } from "react";
import {
  AiOutlineLeft,
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext, UseStateContextProps } from "@/context/StateContext";
import { urlFor } from "lib/client";
import getStripe from "lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    cartItems,
    totalPrice,
    totalQuantities,
    onRemove,
    setShowCart,
    toggleCartItemQuantity,
  } = useStateContext() as UseStateContextProps;

  const handleCheckout = async () => {
    toast.loading("Loading information...");
    const stripe = await getStripe();

    if (!stripe) return;
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: cartItems }),
    });
    if (response.status === 300) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef.current}>
      <div className="cart-container">
        <div>
          <button
            type="button"
            className="cart-heading"
            onClick={() => {
              if (setShowCart) setShowCart(false);
            }}
          >
            <AiOutlineLeft />
            <span className="heading">Your Cart</span>
            <span className="cart-num-items">{totalQuantities} items</span>
          </button>
          {cartItems?.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>
              <Link href={"/"}>
                <button
                  type="button"
                  onClick={() => {
                    if (setShowCart) setShowCart(false);
                  }}
                  className="btn"
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
          <div className="product-container">
            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div key={item._id} className="product">
                  <img
                    src={urlFor(item?.image[0]).toString()}
                    alt={item.name + " image"}
                    className="cart-product-image"
                  />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <div>
                        <p className="quantity-desc">
                          <span
                            className="minus"
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "dec")
                            }
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{item.quantity}</span>
                          <span
                            className="plus"
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "inc")
                            }
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        className="remove-item"
                        type="button"
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                PAY WITH STRIPE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
