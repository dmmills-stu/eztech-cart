'use client';

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
    <main style={styles.main}>
      <h1 style={styles.h1}>Your Cart</h1>

      {cart.length === 0 ? (
        <p style={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={styles.list}>
            {cart.map((item) => (
              <li key={item.id} style={styles.item}>
                <div style={styles.left}>
                  {item.img ? (
                    <img src={item.img} alt={item.service} style={styles.thumb} />
                  ) : (
                    <div style={styles.thumbPlaceholder} />
                  )}
                </div>

                <div style={styles.mid}>
                  <div style={styles.title}>{item.service}</div>
                  {item.serviceInfo && <div style={styles.info}>{item.serviceInfo}</div>}
                </div>

                <div style={styles.right}>
                  <div style={styles.qty}>Qty: {item.amount ?? 1}</div>
                  <div style={styles.price}>${(item.price * (item.amount ?? 1)).toFixed(2)}</div>
                  <button onClick={() => removeItem(item.id)} style={styles.removeBtn}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={styles.footer}>
            <div style={styles.total}>Total: ${total.toFixed(2)}</div>
            <div>
              <button onClick={clearCart} style={styles.clearBtn} disabled={cart.length === 0}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

// Inline minimal styles — replace with your CSS as desired
const styles: { [k: string]: React.CSSProperties } = {
  main: {
    padding: '1.5rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  h1: { fontSize: '1.75rem', marginBottom: '1rem' },
  empty: { color: '#666' },
  list: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' },
  item: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr 160px',
    gap: '1rem',
    alignItems: 'center',
    padding: '0.75rem',
    borderRadius: '8px',
    background: '#fafafa',
    border: '1px solid #eee',
  },
  left: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  thumb: { width: '64px', height: '64px', objectFit: 'cover', borderRadius: 6 },
  thumbPlaceholder: { width: 64, height: 64, background: '#eaeaea', borderRadius: 6 },
  mid: { display: 'flex', flexDirection: 'column' },
  title: { fontWeight: 600 },
  info: { color: '#666', fontSize: '0.9rem', marginTop: 2 },
  right: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 },
  qty: { fontSize: '0.9rem' },
  price: { fontWeight: 700 },
  removeBtn: {
    marginTop: 6,
    background: '#fff',
    border: '1px solid #ccc',
    padding: '0.25rem 0.5rem',
    borderRadius: 6,
    cursor: 'pointer',
  },
  footer: {
    marginTop: '1.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: { fontSize: '1.1rem', fontWeight: 700 },
  clearBtn: {
    background: '#b91c1c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: 6,
    cursor: 'pointer',
  },
};