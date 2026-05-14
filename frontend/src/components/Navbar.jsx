import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">ShopKart</Link>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link to="/orders" className="text-gray-700 hover:text-indigo-600 text-sm">My Orders</Link>
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
              <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-indigo-600">Login</Link>
              <Link to="/register" className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
