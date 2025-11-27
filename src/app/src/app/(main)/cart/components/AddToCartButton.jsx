"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import useAuthUser from "@/custom_hooks/useAuthUser";

export default function AddToCartButton({ productId, pro_slug }) {
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated, setUser } = useAuthUser();
  const addToCart = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/carts/cart/create`,
        {
          items: [{ product_id: 1, quantity: 1 }],
        },
        { withCredentials: true }
      );
      alert("Added to cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      href=""
      className={`wishlist-btn ${loading ? "disabled" : ""}`}
      onClick={addToCart}
      aria-disabled={loading}
    >
      <i className="fa-solid fa-cart-arrow-down"></i>{" "}
      {loading ? "Adding..." : "Add to Cart"}
    </Link>
  );
}
