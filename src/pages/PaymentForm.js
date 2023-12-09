import React, { useState } from "react";
import "./paymentForm.css";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useTotalAmount } from "../contexts/cart/carContext2";

// Modal.setAppElement("#root"); // Set the root element for the modal

const PaymentForm = (props) => {

  const [showSavedForm, setShowSavedForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const closeModal = () => {
    props.setModalIsOpen(false);
  };
  const { totalAmount } = useTotalAmount();

  const saveAddress = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAddress = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      pincode: formData.get("pincode"),
      city: formData.get("city"),
      landmark: formData.get("landmark"),
    };

    // Update addresses state with the new address
    setAddresses([...addresses, newAddress]); // Spread existing addresses and add new address

    setShowSavedForm(true);
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Nvc4SSBTi6yZ5ucxva2YeRXHgIbaFtZRP5Jux1WxBdxeS7S2haubQz8cIq6Ovt5sHxhvYawAATn1lOPrIyUcJug00G40923iM"
    );

    const body = {
      products: [
        {
          amount: totalAmount,
          // other product properties if needed
        },
      ],
    };

    const headers = {
      "content-type": "application/json",
    };

    const response = await fetch(
      "http://localhost:7000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if(result.error){
      console.log(result.error);
    }
  };

  return (
    <div className="save-form">
      {/* <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modalForm"
      > */}
      <div className="form-container">
        <h2>Delivery Address</h2>
        <form
          id="addressForm"
          onSubmit={(e) => {
            saveAddress(e);
          }}
        >
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required="" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9]{10}"
              required=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" required="" />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode:</label>
            <input type="text" id="pincode" name="pincode" required="" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" required="" />
          </div>
          <div className="form-group">
            <label htmlFor="landmark">Landmark:</label>
            <input type="text" id="landmark" name="landmark" required="" />
          </div>
          <div className="buttons">
            <button type="submit" onClick={() => setShowSavedForm(true)}>
              Save Address
            </button>
            <Link to="/cart">
              <button type="button" id="cancelButton" onClick={closeModal}>
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
      {showSavedForm ? (
        <div className="saved-form">
          <h2>Deliver Here :-</h2>
          {addresses.map((address, index) => (
            <p key={index}>
              <strong>Name:</strong> {address.name}
              <br />
              <strong>Phone:</strong> {address.phone}
              <br />
              <strong>Address:</strong> {address.address}
              <br />
              <strong>Pincode:</strong> {address.pincode}
              <br />
              <strong>City:</strong> {address.city}
              <br />
              <strong>Landmark:</strong> {address.landmark}
            </p>
          ))}
          <button className="payment-buttons" type="submit" onClick={makePayment}>
            Proceed to payment
          </button>
        </div>
      ) : (
        <></>
      )}
      {/* </Modal> */}
    </div>
  );
};

export default PaymentForm;
