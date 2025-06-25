
import React, { useState, useEffect } from 'react';
import TransferOrderList from './TransferOrderList';
import { Product, Category, ProductUOM } from '@/types/product';

// Re-export types for backward compatibility
export type { Product, Category, ProductUOM };

interface ProductListProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onProductDelete: (productId: string) => void;
}

interface ProductDetailProps {
  product: Product;
  categories: Category[];
  onUpdate: (updatedProduct: Product) => void;
  onDelete: (productId: string) => void;
  onBack: () => void;
}

interface QuickCreateFormProps {
  categories: Category[];
  onCancel: () => void;
  onSave: (product: Product) => void;
}

const ProductList = ({ products, onProductSelect, onProductDelete }: ProductListProps) => {
  return (
    <div>
      {/* Mock ProductList implementation */}
      <h3>Product List</h3>
      {products.map(product => (
        <div key={product.id} onClick={() => onProductSelect(product)}>
          {product.name}
        </div>
      ))}
    </div>
  );
};

const ProductDetail = ({ product, categories, onUpdate, onDelete, onBack }: ProductDetailProps) => {
  return (
    <div>
      {/* Mock ProductDetail implementation */}
      <h3>Product Detail: {product.name}</h3>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

const QuickCreateForm = ({ categories, onCancel, onSave }: QuickCreateFormProps) => {
  return (
    <div>
      {/* Mock QuickCreateForm implementation */}
      <h3>Quick Create Form</h3>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock data
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Test Product',
        sku: 'TEST-001',
        description: 'Test Description',
        category: 'Electronics',
        uoms: [
          { id: '1', name: 'piece', ratio: 1, isDefault: true }
        ],
        price: 100,
        cost: 50,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const mockCategories: Category[] = [
      { id: '1', name: 'Electronics', description: 'Electronic products' }
    ];

    setProducts(mockProducts);
    setCategories(mockCategories);
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setSelectedProduct(updatedProduct);
  };

  const handleProductDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    setCurrentView('list');
  };

  const handleProductCreate = (product: Product) => {
    setProducts([...products, product]);
    setCurrentView('list');
  };

  if (currentView === 'detail' && selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        categories={categories}
        onUpdate={handleProductUpdate}
        onDelete={handleProductDelete}
        onBack={() => setCurrentView('list')}
      />
    );
  }

  if (currentView === 'create') {
    return (
      <QuickCreateForm
        categories={categories}
        onCancel={() => setCurrentView('list')}
        onSave={handleProductCreate}
      />
    );
  }

  // For now, redirect to Transfer Orders since that's the main feature
  return <TransferOrderList />;
};

export default ProductManagement;
