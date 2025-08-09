'use client';

import '../../styles/CartPage.css';
import { useCart } from '@/contexts/CartContext';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const CART_KEY = 'cart';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, decrementFromCart, clearCart } = useCart();

  // Compute total price
  const total = cart.reduce((sum, item) => sum + item.price * (item.amount ?? 1), 0);

  return (
    <main className="cart-main">
      <h1 className="cart-header">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-list">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="left-div">
                  {item.img ? (
                    <img src={item.img} alt={item.service} className="item-thumb" />
                  ) : (
                    <div className="item-thumb-placeholder" />
                  )}
                </div>

                <div className="cart-mid">
                  <div className="cart-title">{item.service}</div>
                  {item.serviceInfo && <div className="cart-info">{item.serviceInfo}</div>}
                </div>

                <div className="right-div">
                  <div className="cart-text">
                    <div className="cart-qty">Qty: {item.amount ?? 1}</div>
                    <div className="cart-price">${(item.price * (item.amount ?? 1)).toFixed(2)}</div>
                  </div>
                  <div className="cart-buttons">
                    <button onClick={() => addToCart(item)} className="cart-add-button">
                      <FaArrowUp />
                    </button>
                    <button onClick={() => decrementFromCart(item.id)} className="cart-dec-button">
                      <FaArrowDown />
                    </button>
                    <button onClick={() => removeFromCart(item.id)} className="cart-remove-button">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <div className="cart-total">Total: ${total.toFixed(2)}</div>
            <div>
              <button onClick={() => {
                const ok = confirm('Are you sure you want to clear your cart? This cannot be undone.');
                if(!ok) return;
                clearCart();
                }} className="cart-clear-button" disabled={cart.length === 0}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
