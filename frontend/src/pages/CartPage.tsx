import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const updateItemSubtotal = (item: CartItem) => {
    return (item.price * item.quantity).toFixed(2);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item: CartItem) => (
            <li key={item.bookID}>
              {item.title}: ${item.price.toFixed(2)} x
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateQuantity(item.bookID, parseInt(e.target.value))
                }
              />
              = ${updateItemSubtotal(item)}
              <button onClick={() => removeFromCart(item.bookID)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
      <button>Checkout</button>
    </div>
  );
}

export default CartPage;
