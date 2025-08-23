"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import '../../styles/SubsPage.css';
import { useCart } from "@/contexts/CartContext";
import subscriptionData from '@/data/Data';
import AuthGuard from "@/components/AuthGuard";

const SubsPage = () => {
  const { addToCart } = useCart();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login"); // Redirect to login automatically
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return(
    <AuthGuard>
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
    </AuthGuard>
  );
};

export default SubsPage;