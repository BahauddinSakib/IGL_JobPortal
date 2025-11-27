"use client";
import React, { useEffect, useState } from "react";
import { Offcanvas, Button, Image } from "react-bootstrap";
import "@/external_css/cart.css";
import Link from "next/link";

const demoItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    quantity: 1,
    image: "https://via.placeholder.com/60",
  },
  {
    id: 2,
    name: "Smartphone Case",
    price: 19.99,
    quantity: 2,
    image: "https://via.placeholder.com/60",
  },
];

export default function Cart({ show, setShow }) {
  const [showCart, setShowCart] = useState(false);
  const [items, setItems] = useState(demoItems);

  useEffect(() => {
    setShowCart(show);
  }, [show]);

  const handleClose = () => {
    setShowCart(false);
    setShow(false);
  };

  const changeQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vat = subtotal * 0.2; // 20% VAT
  const total = subtotal + vat;

  return (
    <Offcanvas
      show={showCart}
      onHide={handleClose}
      placement="end"
      className="ec-side-cart"
    >
      <div className="ec-cart-inner">
        <div className="ec-cart-top">
          <div className="ec-cart-title">
            <h4 className="cart_title" style={{}}>
              My Cart
            </h4>
            <button className="ec-close" onClick={handleClose}>
              ×
            </button>
          </div>
          <ul className="eccart-pro-items">
            {items.map((item) => (
              <li key={item.id}>
                <div
                  style={{ height: "70px", backgroundColor: "#555" }}
                  href="#"
                  className="sidekka_pro_img"
                >
                  <Image
                    src={item.image}
                    rounded
                    width={60}
                    height={60}
                    alt="product"
                  />
                </div>
                <div className="ec-pro-content">
                  <span
                    style={{ color: "black" }}
                    href="#"
                    className="cart_pro_title"
                  >
                    {item.name}
                  </span>
                  <span className="cart-price" style={{ color: "black" }}>
                    <span>${item.price.toFixed(2)}</span> x {item.quantity}
                  </span>
                  <div className="qty-plus-minus">
                    <div
                      className="dec ec_qtybtn"
                      onClick={() => changeQuantity(item.id, -1)}
                    >
                      -
                    </div>
                    <input
                      className="qty-input"
                      type="text"
                      name="ec_qtybtn"
                      value={item.quantity}
                      readOnly
                    />
                    <div
                      className="inc ec_qtybtn"
                      onClick={() => changeQuantity(item.id, 1)}
                    >
                      +
                    </div>
                  </div>
                  <span
                    href="#"
                    className="remove"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="ec-cart-bottom">
          <div className="cart-sub-total">
            <table className="table cart-table">
              <tbody>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} className="text-left">
                    Sub-Total :
                  </td>
                  <td
                    style={{ border: "none", textAlign: "right" }}
                    className="text-right"
                  >
                    ${subtotal.toFixed(2)}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} className="text-left">
                    VAT (20%) :
                  </td>
                  <td
                    style={{ border: "none", textAlign: "right" }}
                    className="text-right"
                  >
                    ${vat.toFixed(2)}
                  </td>
                </tr>
                <tr style={{ border: "none" }}>
                  <td style={{ border: "none" }} className="text-left">
                    Total :
                  </td>
                  <td
                    style={{ border: "none", textAlign: "right" }}
                    className="text-right primary-color"
                  >
                    ${total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="cart_btn">
            <Link href="/cart">
              <Button variant="primary" className="w-100 mb-2">
                View Cart
              </Button>
            </Link>
            <Button variant="secondary" className="w-100">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </Offcanvas>
  );
}
