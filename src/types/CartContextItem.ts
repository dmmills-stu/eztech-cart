import { CartItem } from "@/types/CartItem";
import { SubscriptionItem } from "./SubscriptionItem";

export type CartContextItem = {
    cart: CartItem[];
    addToCart: (item: SubscriptionItem) => void;
    removeFromCart: (id: number) => void;
}