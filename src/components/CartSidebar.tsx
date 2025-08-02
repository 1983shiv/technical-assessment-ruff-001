import React from 'react';
import { useCart } from "../context/cartcontext"

const CartSidebar: React.FC = () => {
  const { items, updateQuantity, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside aria-label="Shopping cart" tabIndex={0} className='flex flex-col border-2 p-4'>
      <h2 className='text-2xl font-bold'>Cart</h2>
      <ul>
        {items.map(item => (
          <li key={item.id} className='flex flex-row gap-2 m-4 border-gray-50 p-4 border-b-2'>
            <div className='flex flex-row'>
            <span data-testid="item-name">{item.name}</span> - <span data-testid="item-price">${item.price}</span>
            </div>
            <input
              type="number"
              min={1}
              value={item.quantity}
              aria-label={`Quantity for ${item.name}`}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))
              }
              className='flex self-center items-center border-2 border-gray-50'
              data-testid="item-quanity"
            />
            <button
              aria-label={`Remove ${item.name}`}
              onClick={() => removeItem(item.id)
              }
              data-testid="item-remove"
            >Remove</button>
          </li>
        ))}
      </ul>
      <div data-testid="cart-total">Total: ${total}</div>
    </aside>
  );
};

export default CartSidebar;