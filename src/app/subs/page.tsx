"use client";

import '../../styles/SubsPage.css';
import { useCart } from "@/contexts/CartContext";
import subscriptionData from '@/data/Data';

const SubsPage = () => {
  const { addToCart } = useCart();

  return(
    <main className="sub-main">
      <h1 className="sub-header">Subscriptions and Merch</h1> 
      <ul className="sub-list">
        {subscriptionData.map((item) => (
          <li key={item.id}>
            <div className="sub-card">
              <img src={item.img} alt={item.service} className="sub-item-img" />
              <div className="sub-mid">
                <div className="sub-item-service">{item.service}</div>
                {item.serviceInfo && <div className="sub-item-info">{item.serviceInfo}</div>}
              </div>
              <div className="sub-item-price-div">
                <div className="sub-item-price-text">Price</div>
                <div className="sub-item-price">${item.price.toFixed(2)} {item.service.includes("Subscription") ? (<>/mo</>) : (null)}</div>
              </div>
              <button className="cart-button" onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default SubsPage;