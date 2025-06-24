import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, Camera, Save, ArrowRight, ArrowLeft, CheckCircle, Scale, Plus, Trash2 } from 'lucide-react';
import { Category, UOM, ProductUOM } from '@/pages/ProductManagement';

interface QuickCreateFormProps {
  onClose: () => void;
  categories: Category[];
  systemUOMs: UOM[];
}

interface FormData {
  name: string;
  sku: string;
  category: string;
  supplier: string;
  description: string;
  price: string;
  stock: string;
  safetyStock: string;
  baseUomId: string;
  uoms: Array<{
    uomId: string;
    price: string;
    barcode: string;
    isDefault: boolean;
  }>;
  variants: Array<{
    size?: string;
    color?: string;
    sku: string;
    stock: string;
    price: string;
  }>;
}

const QuickCreateForm = ({ onClose, categories, systemUOMs }: QuickCreateFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    sku: '',
    category: '',
    supplier: '',
    description: '',
    price: '',
    stock: '',
    safetyStock: '',
    baseUomId: 'pcs',
    uoms: [
      {
        uomId: 'pcs',
        price: '',
        barcode: '',
        isDefault: true
      }
    ],
    variants: []
  });

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Product details and category' },
    { number: 2, title: 'Units & Pricing', description: 'UOM and pricing setup' },
    { number: 3, title: 'Variants', description: 'Size, color, and specifications' },
    { number: 4, title: 'Inventory', description: 'Stock and safety levels' }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addUOM = () => {
    const availableUOMs = systemUOMs.filter(uom => 
      !formData.uoms.some(existingUom => existingUom.uomId === uom.id)
    );
    
    if (availableUOMs.length > 0) {
      setFormData(prev => ({
        ...prev,
        uoms: [
          ...prev.uoms,
          {
            uomId: availableUOMs[0].id,
            price: prev.price,
            barcode: '',
            isDefault: false
          }
        ]
      }));
    }
  };

  const updateUOM = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      uoms: prev.uoms.map((uom, i) => 
        i === index ? { ...uom, [field]: value } : uom
      )
    }));
  };

  const removeUOM = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uoms: prev.uoms.filter((_, i) => i !== index)
    }));
  };

  const setAsDefaultUOM = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uoms: prev.uoms.map((uom, i) => ({
        ...uom,
        isDefault: i === index
      }))
    }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          size: '',
          color: '',
          sku: `${prev.sku}-V${prev.variants.length + 1}`,
          stock: '',
          price: prev.price
        }
      ]
    }));
  };

  const updateVariant = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    console.log('Saving product:', formData);
    onClose();
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.sku && formData.category;
      case 2:
        return formData.uoms.length > 0 && formData.uoms.some(uom => uom.isDefault);
      case 3:
        return true; // Variants are optional
      case 4:
        return formData.stock;
      default:
        return false;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-blue-800">Quick Create Product - Multi UOM</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 py-6 border-b border-blue-200 overflow-x-auto">
          {steps.map((step) => (
            <div key={step.number} className="flex items-center min-w-0">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 flex-shrink-0
                ${currentStep >= step.number 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'border-gray-300 text-gray-400'
                }
              `}>
                {currentStep > step.number ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  step.number
                )}
              </div>
              <div className="ml-3 min-w-0">
                <p className={`text-sm font-medium truncate ${currentStep >= step.number ? 'text-blue-800' : 'text-gray-500'}`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 truncate">{step.description}</p>
              </div>
              {step.number < steps.length && (
                <ArrowRight className="h-4 w-4 text-gray-400 ml-4 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="py-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-blue-800 font-medium">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                    className="mt-2 border-blue-200 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Label htmlFor="sku" className="text-blue-800 font-medium">SKU *</Label>
                  <div className="flex mt-2">
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => handleInputChange('sku', e.target.value)}
                      placeholder="Enter SKU"
                      className="border-blue-200 focus:border-blue-400"
                    />
                    <Button variant="outline" className="ml-2 border-blue-300">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Click camera to scan barcode</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category" className="text-blue-800 font-medium">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="mt-2 border-blue-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="supplier" className="text-blue-800 font-medium">Supplier</Label>
                  <Input
                    id="supplier"
                    value={formData.supplier}
                    onChange={(e) => handleInputChange('supplier', e.target.value)}
                    placeholder="Enter supplier name"
                    className="mt-2 border-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-blue-800 font-medium">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter product description"
                  className="mt-2 border-blue-200 focus:border-blue-400"
                  rows={4}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Units of Measure & Pricing</h3>
                  <p className="text-sm text-gray-600">Configure different selling units and their prices</p>
                </div>
                <Button onClick={addUOM} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add UOM
                </Button>
              </div>

              <div className="space-y-4">
                {formData.uoms.map((uom, index) => {
                  const selectedUOM = systemUOMs.find(u => u.id === uom.uomId);
                  return (
                    <Card key={index} className={`border-blue-200 ${uom.isDefault ? 'ring-2 ring-blue-400' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium text-blue-800 flex items-center">
                            <Scale className="h-4 w-4 mr-2" />
                            UOM {index + 1}
                            {uom.isDefault && <Badge className="ml-2 bg-blue-600 text-white text-xs">Default</Badge>}
                          </h4>
                          {formData.uoms.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeUOM(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <Label className="text-blue-700">Unit</Label>
                            <Select
                              value={uom.uomId}
                              onValueChange={(value) => updateUOM(index, 'uomId', value)}
                            >
                              <SelectTrigger className="mt-1 border-blue-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {systemUOMs.filter(u => u.isActive).map(systemUom => (
                                  <SelectItem key={systemUom.id} value={systemUom.id}>
                                    {systemUom.name} ({systemUom.symbol})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label className="text-blue-700">Price *</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={uom.price}
                              onChange={(e) => updateUOM(index, 'price', e.target.value)}
                              placeholder="0.00"
                              className="mt-1 border-blue-200"
                            />
                          </div>

                          <div>
                            <Label className="text-blue-700">Barcode</Label>
                            <Input
                              value={uom.barcode}
                              onChange={(e) => updateUOM(index, 'barcode', e.target.value)}
                              placeholder="Optional"
                              className="mt-1 border-blue-200"
                            />
                          </div>

                          <div>
                            <Label className="text-blue-700">Default Unit</Label>
                            <div className="mt-1">
                              <Button
                                variant={uom.isDefault ? "default" : "outline"}
                                size="sm"
                                onClick={() => setAsDefaultUOM(index)}
                                className={uom.isDefault ? "bg-blue-600" : "border-blue-300"}
                              >
                                {uom.isDefault ? 'Default' : 'Set Default'}
                              </Button>
                            </div>
                          </div>
                        </div>

                        {selectedUOM && (
                          <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                            <p className="text-blue-700">
                              <strong>Type:</strong> {selectedUOM.type} | 
                              <strong> Conversion:</strong> {selectedUOM.conversionFactor}x base unit
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-blue-800">Product Variants</h3>
                <Button onClick={addVariant} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Add Variant
                </Button>
              </div>

              {formData.variants.length === 0 ? (
                <Card className="border-blue-200 border-dashed">
                  <CardContent className="p-8 text-center">
                    <p className="text-gray-500 mb-4">No variants added yet</p>
                    <Button onClick={addVariant} variant="outline" className="border-blue-300 text-blue-700">
                      Add First Variant
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {formData.variants.map((variant, index) => (
                    <Card key={index} className="border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium text-blue-800">Variant {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeVariant(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-blue-700">Size</Label>
                            <Input
                              value={variant.size || ''}
                              onChange={(e) => updateVariant(index, 'size', e.target.value)}
                              placeholder="e.g., L, XL"
                              className="mt-1 border-blue-200"
                            />
                          </div>
                          <div>
                            <Label className="text-blue-700">Color</Label>
                            <Input
                              value={variant.color || ''}
                              onChange={(e) => updateVariant(index, 'color', e.target.value)}
                              placeholder="e.g., Red, Blue"
                              className="mt-1 border-blue-200"
                            />
                          </div>
                          <div>
                            <Label className="text-blue-700">Variant SKU</Label>
                            <Input
                              value={variant.sku}
                              onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                              className="mt-1 border-blue-200"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-blue-800">Inventory Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="stock" className="text-blue-800 font-medium">Initial Stock *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    placeholder="0"
                    className="mt-2 border-blue-200 focus:border-blue-400"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Stock in {systemUOMs.find(u => u.id === formData.baseUomId)?.symbol || 'base unit'}
                  </p>
                </div>

                <div>
                  <Label htmlFor="safetyStock" className="text-blue-800 font-medium">Safety Stock Level</Label>
                  <Input
                    id="safetyStock"
                    type="number"
                    value={formData.safetyStock}
                    onChange={(e) => handleInputChange('safetyStock', e.target.value)}
                    placeholder="0"
                    className="mt-2 border-blue-200 focus:border-blue-400"
                  />
                  <p className="text-xs text-gray-500 mt-1">Alert when stock falls below this level</p>
                </div>
              </div>

              {/* UOM Summary */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800">UOM Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {formData.uoms.map((uom, index) => {
                      const selectedUOM = systemUOMs.find(u => u.id === uom.uomId);
                      return (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-blue-700">
                            {selectedUOM?.name} ({selectedUOM?.symbol})
                            {uom.isDefault && <Badge className="ml-2 bg-blue-600 text-white text-xs">Default</Badge>}
                          </span>
                          <span className="font-medium text-green-600">
                            ${uom.price || '0.00'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-blue-200">
          <div className="flex space-x-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious} className="border-blue-300 text-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-blue-300 text-blue-700">
              Auto-saving draft
            </Badge>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="border-gray-300">
              Cancel
            </Button>
            {currentStep < 4 ? (
              <Button 
                onClick={handleNext} 
                disabled={!isStepValid(currentStep)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSave}
                disabled={!isStepValid(currentStep)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Product
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickCreateForm;
