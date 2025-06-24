
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Edit, Save, X, Plus } from 'lucide-react';
import { Product } from '@/pages/ProductManagement';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving product:', editedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct(product);
    setIsEditing(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', className: 'bg-green-600 text-white' },
      inactive: { label: 'Inactive', className: 'bg-gray-500 text-white' },
      archived: { label: 'Archived', className: 'bg-gray-400 text-white' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`text-xs font-medium ${config.className}`}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onBack}
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-blue-800">{product.name}</h2>
            <p className="text-blue-600">SKU: {product.sku}</p>
          </div>
          {getStatusBadge(product.status)}
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancel}
                className="border-gray-300"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button 
              size="sm"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Product
            </Button>
          )}
        </div>
      </div>

      {/* Product Details Tabs */}
      <Card className="border-blue-200 shadow-sm">
        <CardContent className="p-0">
          <Tabs defaultValue="basic" className="w-full">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-blue-200 px-6 pt-6">
              <TabsList className="bg-white border border-blue-200">
                <TabsTrigger value="basic" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="inventory" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Inventory
                </TabsTrigger>
                <TabsTrigger value="pricing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Pricing
                </TabsTrigger>
                <TabsTrigger value="variants" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Variants
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="basic" className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                  <Label className="text-base font-semibold text-blue-800 mb-4 block">Product Images</Label>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-blue-600 mb-2">Drag and drop images here</p>
                    <p className="text-sm text-gray-500">or click to browse files</p>
                    <Button variant="outline" className="mt-4 border-blue-300 text-blue-700">
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-blue-800 font-medium">Product Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedProduct.name}
                        onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
                        className="mt-2 border-blue-200 focus:border-blue-400"
                      />
                    ) : (
                      <p className="mt-2 p-3 bg-gray-50 rounded-md">{product.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="sku" className="text-blue-800 font-medium">SKU</Label>
                    {isEditing ? (
                      <Input
                        id="sku"
                        value={editedProduct.sku}
                        onChange={(e) => setEditedProduct({...editedProduct, sku: e.target.value})}
                        className="mt-2 border-blue-200 focus:border-blue-400"
                      />
                    ) : (
                      <p className="mt-2 p-3 bg-gray-50 rounded-md font-mono">{product.sku}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-blue-800 font-medium">Category</Label>
                    <p className="mt-2 p-3 bg-gray-50 rounded-md">{product.category}</p>
                  </div>

                  <div>
                    <Label htmlFor="supplier" className="text-blue-800 font-medium">Supplier</Label>
                    {isEditing ? (
                      <Input
                        id="supplier"
                        value={editedProduct.supplier}
                        onChange={(e) => setEditedProduct({...editedProduct, supplier: e.target.value})}
                        className="mt-2 border-blue-200 focus:border-blue-400"
                      />
                    ) : (
                      <p className="mt-2 p-3 bg-gray-50 rounded-md">{product.supplier}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-blue-800 font-medium">Description</Label>
                    {isEditing ? (
                      <Textarea
                        id="description"
                        value={editedProduct.description}
                        onChange={(e) => setEditedProduct({...editedProduct, description: e.target.value})}
                        className="mt-2 border-blue-200 focus:border-blue-400"
                        rows={4}
                      />
                    ) : (
                      <p className="mt-2 p-3 bg-gray-50 rounded-md">{product.description}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <Switch 
                      id="status" 
                      checked={editedProduct.status === 'active'}
                      onCheckedChange={(checked) => 
                        setEditedProduct({
                          ...editedProduct, 
                          status: checked ? 'active' : 'inactive'
                        })
                      }
                      disabled={!isEditing}
                    />
                    <Label htmlFor="status" className="text-blue-800 font-medium">
                      Product Active
                    </Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800">Current Stock</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{product.stock}</div>
                    <p className="text-sm text-gray-600">Units available</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800">Safety Stock</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-600 mb-2">{product.safetyStock}</div>
                    <p className="text-sm text-gray-600">Minimum threshold</p>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800">Stock Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {product.stock <= product.safetyStock ? (
                      <Badge className="bg-amber-500 text-white">Low Stock</Badge>
                    ) : (
                      <Badge className="bg-green-500 text-white">In Stock</Badge>
                    )}
                  </CardContent>
                </Card>
              </div>

              {isEditing && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="stock" className="text-blue-800 font-medium">Current Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={editedProduct.stock}
                      onChange={(e) => setEditedProduct({...editedProduct, stock: parseInt(e.target.value)})}
                      className="mt-2 border-blue-200 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="safetyStock" className="text-blue-800 font-medium">Safety Stock</Label>
                    <Input
                      id="safetyStock"
                      type="number"
                      value={editedProduct.safetyStock}
                      onChange={(e) => setEditedProduct({...editedProduct, safetyStock: parseInt(e.target.value)})}
                      className="mt-2 border-blue-200 focus:border-blue-400"
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pricing" className="p-6">
              <div className="space-y-6">
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800">Pricing Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="price" className="text-blue-800 font-medium">Base Price</Label>
                        {isEditing ? (
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={editedProduct.price}
                            onChange={(e) => setEditedProduct({...editedProduct, price: parseFloat(e.target.value)})}
                            className="mt-2 border-blue-200 focus:border-blue-400"
                          />
                        ) : (
                          <p className="mt-2 text-2xl font-bold text-green-600">{formatCurrency(product.price)}</p>
                        )}
                      </div>
                      <div>
                        <Label className="text-blue-800 font-medium">Currency</Label>
                        <p className="mt-2 p-3 bg-gray-50 rounded-md">USD</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="variants" className="p-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-blue-800">Product Variants</h3>
                  {isEditing && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Variant
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  {product.variants.map((variant, index) => (
                    <Card key={variant.id} className="border-blue-200">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                          <div>
                            <Label className="text-sm text-blue-700">SKU</Label>
                            <p className="font-mono text-sm">{variant.sku}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-blue-700">Size</Label>
                            <p className="text-sm">{variant.size || 'N/A'}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-blue-700">Color</Label>
                            <p className="text-sm">{variant.color || 'N/A'}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-blue-700">Stock</Label>
                            <p className="text-sm font-medium">{variant.stock}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-blue-700">Price</Label>
                            <p className="text-sm font-medium text-green-600">{formatCurrency(variant.price)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;
