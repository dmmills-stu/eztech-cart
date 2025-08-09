"use client";

import '../../styles/SubsPage.css';
import { useCart } from "@/contexts/CartContext";
import subscriptionData from '@/data/Data';

const SubsPage = () => {
  const { addToCart } = useCart();

  return(
    <ul className="sub-list">
      <li>
        <div className="sub-card list-title">
          <span className="title-item">Picture</span>
          <span className="title-item">Service / Item</span>
          <span className="title-item">Description</span>
          <span className="title-item">Price</span>
          <span className="title-item">Add Item</span>
        </div>
      </li>
      {subscriptionData.map((item) => (
        <li key={item.id}>
          <div className="sub-card">
            <img src={item.img} alt={item.service} className="sub-item-img" />
            <p className="sub-item-service">{item.service}</p>
            <p className="sub-item-info">{item.serviceInfo}</p>
            <p className="sub-item-price">${item.price.toFixed(2)}</p>
            <button className="cart-button" onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SubsPage;