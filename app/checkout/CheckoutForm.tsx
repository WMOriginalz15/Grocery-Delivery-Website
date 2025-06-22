"use client";

import { useCart } from "@/hooks/useCart";
import { PaystackButton } from "react-paystack";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
  userEmail: string;
}

const CheckoutForm = ({ userEmail }: CheckoutFormProps) => {
  const { cartProducts, handleClearCart } = useCart();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const router = useRouter();

  // Null check for cartProducts
  const totalAmount = (cartProducts ?? []).reduce(
    (sum, item) => sum + (item.price * (item.quantity || 1)),
    0
  );

  // Hardcode for debug - replace with your real public key and a valid email
  const publicKey = "pk_test_cce5638537fb949016c734efd4a9473279ad4762";
  const email = userEmail && userEmail.includes("@") ? userEmail : "test@example.com";
  const amount = Number.isFinite(totalAmount) && totalAmount > 0 ? Math.round(totalAmount * 100) : 0;

  // Add custom_fields as required by PaystackButtonProps
  const paystackConfig = {
    email,
    amount,
    publicKey,
    currency: "GHS",
    metadata: {
      cart: cartProducts,
      custom_fields: [
        {
          display_name: "Cart Items",
          variable_name: "cart",
          value: JSON.stringify(cartProducts),
        },
      ],
    },
  };

  // Debug log
  console.log("Paystack config:", paystackConfig);

  const handleSuccess = async () => {
    setOrderError(null);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: email,
          cartProducts,
          totalAmount,
        }),
      });
      if (!res.ok) {
        throw new Error("Order not saved");
      }
      setPaymentSuccess(true);
      handleClearCart();
      setTimeout(() => {
        router.push("/orders");
      }, 2000);
    } catch (err) {
      setOrderError("Order was not saved. Please contact support.");
    }
  };

  if (paymentSuccess) {
  return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-teal-500 text-center text-lg font-semibold">Payment Successful!</div>
        <div className="text-center">Redirecting to your orders...</div>
      </div>
    );
  }

  if (!publicKey || !email || amount <= 0) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Error: Invalid payment parameters. Please check your Paystack public key, email, and cart total.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-semibold">Total: GHS {totalAmount.toFixed(2)}</div>
      {orderError && (
        <div className="text-red-600 text-center">{orderError}</div>
      )}
      <PaystackButton
        {...paystackConfig}
        text="Pay Now"
        onSuccess={handleSuccess}
        onClose={() => {}}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
      />
    </div>
  );
};

export default CheckoutForm;
