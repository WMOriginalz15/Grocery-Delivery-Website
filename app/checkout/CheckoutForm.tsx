"use client";
import { useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { useCart } from "@/hooks/useCart";
import { usePaystackPayment } from "react-paystack";
import { useRouter } from "next/navigation";

const PAYSTACK_PUBLIC_KEY = "pk_test_cce5638537fb949016c734efd4a9473279ad4762";

export default function CheckoutForm() {
  const { cartProducts, cartTotalAmount, handleClearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    contact: "",
    subscribe: false,
    shippingType: "ship",
    country: "Ghana",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postal: "",
    phone: "",
    paymentMethod: "paystack",
    billingSame: true,
    billingAddress: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentRef, setPaymentRef] = useState(null);
  const [redirectOrderId, setRedirectOrderId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save order to backend
  const saveOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cartProducts, totalAmount: cartTotalAmount }),
      });
      const data = await response.json();
      setOrderId(data.id || null);
      setLoading(false);
      return response.ok;
    } catch (error) {
      setLoading(false);
      alert("Order failed!");
      return false;
    }
  };

  // Paystack config
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: form.contact,
    amount: Math.round(cartTotalAmount * 100), // GHS to pesewas
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: "GHS", // Set currency to Ghanaian Cedis
    metadata: {
      custom_fields: [
        { display_name: "Phone", variable_name: "phone", value: form.phone },
      ],
    },
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const handlePaystackSuccess = (ref, orderId) => {
    setPaymentRef(ref?.reference || null);
    setRedirectOrderId(orderId);
    setSubmitted(true);
    setTimeout(() => {
      if (orderId) router.push(`/order/${orderId}?clearCart=1`);
    }, 3000); // 3 seconds to show thank you message
  };

  const handlePaystackClose = () => {
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.paymentMethod === "paystack") {
      setLoading(true);
      try {
        const response = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, cartProducts, totalAmount: cartTotalAmount }),
        });
        const data = await response.json();
        setLoading(false);
        if (response.ok && data.id) {
          initializePayment({
            onSuccess: (ref) => handlePaystackSuccess(ref, data.id),
            onClose: handlePaystackClose,
          });
        } else {
          alert("Order failed!");
        }
      } catch (error) {
        setLoading(false);
        alert("Order failed!");
      }
    } else {
      setLoading(true);
      try {
        const response = await fetch("/api/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, cartProducts, totalAmount: cartTotalAmount }),
        });
        const data = await response.json();
        setLoading(false);
        if (response.ok && data.id) {
          setSubmitted(true);
          setRedirectOrderId(data.id);
          setTimeout(() => {
            router.push(`/order/${data.id}?clearCart=1`);
          }, 3000);
        } else {
          setSubmitted(true);
        }
      } catch (error) {
        setLoading(false);
        alert("Order failed!");
      }
    }
  };

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Thank you for your order!</h2>
        <div className="mb-2">Your payment was successful.</div>
        {paymentRef && (
          <div className="mb-2">Payment Reference: <span className="font-mono">{paymentRef}</span></div>
        )}
        <div className="mb-2">You will be redirected to your order summary shortly.</div>
      </div>
    );
  }

  return (
    <form className="max-w-xl mx-auto p-6 bg-white rounded shadow" onSubmit={handleSubmit}>
      {/* Contact */}
      <h2 className="font-bold mb-2">Contact</h2>
      <input
        type="text"
        name="contact"
        placeholder="Email or mobile phone number"
        value={form.contact}
        onChange={handleChange}
        className="input w-full mb-2 border p-2 rounded"
        required
      />
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          name="subscribe"
          checked={form.subscribe}
          onChange={handleChange}
          className="mr-2"
        />
        Email me with news and offers
      </label>

      {/* Delivery */}
      <h2 className="font-bold mt-4 mb-2">Delivery</h2>
      <div className="flex gap-4 mb-2">
        <label>
          <input
            type="radio"
            name="shippingType"
            value="ship"
            checked={form.shippingType === "ship"}
            onChange={handleChange}
            className="mr-1"
          />
          Ship
        </label>
        <label>
          <input
            type="radio"
            name="shippingType"
            value="pickup"
            checked={form.shippingType === "pickup"}
            onChange={handleChange}
            className="mr-1"
          />
          Pickup in store
        </label>
      </div>
      <select
        name="country"
        value={form.country}
        onChange={handleChange}
        className="input w-full mb-2 border p-2 rounded"
      >
        <option value="Ghana">Ghana</option>
      </select>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={form.firstName}
          onChange={handleChange}
          className="input w-1/2 border p-2 rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={form.lastName}
          onChange={handleChange}
          className="input w-1/2 border p-2 rounded"
          required
        />
      </div>
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="input w-full mb-2 border p-2 rounded"
        required
      />
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="input w-1/2 border p-2 rounded"
          required
        />
        <input
          type="text"
          name="postal"
          placeholder="Postal code (optional)"
          value={form.postal}
          onChange={handleChange}
          className="input w-1/2 border p-2 rounded"
        />
      </div>
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="input w-full mb-2 border p-2 rounded"
        required
      />

      {/* Payment */}
      <h2 className="font-bold mt-4 mb-2">Payment</h2>
      <div className="flex flex-col gap-2 mb-2">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="paystack"
            checked={form.paymentMethod === "paystack"}
            onChange={handleChange}
            className="mr-1"
          />
          Paystack
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="pickup"
            checked={form.paymentMethod === "pickup"}
            onChange={handleChange}
            className="mr-1"
          />
          Payment at Pickup
        </label>
      </div>

      {/* Billing Address */}
      <h2 className="font-bold mt-4 mb-2">Billing address</h2>
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="billingSame"
          checked={form.billingSame}
          onChange={handleChange}
          className="mr-2"
        />
        Same as shipping address
      </label>
      {!form.billingSame && (
        <input
          type="text"
          name="billingAddress"
          placeholder="Billing address"
          value={form.billingAddress}
          onChange={handleChange}
          className="input w-full mb-2 border p-2 rounded"
        />
      )}

      <button type="submit" className="btn btn-primary mt-4 w-full bg-green-600 text-white py-2 rounded" disabled={loading}>
        {loading ? "Processing..." : "Pay now"}
      </button>
    </form>
  );
}
