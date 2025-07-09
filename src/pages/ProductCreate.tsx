
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import QuickCreateForm from '@/components/product/QuickCreateForm';
import { Product, Category, UOM } from '@/types/product';

const ProductCreate = () => {
  const navigate = useNavigate();

  const [categories] = useState<Category[]>([
    { 
      id: '1', 
      name: 'Electronics', 
      description: 'Electronic devices and accessories',
      productCount: 2,
      children: [],
      parentId: undefined,
      level: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    { 
      id: '2', 
      name: 'Computers', 
      description: 'Laptops, desktops, and computer accessories',
      productCount: 1,
      children: [],
      parentId: undefined,
      level: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    { 
      id: '3', 
      name: 'Accessories', 
      description: 'Phone cases, chargers, and other accessories',
      productCount: 0,
      children: [],
      parentId: undefined,
      level: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const systemUOMs: UOM[] = [
    { 
      id: 'piece', 
      name: 'Piece', 
      ratio: 1, 
      isDefault: true, 
      symbol: 'pc', 
      type: 'piece', 
      isActive: true, 
      conversionFactor: 1 
    },
    { 
      id: 'kg', 
      name: 'Kilogram', 
      ratio: 1, 
      isDefault: false, 
      symbol: 'kg', 
      type: 'weight', 
      isActive: true, 
      conversionFactor: 1 
    },
    { 
      id: 'liter', 
      name: 'Liter', 
      ratio: 1, 
      isDefault: false, 
      symbol: 'L', 
      type: 'volume', 
      isActive: true, 
      conversionFactor: 1 
    },
    { 
      id: 'meter', 
      name: 'Meter', 
      ratio: 1, 
      isDefault: false, 
      symbol: 'm', 
      type: 'length', 
      isActive: true, 
      conversionFactor: 1 
    },
    { 
      id: 'pack', 
      name: 'Pack', 
      ratio: 6, 
      isDefault: false, 
      symbol: 'pack', 
      type: 'piece', 
      isActive: true, 
      conversionFactor: 6 
    }
  ];

  const handleProductSave = (product: Product) => {
    console.log('Product created:', product);
    // Here you would typically save to your backend
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/products')}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
              <p className="text-gray-600">Add a new product to your inventory</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-6 py-8">
        <QuickCreateForm
          categories={categories}
          systemUOMs={systemUOMs}
          onClose={() => navigate('/products')}
          onSave={handleProductSave}
        />
      </div>
    </div>
  );
};

export default ProductCreate;
