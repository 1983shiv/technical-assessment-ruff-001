// CartSidebar.tsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext_19';



const CartSidebar = () => {
  const { items, updateQuantity, removeItem } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});

  
  if (items.length === 0) {
    return <div role="alert">Your cart is empty.</div>;
  }

  const cartValidation = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const value = e.target.value;
    const itemToUpdate = items.find((item) => item.id === id)
    if(Number(value) > Number(itemToUpdate?.stock)){
        // setErrors({ [id]: `Item has only ${itemToUpdate?.stock} qty available.` })
        setErrors({ [id]: `Only ${itemToUpdate?.stock} in stock` })
    }
    updateQuantity(id, Number(value))
  }

  const cartTotal:number = items.reduce((acc, item) => {
    return acc + (Number(item.price) * Number(item.quantity));
    }, 0);

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
      <div>Total: $ {cartTotal}</div>
    </aside>
  );
};

export default CartSidebar;
