'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cart from "../client_component/Cart";

const CartBtn = () => {
    const [show, setShow] = useState(false)
  return (
    <>
      <Link href="#" onClick={(e)=> {e.preventDefault(); setShow(true)}}>
        <i className="fa-solid fa-cart-shopping"></i>Cart
        <span className="cart-count">0</span>
      </Link>
      <Cart show={show} setShow={setShow}></Cart>
    </>
  );
};

export default CartBtn;
