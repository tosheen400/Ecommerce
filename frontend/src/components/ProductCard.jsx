import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product._id}`} className="font-semibold text-gray-800 hover:text-indigo-600 line-clamp-1">
          {product.name}
        </Link>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">₹{product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
