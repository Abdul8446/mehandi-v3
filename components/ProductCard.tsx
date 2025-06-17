'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { IProduct } from '@/models/Product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import Link from 'next/link';

interface ProductCardProps {
  product: IProduct;   
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log(product, 'product');
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        specifications: {
          weight: product.specifications?.weight,
        },
        ...(product.specifications && { 
          weight: product.specifications
        }),
        // specifications.weight: product.specifications.weight,
        quantity: 1,
      });
    }
  };

  const handleWishlist = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
    }
  };

  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg bg-white">
      {/* Labels */}
      <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
        {product.isFeatured && (
          <span className="bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </span>
        )}
        {product.originalPrice && (
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <Link 
          href={`/product/${encodeURIComponent(product.slug)}`}
          as={`/product/${product.slug}`}
        >
          {imageError?(
            <div className="h-60 w-full rounded-t-md animate-pulse bg-gray-400" />
          ):(
            <Image
              src={product.images[0]}
              alt={product.name}
              // alt={<div className='h-60 w-full bg-gray'></div>}
              width={500}
              height={500}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              onError={() => {
                setImageError(true);
                // setLoading(false);
              }}
            />
          )}
        </Link>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-amber-50 transition-colors"
        >
          <Heart
            size={16}
            className={
              isInWishlist(product._id)
                ? 'text-amber-600 fill-amber-600'
                : 'text-gray-700'
            }
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center mb-1">
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  fill={
                    product.rating && star <= Math.floor(product.rating)
                      ? '#f59e0b'
                      : '#d1d5db'
                  }
                  className={
                    product.rating && star <= product.rating
                      ? ''
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Title and Category */}
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500">{product.category}</p>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto px-4 pb-4">
          <div>
            {product.originalPrice ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-amber-700">
                  ₹{product.price}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ₹{product.originalPrice}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-amber-700">
                ₹{product.price}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center justify-center px-3 py-2 rounded-md text-sm ${
              product.inStock
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={16} className="mr-1" />
            {product.inStock ? 'Add' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
