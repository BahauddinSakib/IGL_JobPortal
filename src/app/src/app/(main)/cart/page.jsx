"use client";
import React from "react";
import Link from "next/link";
import useAuthUser from "@/custom_hooks/useAuthUser";

const CartPage = () => {
  const { user, isAuthenticated, setUser } = useAuthUser();



  // const [cart, setCart] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/carts/cart/${user?.id}`,
  //       { withCredentials: true }
  //     )
  //     .then((res) => setCart(res.data))
  //     .catch((err) => console.error(err));
  // }, []);
 const cartItems = [
    {
      id: 1,
      name: "Stylish Baby Shoes",
      image: "/assets/images/product-image/1.jpg",
      price: 56.00,
      quantity: 1
    },
    {
      id: 2,
      name: "Unisex Fully Solid Hoodie",
      image: "/assets/images/product-image/2.jpg",
      price: 75.00,
      quantity: 1
    },
  ];
  // cart calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const total = subtotal + shipping;

  if (!cartItems) return <div>Loading...</div>;
  return (
    <div className="cart-page">
      <div className="container mt-40 mb-40">
        <h1 className="cart-title">Your Shopping Cart</h1>

        <div className="cart-content">
          {/* Cart Items Table */}
          <div className="cart-items">
            <div className="cart-header">
              <div className="header-product">Product</div>
              <div className="header-price">Price</div>
              <div className="header-quantity">Quantity</div>
              <div className="header-total">Total</div>
              <div className="header-remove"></div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-product">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />
                  <span className="product-name">{item.name}</span>
                </div>
                <div className="item-price">${item.price.toFixed(2)}</div>
                <div className="item-quantity">
                  <input
                    type="number"
                    min="1"
                    defaultValue={item.quantity}
                    className="quantity-input"
                  />
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="item-remove">
                  <button className="remove-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="summary-row discount-row">
              <div>
                <span>Discount</span>
                <button className="apply-coupon">Apply Coupon</button>
              </div>
              <span>$0.00</span>
            </div>

            <div className="coupon-input">
              <input type="text" placeholder="Enter coupon code" />
              <button>Apply</button>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="checkout-button">Proceed to Checkout</button>

            <Link href="/shop" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-title {
          font-size: 28px;
          margin-bottom: 30px;
          color: #333;
          font-weight: 600;
        }

        .cart-content {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }

        .cart-items {
          flex: 1;
          min-width: 300px;
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .cart-header {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          font-weight: 600;
          color: #555;
        }

        .header-product {
          flex: 3;
        }
        .header-price {
          flex: 1;
          text-align: center;
        }
        .header-quantity {
          flex: 1;
          text-align: center;
        }
        .header-total {
          flex: 1;
          text-align: center;
        }
        .header-remove {
          flex: 0.5;
        }

        .cart-item {
          display: flex;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid #eee;
        }

        .item-product {
          flex: 3;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .product-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 4px;
        }

        .product-name {
          font-weight: 500;
        }

        .item-price,
        .item-total {
          flex: 1;
          text-align: center;
          font-weight: 500;
        }

        .item-quantity {
          flex: 1;
          text-align: center;
        }

        .quantity-input {
          width: 60px;
          padding: 8px;
          text-align: center;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .item-remove {
          flex: 0.5;
          text-align: center;
        }

        .remove-button {
          background: none;
          border: none;
          color: #ff6b6b;
          cursor: pointer;
          padding: 5px;
        }

        .cart-summary {
          width: 350px;
          background: white;
          border-radius: 8px;
          padding: 25px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .summary-title {
          font-size: 20px;
          margin-bottom: 20px;
          color: #333;
          font-weight: 600;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px dashed #eee;
        }

        .discount-row {
          flex-direction: column;
          gap: 10px;
        }

        .apply-coupon {
          background: none;
          border: none;
          color: #4e9cff;
          cursor: pointer;
          font-size: 14px;
          padding: 0;
          margin-left: 10px;
        }

        .coupon-input {
          display: flex;
          margin-bottom: 20px;
        }

        .coupon-input input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
        }

        .coupon-input button {
          padding: 0 15px;
          background: #4e9cff;
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          margin: 25px 0;
          font-size: 18px;
          font-weight: 600;
        }

        .checkout-button {
          width: 100%;
          padding: 12px;
          background: #3bb77e;
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 15px;
          transition: background 0.2s;
        }

        .checkout-button:hover {
          background: #2ea369;
        }

        .continue-shopping {
          display: block;
          text-align: center;
          color: #4e9cff;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .cart-content {
            flex-direction: column;
          }

          .cart-summary {
            width: 100%;
          }

          .cart-header {
            display: none;
          }

          .cart-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .item-product,
          .item-price,
          .item-quantity,
          .item-total,
          .item-remove {
            width: 100%;
            text-align: left;
          }

          .item-quantity input {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CartPage;
