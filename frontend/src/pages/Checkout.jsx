import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ address: '', city: '', postalCode: '', country: 'India' });

  if (!user) {
    return (
      <div className="text-center mt-16">
        <p className="text-gray-500 mb-4">Please login to checkout</p>
        <button onClick={() => navigate('/login')} className="text-indigo-600 hover:underline">Login</button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center mt-16">
        <p className="text-gray-500">Cart is empty</p>
      </div>
    );
  }

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderItems = items.map((i) => ({
        product: i._id,
        name: i.name,
        price: i.price,
        quantity: i.qty,
        image: i.image,
      }));
      await API.post('/orders', {
        items: orderItems,
        shippingAddress: form,
        totalAmount: totalPrice,
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleOrder} className="bg-white p-6 rounded-lg shadow space-y-4">
        <input
          placeholder="Address" required value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          placeholder="City" required value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          placeholder="Postal Code" required value={form.postalCode}
          onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          placeholder="Country" required value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="border-t pt-4">
          <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
          <p className="text-sm text-gray-500">{items.length} item(s)</p>
        </div>
        <button
          type="submit" disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
