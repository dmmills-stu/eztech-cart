'use client';

import '../../styles/CartPage.css';
import React, { useEffect, useState } from 'react';
import { CartItem } from '@/types/CartItem';

const CART_KEY = 'cart';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to parse cart from localStorage', err);
    }
  }, []);

  // Helper: compute total
  const total = cart.reduce((sum, item) => sum + item.price * (item.amount ?? 1), 0);

  // Remove single item (optional helper)
  const removeItem = (id: number) => {
    const updated = cart.filter((c) => c.id !== id);
    setCart(updated);
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
  };

  // Clear everything from UI and localStorage
  const clearCart = () => {
    if (!cart.length) return;
    const ok = confirm('Are you sure you want to clear your cart? This cannot be undone.');
    if (!ok) return;
    localStorage.removeItem(CART_KEY);
    setCart([]);
  };

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
                  <div className="cart-qty">Qty: {item.amount ?? 1}</div>
                  <div className="cart-price">${(item.price * (item.amount ?? 1)).toFixed(2)}</div>
                  <button onClick={() => removeItem(item.id)} className="cart-remove-button">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <div className="cart-total">Total: ${total.toFixed(2)}</div>
            <div>
              <button onClick={clearCart} className="cart-clear-button" disabled={cart.length === 0}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
