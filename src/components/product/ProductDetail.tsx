
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Upload, Edit, Save, X, Plus, Trash2, Scale, Package, DollarSign, BarChart3 } from 'lucide-react';
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
      active: { label: 'Active', className: 'bg-green-100 text-green-800' },
      inactive: { label: 'Inactive', className: 'bg-gray-100 text-gray-800' },
      archived: { label: 'Archived', className: 'bg-red-100 text-red-800' }
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
    <div className="space-y-6 print:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
            <p className="text-gray-600">View and manage product information</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          <Button variant="destructive" onClick={() => onDelete(product.id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Product Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Product Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Product Name</label>
                {isEditing ? (
                  <Input
                    value={editedProduct.name}
                    onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-lg font-semibold">{product.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">SKU</label>
                {isEditing ? (
                  <Input
                    value={editedProduct.sku}
                    onChange={(e) => setEditedProduct({...editedProduct, sku: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-lg font-semibold font-mono">{product.sku}</p>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Category</label>
                <p className="text-lg font-semibold">{product.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Supplier</label>
                {isEditing ? (
                  <Input
                    value={editedProduct.supplier || ''}
                    onChange={(e) => setEditedProduct({...editedProduct, supplier: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-lg font-semibold">{product.supplier || 'N/A'}</p>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium text-gray-500">Description</label>
              {isEditing ? (
                <Textarea
                  value={editedProduct.description}
                  onChange={(e) => setEditedProduct({...editedProduct, description: e.target.value})}
                  className="mt-1"
                  rows={3}
                />
              ) : (
                <p className="text-lg">{product.description}</p>
              )}
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <div className="flex items-center space-x-3 mt-2">
                {isEditing ? (
                  <Switch 
                    checked={editedProduct.status === 'active'}
                    onCheckedChange={(checked) => 
                      setEditedProduct({
                        ...editedProduct, 
                        status: checked ? 'active' : 'inactive'
                      })
                    }
                  />
                ) : null}
                {getStatusBadge(isEditing ? editedProduct.status : product.status)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Product Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Stock:</span>
                <span className="font-medium">{product.stock} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Safety Stock:</span>
                <span className="font-medium">{product.safetyStock} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Selling Price:</span>
                <span className="font-medium text-green-600">{formatCurrency(product.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cost Price:</span>
                <span className="font-medium text-red-600">{formatCurrency(product.cost)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Profit Margin:</span>
                <span className="text-blue-600">
                  {formatCurrency(product.price - product.cost)} ({((product.price - product.cost) / product.price * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Units of Measure */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5" />
              <span>Units of Measure</span>
            </CardTitle>
            {isEditing && (
              <Button onClick={addUOM}>
                <Plus className="h-4 w-4 mr-2" />
                Add UOM
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {editedProduct.uoms.map((productUom, index) => (
              <Card key={productUom.id} className={`${productUom.isDefault ? 'ring-2 ring-blue-400' : ''}`}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div>
                      <Label className="text-sm text-gray-500">Unit</Label>
                      {isEditing ? (
                        <Select
                          value={productUom.uomId}
                          onValueChange={(value) => updateUOM(index, 'uomId', value)}
                        >
                          <SelectTrigger className="mt-1">
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
                      <Label className="text-sm text-gray-500">Price</Label>
                      {isEditing ? (
                        <Input
                          type="number"
                          step="0.01"
                          value={productUom.price || 0}
                          onChange={(e) => updateUOM(index, 'price', parseFloat(e.target.value))}
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-sm font-medium text-green-600">{formatCurrency(productUom.price || 0)}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm text-gray-500">Barcode</Label>
                      {isEditing ? (
                        <Input
                          value={productUom.barcode || ''}
                          onChange={(e) => updateUOM(index, 'barcode', e.target.value)}
                          className="mt-1"
                          placeholder="Optional"
                        />
                      ) : (
                        <p className="text-sm font-mono">{productUom.barcode || 'N/A'}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm text-gray-500">Type</Label>
                      <p className="text-sm">
                        <Badge variant={productUom.uom?.type === 'piece' ? 'default' : 'secondary'}>
                          {productUom.uom?.type || 'N/A'}
                        </Badge>
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm text-gray-500">Default</Label>
                      {isEditing ? (
                        <div className="mt-1">
                          <Button
                            variant={productUom.isDefault ? "default" : "outline"}
                            size="sm"
                            onClick={() => setAsDefaultUOM(index)}
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

      {/* Inventory & Pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Current Stock</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedProduct.stock}
                  onChange={(e) => setEditedProduct({...editedProduct, stock: parseInt(e.target.value)})}
                  className="mt-1"
                />
              ) : (
                <p className="text-lg font-semibold">{product.stock} units</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-500">Safety Stock</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedProduct.safetyStock}
                  onChange={(e) => setEditedProduct({...editedProduct, safetyStock: parseInt(e.target.value)})}
                  className="mt-1"
                />
              ) : (
                <p className="text-lg font-semibold">{product.safetyStock} units</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Pricing</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Selling Price</Label>
              {isEditing ? (
                <Input
                  type="number"
                  step="0.01"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({...editedProduct, price: parseFloat(e.target.value)})}
                  className="mt-1"
                />
              ) : (
                <p className="text-lg font-semibold text-green-600">{formatCurrency(product.price)}</p>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-500">Cost Price</Label>
              {isEditing ? (
                <Input
                  type="number"
                  step="0.01"
                  value={editedProduct.cost}
                  onChange={(e) => setEditedProduct({...editedProduct, cost: parseFloat(e.target.value)})}
                  className="mt-1"
                />
              ) : (
                <p className="text-lg font-semibold text-red-600">{formatCurrency(product.cost)}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Variants */}
      {product.variants && product.variants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Product Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {product.variants.map((variant, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">Size</Label>
                        <p className="text-sm font-medium">{variant.size || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Color</Label>
                        <p className="text-sm font-medium">{variant.color || 'N/A'}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">SKU</Label>
                        <p className="text-sm font-mono">{variant.sku}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Stock</Label>
                        <p className="text-sm font-medium">{variant.stock} units</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Price</Label>
                        <p className="text-sm font-medium text-green-600">{formatCurrency(variant.price)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductDetail;
