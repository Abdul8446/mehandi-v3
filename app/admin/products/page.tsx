'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, X, VideoIcon, ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { CldImage, CldUploadButton, CldUploadWidget } from 'next-cloudinary';
import { form } from 'framer-motion/client';

interface CloudinaryImage {
  url: string;
  publicId: string; 
}

function isCloudinaryImage(img: string | CloudinaryImage): img is CloudinaryImage {
  return typeof img !== 'string' && 'url' in img && 'publicId' in img;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  originalPrice?: number;
  images: string[] | CloudinaryImage[];
  category: string;
  description: string;   
  features: string[];
  specifications: {
    weight: string;
    "shelf life": string;
    origin: string;
    ingredients: string;
    certification: string;
    contents: string;
    material: string;
  };
  inStock: boolean;
  stock: number;
  isFeatured: boolean;
  sku: string;
  tags: string[];
  status: string;
}


const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'henna-powder', name: 'Henna Powder' },
  { id: 'henna-cones', name: 'Henna Cones' },
  { id: 'stencils', name: 'Stencils' },
  { id: 'kits', name: 'Kits' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'aftercare', name: 'Aftercare' },
  { id: 'hair-henna', name: 'Hair Henna' },
  { id: 'books', name: 'Books' }
];

const generateSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    discount: '',
    originalPrice: '',
    images: [] as string[],
    category: '',
    description: '',
    features: [''] as string[],
    specifications: {
      weight: '',
      "shelf life": '',
      origin: '',
      ingredients: '',
      certification: '',
      contents: '',
      material: ''
    },
    inStock: true,
    stock: '',
    isFeatured: false,
    sku: '',
    tags: [''] as string[],
    status: 'Active'
  });
  const [uploadedImages, setUploadedImages] = useState<CloudinaryImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isEditForm, setIsEditForm] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);


  // Fetch products from your API route
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleUploadSuccess = (result: any) => {
    if (result?.info?.secure_url && result?.info?.public_id) {
      const newImage = {
        url: result.info.secure_url,
        publicId: result.info.public_id
      };
      
      setUploadedImages(prev => [...prev, newImage]);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, result.info.secure_url]
      }));
    }
  };

  const removeImage = async (index: number) => {
    const imageToRemove = uploadedImages[index];
    
    if (!imageToRemove?.publicId) {
      console.error('No publicId available for this image');
      return;
    }

    try {
      // Delete from Cloudinary via backend
      const response = await fetch('/api/delete-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId: imageToRemove.publicId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete image from Cloudinary');
      }

      // Update local state
      setUploadedImages(prev => prev.filter((_, i) => i !== index));
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));

    } catch (error) {
      console.error('Error deleting image:', error);
      // Optionally show error to user
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ||
      product.category.toLowerCase() === categories.find(cat => cat.id === selectedCategory)?.name.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
  const calculatePrice = () => {
    const original = parseFloat(formData.originalPrice) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const discountedPrice = original - (original * (discount / 100));

    // Round to nearest whole number
    const roundedPrice = Math.round(discountedPrice);

    setFormData(prev => ({
      ...prev,
      price: discountedPrice > 0 ? String(roundedPrice) : "0"
    }));
  };

  calculatePrice();
}, [formData.originalPrice, formData.discount]);

  useEffect(()=>{

  },[formData])

  const handleSaveProduct = async () => {
    try {
      const productData = {
        ...formData,
      };

      // Determine if we're adding or updating
      // const isEdit = products.some(p => p._id === selectedProduct);
      const url = isEditForm 
        ? `/api/products?id=${selectedProduct}`
        : '/api/products';
      const method = isEditForm ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditForm ? 'update' : 'add'} product`);
      }

      const resultProduct = await response.json();

      // Update state accordingly
      if (isEditForm) {
        setProducts(prev => 
          prev.map(p => p._id === selectedProduct ? resultProduct : p)
        );
      } else {
        setProducts(prev => [...prev, resultProduct]);
      }

      setShowAddModal(false);
      resetForm();
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err instanceof Error ? err.message : `Failed to save product`);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      price: '',
      discount: '',
      originalPrice: '',
      images: [],
      category: '',
      description: '',
      features: [''],
      specifications: {
        weight: '',
        "shelf life": '',
        origin: '',
        ingredients: '',
        certification: '',
        contents: '',
        material: ''
      },
      inStock: true,
      stock: '',
      isFeatured: false,
      sku: '',
      tags: [''],
      status: 'Active'
    });
    setUploadedImages([]);
  };

  const handleEditProduct = (productId: string) => {
    const product = products.find(p => p._id === productId);
    setIsEditForm(true);
    if (product) {
      setSelectedProduct(productId)
      setFormData({
        name: product.name,
        slug: product.slug,
        price: product.price.toString(),
        discount: product.discount?.toString() || '',
        originalPrice: product.originalPrice?.toString() || product.price.toString(),
        // images: product.images,
        images: Array.isArray(product.images) 
        ? product.images.map(img => typeof img === 'string' ? img : img.url)
        : [],
        category: product.category,
        description: product.description,
        features: product.features.length > 0 ? product.features : [''],
        specifications: product.specifications,
        inStock: product.inStock,
        stock: product.stock.toString(),
        isFeatured: product.isFeatured,
        sku: product.sku,
        tags: product.tags.length > 0 ? product.tags : [''],
        status: product.status 
      });

      // Handle both string[] and CloudinaryImage[] cases
      const imagesToSet = Array.isArray(product.images)
        ? product.images.map(img => ({
            url: typeof img === 'string' ? img : img.url,
            publicId: typeof img === 'string' ? extractPublicId(img) : img.publicId
          }))
        : [];
      
      setUploadedImages(imagesToSet);
      // setUploadedImages(product.images);
      setShowAddModal(true);
    }
  };

  // Helper function to extract publicId from URL if needed
  function extractPublicId(url: string): string {
    // This is a basic implementation - adjust based on your URL structure
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0];
  }

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`/api/products?id=${selectedProduct}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(prev => prev.filter(p => p._id !== selectedProduct));
      setShowDeleteModal(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const getStatus = (product: Product) => {
    if (!product.inStock) return 'Out of Stock';
    if (product.stock <= 0) return 'Out of Stock';
    return product.status || 'Active';
  };

  useEffect(() => {
    if (showAddModal) {
      const slug = generateSlug(formData.name);
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.name, showAddModal]);

  const handleCloseModal = () => {
    setShowAddModal(false);
    setSelectedProduct(null); // Reset when closing
    resetForm();
  };
  
  const renderProductDetails = (product: Product, isModal: boolean = false) => {
    // Helper function to get URL and publicId regardless of image format
    const getImageInfo = (img: string | CloudinaryImage) => {
      if (isCloudinaryImage(img)) {
        return {
          url: img.url,
          publicId: img.publicId
        };
      }
      return {
        url: img,
        publicId: img.split('/').pop()?.split('.')[0] || ''
      };
    };

    return (
      <div className={`grid grid-cols-1 ${isModal ? '' : 'md:grid-cols-3'} gap-4`}>
        {/* Left Column - Images */}
        <div className="col-span-1">
          <div className="mb-4">
            {product.images[0] && (() => {
              const { url, publicId } = getImageInfo(product.images[0]);
              return url.match(/\.(mp4|mov)$/i) ? (
                <video 
                  src={url} 
                  className="w-full h-64 object-contain rounded-md"
                  controls
                  autoPlay
                />
              ) : (
                <CldImage
                  width="600"
                  height="600"
                  src={publicId}
                  alt={product.name}
                  className="w-full h-64 object-contain rounded-md"
                />
              );
            })()}
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {product.images.slice(1).map((image, index) => {
                const { url, publicId } = getImageInfo(image);
                return (
                  <div key={index} className="border rounded-md overflow-hidden">
                    {url.match(/\.(mp4|mov)$/i) ? (
                      <video 
                        src={url} 
                        className="w-full h-20 object-cover"
                      />
                    ) : (
                      <CldImage
                        width="200"
                        height="200"
                        src={publicId}
                        alt={`Product image ${index + 2}`}
                        className="w-full h-20 object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Rest of your component remains the same */}
        {/* Middle Column - Description and Features */}
        <div className="col-span-1">
          <h4 className="font-medium text-gray-900 mb-2">Description</h4>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          {product.features.length > 0 && (
            <>
              <h4 className="font-medium text-gray-900 mb-2">Features</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        
        {/* Right Column - Specifications */}
        <div className="col-span-1">
          <h4 className="font-medium text-gray-900 mb-2">Specifications</h4>
          <div className="space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              value && (
                <div key={key}>
                  <span className="text-sm font-medium text-gray-500">{key}:</span>
                  <span className="ml-2 text-sm text-gray-700">{value}</span>
                </div>
              )
            ))}
          </div>
          
          {product.tags.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleViewProduct = (product: Product) => {
    if (isMobile) {
      setCurrentProduct(product);
      setShowProductModal(true);
    } else {
      setExpandedProduct(expandedProduct === product._id ? null : product._id);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;



  return (
    <div className="p-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Henna Products</h1>
        <button 
          className="btn-primary flex items-center"
          onClick={() => {
            setFormData({
              name: '',
              slug: '',
              price: '',
              discount: '',
              originalPrice: '',
              images: [],
              category: '',
              description: '',
              features: [''],
              specifications: {
                weight: '',
                "shelf life": '',
                origin: '',
                ingredients: '',
                certification: '',
                contents: '',
                material: ''
              },
              inStock: true,
              stock: '',
              isFeatured: false,
              sku: '',
              tags: [''],
              status: 'Active'
            });
            setShowAddModal(true);
          }}
        >
          <Plus size={18} className="mr-2" />
          Add New Product
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products by name or SKU..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-64">
            <select 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <button className="btn-outline flex items-center">
            <Filter size={18} className="mr-2" />
            More Filters
          </button>
        </div>
      </div>
      
      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map(product => {
                // Helper to get the first image URL regardless of format
                const getFirstImageUrl = () => {
                  if (!product.images || product.images.length === 0) return '';
                  const firstImage = product.images[0];
                  return typeof firstImage === 'string' ? firstImage : firstImage.url;
                };

                const firstImageUrl = getFirstImageUrl();
  
                return (
                  <React.Fragment key={product._id}>
                    {/* Main Product Row */}
                    <tr className={`hover:bg-gray-50 ${expandedProduct === product._id ? 'bg-gray-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {/* <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="h-10 w-10 rounded-md object-cover"
                            /> */}
                            {firstImageUrl ? (
                            firstImageUrl.match(/\.(mp4|mov)$/i) ? (
                              <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                                <VideoIcon className="h-5 w-5 text-gray-500" />
                              </div>
                            ) : (
                              <img 
                                src={firstImageUrl} 
                                alt={product.name} 
                                className="h-10 w-10 rounded-md object-cover"
                                onError={(e) => {
                                  // Fallback if image fails to load
                                  (e.target as HTMLImageElement).src = '/placeholder-product.png';
                                }}
                              />
                            )
                          ) : (
                            <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                              <ImageIcon className="h-5 w-5 text-gray-500" />
                            </div>
                          )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product._id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex flex-col">
                          <span>₹{product.price}</span>
                          {product?.discount && product.discount > 0 && (
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 line-through mr-1">₹{product.originalPrice}</span>
                              <span className="text-xs text-green-600">{product.discount}% off</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          getStatus(product) === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {getStatus(product)}
                        </span>
                        {product.isFeatured && (
                          <span className="ml-2 px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewProduct(product);
                            }} 
                            className="p-1 text-blue-600 hover:text-blue-900"
                            title="View Product"
                          >
                            <Eye size={18}/>
                          </button>
                          <button 
                            className="p-1 text-yellow-600 hover:text-yellow-900"
                            title="Edit Product"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditProduct(product._id)
                            }}
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            className="p-1 text-red-600 hover:text-red-900"
                            title="Delete Product"
                            onClick={() => {
                              setSelectedProduct(product._id);
                              setShowDeleteModal(true);
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
  
                    {/* Expanded Details Row (only for desktop) */}
                    {!isMobile && expandedProduct === product._id && (
                    <tr className="bg-gray-50">
                      <td colSpan={7} className="px-6 py-4">
                        {renderProductDetails(product)}
                      </td>
                    </tr>
                  )}
                  </React.Fragment>
                )
              }
              )}
            </tbody>
          </table>
        </div>

        {/* Product Details Modal for Mobile */}
        {showProductModal && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{currentProduct.name}</h2>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowProductModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              {renderProductDetails(currentProduct, true)}
            </div>
          </div>
        </div>
      )}
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="btn-outline py-1 px-3 text-sm">Previous</button>
            <button className="btn-outline py-1 px-3 text-sm">Next</button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of{' '}
                <span className="font-medium">{products.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-red-50 text-sm font-medium text-red-900">1</button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">
                {isEditForm ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleCloseModal()}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={(e) => { e.preventDefault(); handleSaveProduct(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKU
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.sku}
                      onChange={(e) => setFormData({...formData, sku: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full bg-gray-100 cursor-not-allowed"
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price (₹)
                    </label>
                    <input 
                      type="number" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount (%)
                    </label>
                    <input 
                      type="number" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.discount}
                      onChange={(e) => setFormData({...formData, discount: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹)
                    </label>
                    <input 
                      type="number" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.filter(cat => cat.id !== 'all').map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input 
                      type="number" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      required
                    />
                  </div>
                  
                  {/* <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="inStock"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                    />
                    <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
                      In Stock
                    </label>
                  </div> */}
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="isFeatured"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    />
                    <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                      Featured Product
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images
                    </label>
                    
                    {/* Cloudinary Upload Widget */}
                    <CldUploadWidget
                      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                      options={{
                        sources: ['local'],
                        multiple: false,
                        resourceType: 'auto',
                        maxFileSize: 100000000, // 15MB
                        clientAllowedFormats: ['jpg', 'png', 'webp', 'mp4', 'mov'],
                        publicId:formData.slug
                      }}
                      onSuccess={handleUploadSuccess}
                    >   
                      {({ open }) => (
                        <Button
                          variant="secondary"
                          type="button"
                          onClick={() => open()}
                          className="mb-4 btn-outline flex items-center"
                          disabled={isUploading}
                        >
                          {isUploading ? 'Uploading...' : 'Upload Image/Video'}
                        </Button>
                      )}
                    </CldUploadWidget>

                    {/* Preview uploaded images */}
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            {image.match(/\.(mp4|mov)$/i) ? (
                              <video 
                                src={image} 
                                className="w-full h-32 object-cover rounded-md"
                                controls
                              />
                            ) : (
                              <CldImage
                                width="200"
                                height="200"
                                src={image.split('/').pop()?.split('.')[0] || ''}
                                alt={`Product image ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md"
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>   
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Image URL
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.images[0] || ''}
                      onChange={(e) => {
                        const newImages = [...formData.images];
                        newImages[0] = e.target.value;
                        setFormData({...formData, images: newImages});
                      }}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Image URLs (comma separated)
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.images.slice(1).join(', ')}
                      onChange={(e) => {
                        const mainImage = formData.images[0] || '';
                        const additionalImages = e.target.value.split(',').map(url => url.trim());
                        setFormData({...formData, images: [mainImage, ...additionalImages]});
                      }}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea 
                      className="input-field min-h-[100px] pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features (one per line)
                    </label>
                    <textarea 
                      className="input-field min-h-[100px] pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.features.join('\n')}
                      onChange={(e) => setFormData({...formData, features: e.target.value.split('\n')})}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight
                    </label>
                    <input 
                      type="number" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.specifications.weight}
                      required
                      onChange={(e) => setFormData({
                        ...formData, 
                        specifications: {
                          ...formData.specifications,
                          weight: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shelf Life
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.specifications["shelf life"]}
                      onChange={(e) => setFormData({
                        ...formData, 
                        specifications: {
                          ...formData.specifications,
                          "shelf life": e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Origin
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.specifications.origin}
                      onChange={(e) => setFormData({
                        ...formData, 
                        specifications: {
                          ...formData.specifications,
                          origin: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ingredients
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.specifications.ingredients}
                      onChange={(e) => setFormData({
                        ...formData, 
                        specifications: {
                          ...formData.specifications,
                          ingredients: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certification
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.specifications.certification}
                      onChange={(e) => setFormData({
                        ...formData, 
                        specifications: {
                          ...formData.specifications,
                          certification: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contents
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.specifications.contents}
                      onChange={(e) => setFormData({
                        ...formData, 
                        specifications: {
                          ...formData.specifications,
                          contents: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Material
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.specifications.material}
                      onChange={(e) => setFormData({
                        ...formData, 
                        specifications: {
                          ...formData.specifications,
                          material: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma separated)
                    </label>
                    <input 
                      type="text" 
                      className="input-field pl-2 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={formData.tags.join(', ')}
                      onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(tag => tag.trim())})}
                    />
                  </div>
                </div>    
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <Button 
                    type="submit" 
                    // className="btn-primary"
                    variant='adminRed'
                  >
                    {isEditForm? 'Update Product' : 'Add Product'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

