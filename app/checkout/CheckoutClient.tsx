"use client";

import { useCart } from "@/hooks/useCart";
import CheckoutForm from "./CheckoutForm";
import { useRouter } from "next/navigation";

const CheckoutClient = ({ userEmail }: { userEmail: string }) => {
  const { cartProducts } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="w-full">
      <CheckoutForm userEmail={userEmail} />
    </div>
  );
};

export default CheckoutClient;
