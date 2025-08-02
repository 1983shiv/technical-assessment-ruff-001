import React from 'react';
import { useCart } from "../context/cartcontext"

const CartSidebar: React.FC = () => {
  const { items, updateQuantity, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside aria-label="Shopping cart" tabIndex={0}>
      <h2>Cart</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span>{item.name}</span> - <span>${item.price}</span>
            <input
              type="number"
              min={1}
              value={item.quantity}
              aria-label={`Quantity for ${item.name}`}
              onChange={e => {
                // TODO: Call updateQuantity with correct value
                // TBD
              }}
            />
            <button
              aria-label={`Remove ${item.name}`}
              onClick={() => {
                // TODO: Call removeItem
                // TBD
              }}
            >Remove</button>
          </li>
        ))}
      </ul>
      <div>Total: ${total}</div>
    </aside>
  );
};

export default CartSidebar;