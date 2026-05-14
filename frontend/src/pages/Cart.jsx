import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQty, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center mt-16">
        <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
        <Link to="/" className="text-indigo-600 hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-indigo-600 font-bold">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQty(item._id, item.qty - 1)} className="px-2 py-1 bg-gray-200 rounded">−</button>
              <span className="w-8 text-center">{item.qty}</span>
              <button onClick={() => updateQty(item._id, item.qty + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
            </div>
            <p className="w-24 text-right font-bold">₹{item.price * item.qty}</p>
            <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 text-lg">✕</button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between bg-white p-4 rounded-lg shadow">
        <span className="text-xl font-bold">Total: ₹{totalPrice}</span>
        <Link to="/checkout" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
