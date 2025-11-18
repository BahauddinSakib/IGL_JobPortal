'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import '@/external_css/checkout.css'

const Checkout = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Stylish Baby Shoes',
      price: 56.00,
      quantity: 1,
      image: '/assets/images/product-image/1.jpg'
    },
    {
      id: 2,
      name: 'Unisex Fully Solid Hoodie',
      price: 75.00,
      quantity: 1,
      image: '/assets/images/product-image/2.jpg'
    },
    {
      id: 3,
      name: 'Beautiful T-shirt For Women',
      price: 48.00,
      quantity: 1,
      image: '/assets/images/product-image/3.jpg'
    },
    {
      id: 4,
      name: 'Wool Hat For Men',
      price: 95.00,
      quantity: 1,
      image: '/assets/images/product-image/4.jpg'
    }
  ])

  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [showCouponField, setShowCouponField] = useState(false)

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryCharge = 5.00
  const couponDiscount = 0.00 // You can implement coupon logic here
  const total = subtotal + deliveryCharge - couponDiscount

  return (
    <section className="ec-page-content section-space-p">
      <div className="container">
        <div className="row">
          <div className="ec-cart-leftside col-lg-8 col-md-12">
            <div className="ec-cart-content">
              <div className="ec-cart-inner">
                <div className="row">
                  <form action="#">
                    <div className="table-content cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th style={{textAlign: 'center'}}>Quantity</th>
                            <th>Total</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map(item => (
                            <tr key={item.id}>
                              <td data-label="Product" className="ec-cart-pro-name">
                                <Link href="/product-left-sidebar">
                                  <img className="ec-cart-pro-img mr-4" src={item.image} alt={item.name} />
                                  {item.name}
                                </Link>
                              </td>
                              <td data-label="Price" className="ec-cart-pro-price">
                                <span className="amount">${item.price.toFixed(2)}</span>
                              </td>
                              <td data-label="Quantity" className="ec-cart-pro-qty" style={{textAlign: 'center'}}>
                                <div className="cart-qty-plus-minus">
                                  <button 
                                    className="dec" 
                                    onClick={(e) => {
                                      e.preventDefault()
                                      updateQuantity(item.id, item.quantity - 1)
                                    }}
                                  >-</button>
                                  <input 
                                    style={{margin: "0px 5px"}}
                                    className="cart-plus-minus" 
                                    type="text" 
                                    value={item.quantity} 
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  />
                                  <button 
                                    className="inc" 
                                    onClick={(e) => {
                                      e.preventDefault()
                                      updateQuantity(item.id, item.quantity + 1)
                                    }}
                                  >+</button>
                                </div>
                              </td>
                              <td data-label="Total" className="ec-cart-pro-subtotal">
                                ${(item.price * item.quantity).toFixed(2)}
                              </td>
                              <td data-label="Remove" className="ec-cart-pro-remove">
                                <a href="#" onClick={(e) => {
                                  e.preventDefault()
                                  removeItem(item.id)
                                }}>
                                  <i className="ecicon eci-trash-o"></i>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="ec-cart-update-bottom">
                          <Link href="/shop">Continue Shopping</Link>
                          <button className="btn btn-primary">Check Out</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="ec-cart-rightside col-lg-4 col-md-12">
            <div className="ec-sidebar-wrap">
              <div className="ec-sidebar-block">
                <div className="ec-sb-title">
                  <h3 className="ec-sidebar-title">Summary</h3>
                </div>
                <div className="ec-sb-block-content">
                  <h4 className="ec-ship-title">Estimate Shipping</h4>
                  <div className="ec-cart-form">
                    <p>Enter your destination to get a shipping estimate</p>
                    <form action="#" method="post">
                      <div className="ec-cart-wrap">
                        <label>Country *</label>
                        <div className="ec-cart-select-inner">
                          <select 
                            name="ec_cart_country" 
                            className="ec-cart-select"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option value="" disabled>Select Country</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>
                      </div>
                      <div className="ec-cart-wrap">
                        <label>State/Province</label>
                        <div className="ec-cart-select-inner">
                          <select 
                            name="ec_cart_state" 
                            className="ec-cart-select"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          >
                            <option value="" disabled>Select State/Province</option>
                            {country === 'US' && (
                              <>
                                <option value="CA">California</option>
                                <option value="NY">New York</option>
                                <option value="TX">Texas</option>
                              </>
                            )}
                            {country === 'UK' && (
                              <>
                                <option value="ENG">England</option>
                                <option value="SCT">Scotland</option>
                              </>
                            )}
                            {/* Add more states/provinces as needed */}
                          </select>
                        </div>
                      </div>
                      <div className="ec-cart-wrap">
                        <label>Zip/Postal Code</label>
                        <input 
                          type="text" 
                          name="postalcode" 
                          placeholder="Zip/Postal Code"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                <div className="ec-sb-block-content">
                  <div className="ec-cart-summary-bottom">
                    <div className="ec-cart-summary">
                      <div>
                        <span className="text-left">Sub-Total</span>
                        <span className="text-right">${subtotal.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-left">Delivery Charges</span>
                        <span className="text-right">${deliveryCharge.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-left">Coupon Discount</span>
                        <span className="text-right">
                          {showCouponField ? (
                            <div className="ec-cart-coupan-content">
                              <form className="ec-cart-coupan-form">
                                <input 
                                  className="ec-coupan" 
                                  type="text" 
                                  required
                                  placeholder="Enter Your Coupon Code" 
                                  value={couponCode}
                                  onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button 
                                  className="ec-coupan-btn button btn-primary" 
                                  type="button"
                                  onClick={() => {
                                    // Implement coupon logic here
                                    setShowCouponField(false)
                                  }}
                                >
                                  Apply
                                </button>
                              </form>
                            </div>
                          ) : (
                            <a 
                              className="ec-cart-coupan" 
                              onClick={(e) => {
                                e.preventDefault()
                                setShowCouponField(true)
                              }}
                            >
                              Apply Coupon
                            </a>
                          )}
                        </span>
                      </div>
                      <div className="ec-cart-summary-total">
                        <span className="text-left">Total Amount</span>
                        <span className="text-right">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout