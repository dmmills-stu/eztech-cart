import { CartItem } from "@/types/CartItem";
import { SubscriptionItem } from "./SubscriptionItem";

export type CartContextItem = {
    cart: CartItem[];
    addToCart: (item: SubscriptionItem | CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    decrementFromCart: (id: number) => void;
}