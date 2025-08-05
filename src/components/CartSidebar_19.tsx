// CartSidebar.tsx
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext_19';
import { mockItems } from '../context/CartContext_19';


const CartSidebar = () => {
  const { items, updateQuantity, removeItem } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});

  
  if (items.length === 0) {
    return <div role="alert">Your cart is empty.</div>;
  }

  const cartValidation = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const value = e.target.value;
    // console.log(value, id)
    
    updateQuantity(id, Number(value))
  }

  return (
    <aside aria-label="Shopping cart">
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <input
              type="number"
              min={1}
              max={item.stock}
              value={item.quantity}
              aria-label={`Quantity for ${item.name}`}
              onChange={e => cartValidation(e, item.id)
                // TODO: Validate and update quantity, set error if invalid
              }
            />
            <button onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>
            {errors[item.id] && <div role="alert" style={{ color: 'red' }}>{errors[item.id]}</div>}
          </li>
        ))}
      </ul>
      <div>Total: $ {/* TODO: Calculate total */}</div>
    </aside>
  );
};

export default CartSidebar;
