import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found</p>;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <img
        src={product.image || 'https://via.placeholder.com/500x400?text=No+Image'}
        alt={product.name}
        className="w-full rounded-lg object-cover max-h-[450px]"
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded w-fit">{product.category}</span>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl font-bold text-indigo-600">₹{product.price}</p>
        <p className="text-sm text-gray-500">
          {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
        </p>
        <p className="text-sm text-yellow-600">Rating: {'⭐'.repeat(Math.round(product.rating))} ({product.rating})</p>
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="mt-4 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed w-fit"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
