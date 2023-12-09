import React, { useContext , useEffect , useState } from "react";
import { BsCartX } from "react-icons/bs";
import { calculateTotal, displayMoney } from "../helpers/utils";
import useDocTitle from "../hooks/useDocTitle";
import cartContext from "../contexts/cart/cartContext";
import CartItem from "../components/cart/CartItem";
import EmptyView from "../components/common/EmptyView";
import { Link } from "react-router-dom";
import { useTotalAmount } from "../contexts/cart/carContext2";

const Cart = () => {
  const { updateTotalAmount } = useTotalAmount();
    // Initialize totalAmount with a default value
    const [totalAmount, setTotalAmount] = useState(0);

  useDocTitle("Cart");

  const { cartItems } = useContext(cartContext);
  // console.log(cartItems);

  const cartQuantity = cartItems.length;

  

  // total original price
  const cartTotal = cartItems.map((item) => {
    return item.originalPrice * item.quantity;
  });

  const calculateCartTotal = calculateTotal(cartTotal);
  const displayCartTotal = displayMoney(calculateCartTotal);

  // total discount
  const cartDiscount = cartItems.map((item) => {
    return (item.originalPrice - item.finalPrice) * item.quantity;
  });

  const calculateCartDiscount = calculateTotal(cartDiscount);
  const displayCartDiscount = displayMoney(calculateCartDiscount);

 

  


  useEffect(() => {
    // Calculate final total amount
    const calculatedTotalAmount = calculateCartTotal - calculateCartDiscount;

    const totalWithDelivery = calculatedTotalAmount + (calculatedTotalAmount < 4000 ? 40 : 0);
    setTotalAmount(totalWithDelivery);
    updateTotalAmount(totalWithDelivery);
  }, [updateTotalAmount, calculateCartTotal, calculateCartDiscount]);


  

  
  return (
    <>
      <section id="cart" className="section">
        <div className="container">
          {cartQuantity === 0 ? (
            <EmptyView
              icon={<BsCartX />}
              msg="Your Cart is Empty"
              link="/all-products"
              btnText="Start Shopping"
            />
          ) : (
            <div className="wrapper cart_wrapper">
              <div className="cart_left_col">
                {cartItems.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>

              <div className="cart_right_col">
                <div className="order_summary">
                  <h3>
                    Order Summary &nbsp; ( {cartQuantity}{" "}
                    {cartQuantity > 1 ? "items" : "item"} )
                  </h3>
                  <div className="order_summary_details">
                    <div className="price">
                      <span>Original Price</span>
                      <b>{displayCartTotal}</b>
                    </div>
                    <div className="discount">
                      <span>Discount</span>
                      <b>- {displayCartDiscount}</b>
                    </div>
                    <div className="delivery">
                      <span>Delivery</span>
                      <b>{totalAmount > "4000" ? "FREE" : "40"}</b>
                    </div>
                    <div className="separator"></div>
                    <div className="total_price">
                      <b>
                        <small>Total Price</small>
                      </b>
                      <b>{displayMoney(totalAmount)}</b>
                    </div>
                  </div>
                  <Link to="/address">
                   <button
                      type="button"
                      className="btn checkout_btn"
                      // onClick={()=>setShowPayment(true)}
                    >
                      Checkout
                    </button>
                    </Link>
                    {/* <PaymentForm modalIsOpen={showPayment} setModalIsOpen={setShowPayment}/> */}

                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
