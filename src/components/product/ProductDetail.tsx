import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Edit, Save, X, Plus, Trash2, Scale } from 'lucide-react';
import { Product, UOM, ProductUOM } from '@/pages/ProductManagement';

interface ProductDetailProps {
  product: Product;
  systemUOMs: UOM[];
  onBack: () => void;
}

const ProductDetail = ({ product, systemUOMs, onBack }: ProductDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleSave = () => {
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

  const addUOM = () => {
    const newUOM: ProductUOM = {
      id: `uom-${Date.now()}`,
      uomId: systemUOMs[0].id,
      uom: systemUOMs[0],
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
            i === index ? { ...uom, uomId: value, uom: selectedUOM } : uom
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

      {/* Product Details Tabs */}
      <Card className="border-blue-200 shadow-sm">
        <CardContent className="p-0">
          <Tabs defaultValue="basic" className="w-full">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-blue-200 px-6 pt-6">
              <TabsList className="bg-white border border-blue-200">
                <TabsTrigger value="basic" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="uom" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Scale className="h-4 w-4 mr-2" />
                  Units of Measure
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

            <TabsContent value="uom" className="p-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">Units of Measure</h3>
                    <p className="text-sm text-gray-600">Manage different selling units for this product</p>
                  </div>
                  {isEditing && (
                    <Button onClick={addUOM} className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add UOM
                    </Button>
                  )}
                </div>

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
                              <p className="text-sm font-medium">{productUom.uom.name} ({productUom.uom.symbol})</p>
                            )}
                          </div>
                          
                          <div>
                            <Label className="text-sm text-blue-700">Price</Label>
                            {isEditing ? (
                              <Input
                                type="number"
                                step="0.01"
                                value={productUom.price}
                                onChange={(e) => updateUOM(index, 'price', parseFloat(e.target.value))}
                                className="mt-1 border-blue-200"
                              />
                            ) : (
                              <p className="text-sm font-medium text-green-600">{formatCurrency(productUom.price)}</p>
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
                              <Badge variant={productUom.uom.type === 'base' ? 'default' : 'secondary'}>
                                {productUom.uom.type}
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

                {editedProduct.uoms.length === 0 && (
                  <Card className="border-blue-200 border-dashed">
                    <CardContent className="p-8 text-center">
                      <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No units of measure defined</p>
                      {isEditing && (
                        <Button onClick={addUOM} variant="outline" className="border-blue-300 text-blue-700">
                          Add First UOM
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
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
                    <p className="text-sm text-gray-600">
                      Units available in {product.uoms.find(u => u.isDefault)?.uom.symbol || 'base unit'}
                    </p>
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
                    <CardTitle className="text-lg text-blue-800">Pricing by Unit</CardTitle>
                    <p className="text-sm text-gray-600">Different units may have different pricing</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {product.uoms.map((productUom) => (
                        <div key={productUom.id} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-medium text-blue-800">
                              {productUom.uom.name} ({productUom.uom.symbol})
                              {productUom.isDefault && <Badge className="ml-2 bg-blue-600 text-white text-xs">Default</Badge>}
                            </p>
                            <p className="text-sm text-gray-600">
                              Conversion: {productUom.uom.conversionFactor}x base unit
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-green-600">{formatCurrency(productUom.price)}</p>
                            <p className="text-sm text-gray-500">per {productUom.uom.symbol}</p>
                          </div>
                        </div>
                      ))}
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
                        {variant.uoms && variant.uoms.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <Label className="text-sm text-blue-700 mb-2 block">Variant UOMs</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {variant.uoms.map((variantUom) => (
                                <div key={variantUom.id} className="text-xs bg-gray-50 p-2 rounded">
                                  <p className="font-medium">{variantUom.uom.symbol}</p>
                                  <p className="text-green-600">{formatCurrency(variantUom.price)}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
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
