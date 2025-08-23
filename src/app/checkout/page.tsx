"use client";

import { useState, useEffect } from "react";
import { useCart } from '@/contexts/CartContext';
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import toast from 'react-hot-toast';
import "../../styles/CheckoutPage.css";

export default function CheckoutPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [hasSavedCard, setHasSavedCard] = useState(false);
  const router = useRouter();
  const { clearCart } = useCart();

  // Load saved card from localStorage if available
  useEffect(() => {
    const storedCard = localStorage.getItem("creditCard");
    if (storedCard) {
      const { number, expiry } = JSON.parse(storedCard);
      setCardNumber(number);
      setExpiry(expiry);
      setHasSavedCard(true);
    }
  }, []);

  // Format card number: 1234 5678 9012 3456
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  // Auto-format expiry date as MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 2) {
      setExpiry(value);
    } else {
      setExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
    }
  };

  // Real-time form validation
  useEffect(() => {
    const cleanNumber = cardNumber.replace(/\s/g, ""); // Remove spaces for validation
    const isCardValid = /^\d{16}$/.test(cleanNumber); // Must be 16 digits
    const isExpiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry); // MM/YY
    const isCvcValid = /^\d{3,4}$/.test(cvc); // 3 or 4 digits
    setIsValid(isCardValid && isExpiryValid && isCvcValid);
  }, [cardNumber, expiry, cvc]);

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Purchase successful!", {
      duration: 3000,
      style: { background: "#444", color: "#fff" },
    });
    clearCart(); // Optionally clear the cart after saving payment info, indicating purchase completion
    router.push("/subs"); // You can change th  width: 30%;is to wherever you want to go next
  };

  const handleSave = (e: React.FormEvent) => { 
    e.preventDefault();

    const cardData = {
      number: cardNumber,
      expiry,
    };

    localStorage.setItem("creditCard", JSON.stringify(cardData));
    toast.success("Credit card information saved successfully!", {
      duration: 3000,
      style: { background: "#444", color: "#fff" },
    });
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.removeItem("creditCard");
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setHasSavedCard(false);
    toast.success("Credit card information deleted.", {
      duration: 3000,
      style: { background: "#444", color: "#fff" },
    });
  };

  return (
    <AuthGuard>
      <main className="credit-card-page">
        <h1 className="credit-card-header">Enter Payment Details</h1>
        <form className="credit-card-form">
          {/* Card Number */}
          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />

          {/* Expiry Date */}
          <label htmlFor="expiry">Expiry Date (MM/YY)</label>
          <input
            id="expiry"
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            value={expiry}
            onChange={handleExpiryChange}
            required
          />

          {/* CVC */}
          <label htmlFor="cvc">CVC</label>
          <input
            id="cvc"
            type="text"
            placeholder="123"
            maxLength={4}
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
            required
          />

          {/* Save Button */}
          <button onClick={handleSave} className="save-button" disabled={!isValid}>
            Save Card Info
          </button>

          {/* Delete Button */}
          <button onClick={handleDelete}
            className="delete-button"
            disabled={!hasSavedCard}>
            Delete Card Info
          </button>

          {/* Purchase Button */}
          <button onClick={handlePurchase} className="checkout-button" disabled={!isValid}>
            Complete Purchase
          </button>

          {/* Validation message */}
          {!isValid && (
            <p className="validation-warning">
              Please enter a valid 16-digit card number, a valid expiry date, and a 3–4 digit CVC.
            </p>
          )}
        </form>
      </main>
    </AuthGuard>
  );
}