import { useStateContext, UseStateContextProps } from "@/context/StateContext";
import { runFireworks } from "lib/utils";
import Link from "next/link";
import { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
const Success = () => {
  const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL;
  const { setCartItems, setTotalPrice, setTotalQuantities } =
    useStateContext() as UseStateContextProps;

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email imbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email{" "}
          <a href={`mailto:${companyEmail}`} className="email">
            {companyEmail}
          </a>
        </p>
        <p>
          <Link href={"/"}>
            <button type="button" className="btn">
              Continue Shopping
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Success;
