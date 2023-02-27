import { CartItem } from "@/@types/CartItem";
import { createContext, useContext, useState, ReactNode } from "react";
import toast from "react-hot-toast";

interface StateContextProps {
  children: ReactNode;
}
export interface UseStateContextProps {
  totalPrice: number;
  showCart: boolean;
  cartItems: CartItem[];
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  setCartItems: (cartItems: CartItem[]) => void;
  setShowCart: (state: boolean) => void;
  setTotalQuantities: (quantity: number) => void;
  setTotalPrice: (number: number) => void;
  decQty: () => void;
  onAdd: (product: CartItem, quantity: number) => void;
  toggleCartItemQuantity: (id: number, value: string) => void;
  onRemove: (product: CartItem) => void;
}

const Context = createContext<UseStateContextProps | null>(null);

export const StateContext = ({ children }: StateContextProps) => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let index: number = 0;

  const onAdd = (product: CartItem, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item: CartItem) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        return {
          ...cartProduct,
          quantity: quantity,
        };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const onRemove = (product: CartItem) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    if (!foundProduct) return;

    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price - foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantitites) => prevTotalQuantitites - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id: number, value: string) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    const newCartItems = cartItems.filter((item) => item._id !== id);
    if (value === "inc" && foundProduct) {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: (foundProduct.quantity += 1) },
      ]);
      const { price } = foundProduct;
      setTotalPrice((prevTotalPrice) => prevTotalPrice + price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec" && foundProduct) {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: (foundProduct.quantity -= 1) },
        ]);
        const price = foundProduct.price;
        setTotalPrice((prevTotalPrice) => prevTotalPrice - price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty <= 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        totalPrice,
        showCart,
        setCartItems,
        cartItems,
        totalQuantities,
        qty,
        setShowCart,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  return useContext(Context);
};
