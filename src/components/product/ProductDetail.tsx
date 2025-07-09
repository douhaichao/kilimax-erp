import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Edit, Save, X, Plus, Trash2, Scale } from 'lucide-react';
import { Product, UOM, ProductUOM, Category } from '@/types/product';

interface ProductDetailProps {
  product: Product;
  categories: Category[];
  onUpdate: (updatedProduct: Product) => void;
  onDelete: (productId: string) => void;
  onBack: () => void;
}

const ProductDetail = ({ product, categories, onUpdate, onDelete, onBack }: ProductDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const systemUOMs: UOM[] = [
    { id: 'piece', name: 'Piece', ratio: 1, isDefault: true, symbol: 'pc', type: 'piece', isActive: true, conversionFactor: 1 },
    { id: 'kg', name: 'Kilogram', ratio: 1, isDefault: false, symbol: 'kg', type: 'weight', isActive: true, conversionFactor: 1 },
    { id: 'liter', name: 'Liter', ratio: 1, isDefault: false, symbol: 'L', type: 'volume', isActive: true, conversionFactor: 1 },
    { id: 'meter', name: 'Meter', ratio: 1, isDefault: false, symbol: 'm', type: 'length', isActive: true, conversionFactor: 1 },
    { id: 'pack', name: 'Pack', ratio: 6, isDefault: false, symbol: 'pack', type: 'piece', isActive: true, conversionFactor: 6 }
  ];

  const handleSave = () => {
    console.log('Saving product:', editedProduct);
    onUpdate(editedProduct);
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

  const addUOM = () => {
    const newUOM: ProductUOM = {
      id: `uom-${Date.now()}`,
      name: systemUOMs[0].name,
      uomId: systemUOMs[0].id,
      uom: systemUOMs[0],
      ratio: 1,
      price: editedProduct.price,
      isDefault: false
    };
    
    setEditedProduct({
      ...editedProduct,
      uoms: [...editedProduct.uoms, newUOM]
    });
  };

  const updateUOM = (index: number, field: keyof ProductUOM, value: any) => {
    if (field === 'uomId') {
      const selectedUOM = systemUOMs.find(u => u.id === value);
      if (selectedUOM) {
        setEditedProduct({
          ...editedProduct,
          uoms: editedProduct.uoms.map((uom, i) => 
            i === index ? { ...uom, uomId: value, uom: selectedUOM, name: selectedUOM.name } : uom
          )
        });
      }
    } else {
      setEditedProduct({
        ...editedProduct,
        uoms: editedProduct.uoms.map((uom, i) => 
          i === index ? { ...uom, [field]: value } : uom
        )
      });
    }
  };

  const removeUOM = (index: number) => {
    setEditedProduct({
      ...editedProduct,
      uoms: editedProduct.uoms.filter((_, i) => i !== index)
    });
  };

  const setAsDefaultUOM = (index: number) => {
    setEditedProduct({
      ...editedProduct,
      uoms: editedProduct.uoms.map((uom, i) => ({
        ...uom,
        isDefault: i === index
      }))
    });
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

      {/* Product Details */}
      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
            <CardTitle className="text-blue-800">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
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
                      value={editedProduct.supplier || ''}
                      onChange={(e) => setEditedProduct({...editedProduct, supplier: e.target.value})}
                      className="mt-2 border-blue-200 focus:border-blue-400"
                    />
                  ) : (
                    <p className="mt-2 p-3 bg-gray-50 rounded-md">{product.supplier || 'N/A'}</p>
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
          </CardContent>
        </Card>

        {/* Units of Measure */}
        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-blue-800 flex items-center">
                  <Scale className="h-5 w-5 mr-2" />
                  Units of Measure
                </CardTitle>
                <p className="text-sm text-blue-600 mt-1">Manage different selling units for this product</p>
              </div>
              {isEditing && (
                <Button onClick={addUOM} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add UOM
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {editedProduct.uoms.map((productUom, index) => (
                <Card key={productUom.id} className={`border-blue-200 ${productUom.isDefault ? 'ring-2 ring-blue-400' : ''}`}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div>
                        <Label className="text-sm text-blue-700">Unit</Label>
                        {isEditing ? (
                          <Select
                            value={productUom.uomId}
                            onValueChange={(value) => updateUOM(index, 'uomId', value)}
                          >
                            <SelectTrigger className="mt-1 border-blue-200">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {systemUOMs.filter(u => u.isActive).map(uom => (
                                <SelectItem key={uom.id} value={uom.id}>
                                  {uom.name} ({uom.symbol})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm font-medium">{productUom.uom?.name} ({productUom.uom?.symbol})</p>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-sm text-blue-700">Price</Label>
                        {isEditing ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={productUom.price || 0}
                            onChange={(e) => updateUOM(index, 'price', parseFloat(e.target.value))}
                            className="mt-1 border-blue-200"
                          />
                        ) : (
                          <p className="text-sm font-medium text-green-600">{formatCurrency(productUom.price || 0)}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm text-blue-700">Barcode</Label>
                        {isEditing ? (
                          <Input
                            value={productUom.barcode || ''}
                            onChange={(e) => updateUOM(index, 'barcode', e.target.value)}
                            className="mt-1 border-blue-200"
                            placeholder="Optional"
                          />
                        ) : (
                          <p className="text-sm font-mono">{productUom.barcode || 'N/A'}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm text-blue-700">Type</Label>
                        <p className="text-sm">
                          <Badge variant={productUom.uom?.type === 'piece' ? 'default' : 'secondary'}>
                            {productUom.uom?.type || 'N/A'}
                          </Badge>
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm text-blue-700">Default</Label>
                        {isEditing ? (
                          <div className="mt-1">
                            <Button
                              variant={productUom.isDefault ? "default" : "outline"}
                              size="sm"
                              onClick={() => setAsDefaultUOM(index)}
                              className={productUom.isDefault ? "bg-blue-600" : ""}
                            >
                              {productUom.isDefault ? 'Default' : 'Set Default'}
                            </Button>
                          </div>
                        ) : (
                          <p className="text-sm">
                            {productUom.isDefault ? (
                              <Badge className="bg-blue-600 text-white">Default</Badge>
                            ) : (
                              '-'
                            )}
                          </p>
                        )}
                      </div>

                      <div>
                        {isEditing && editedProduct.uoms.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeUOM(index)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
            <CardTitle className="text-blue-800">Inventory</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="stock" className="text-blue-800 font-medium">Current Stock</Label>
                {isEditing ? (
                  <Input
                    id="stock"
                    type="number"
                    value={editedProduct.stock}
                    onChange={(e) => setEditedProduct({...editedProduct, stock: parseInt(e.target.value)})}
                    className="mt-2 border-blue-200 focus:border-blue-400"
                  />
                ) : (
                  <p className="mt-2 p-3 bg-gray-50 rounded-md">{product.stock} units</p>
                )}
              </div>

              <div>
                <Label htmlFor="safetyStock" className="text-blue-800 font-medium">Safety Stock</Label>
                {isEditing ? (
                  <Input
                    id="safetyStock"
                    type="number"
                    value={editedProduct.safetyStock}
                    onChange={(e) => setEditedProduct({...editedProduct, safetyStock: parseInt(e.target.value)})}
                    className="mt-2 border-blue-200 focus:border-blue-400"
                  />
                ) : (
                  <p className="mt-2 p-3 bg-gray-50 rounded-md">{product.safetyStock} units</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
            <CardTitle className="text-blue-800">Pricing</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price" className="text-blue-800 font-medium">Selling Price</Label>
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
                  <p className="mt-2 p-3 bg-gray-50 rounded-md text-green-600 font-medium">{formatCurrency(product.price)}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cost" className="text-blue-800 font-medium">Cost Price</Label>
                {isEditing ? (
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    value={editedProduct.cost}
                    onChange={(e) => setEditedProduct({...editedProduct, cost: parseFloat(e.target.value)})}
                    className="mt-2 border-blue-200 focus:border-blue-400"
                  />
                ) : (
                  <p className="mt-2 p-3 bg-gray-50 rounded-md text-red-600 font-medium">{formatCurrency(product.cost)}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-800 font-medium">Profit Margin</span>
                    <span className="text-blue-600 font-semibold">
                      {formatCurrency(product.price - product.cost)} ({((product.price - product.cost) / product.price * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Variants */}
        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
            <CardTitle className="text-blue-800">Product Variants</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {product.variants && product.variants.length > 0 ? (
              <div className="space-y-4">
                {product.variants.map((variant, index) => (
                  <Card key={index} className="border-blue-200">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <Label className="text-sm text-blue-700">Size</Label>
                          <p className="text-sm font-medium">{variant.size || 'N/A'}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-blue-700">Color</Label>
                          <p className="text-sm font-medium">{variant.color || 'N/A'}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-blue-700">SKU</Label>
                          <p className="text-sm font-mono">{variant.sku}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-blue-700">Stock</Label>
                          <p className="text-sm font-medium">{variant.stock} units</p>
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
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No variants available for this product</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;