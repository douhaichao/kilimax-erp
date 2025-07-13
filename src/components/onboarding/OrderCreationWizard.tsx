import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  FileText, 
  Plus, 
  Minus, 
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Eye,
  Calendar,
  MapPin,
  CreditCard
} from 'lucide-react';

interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface OrderCreationWizardProps {
  onComplete: (orderData: any) => void;
  onCancel: () => void;
}

export const OrderCreationWizard: React.FC<OrderCreationWizardProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    orderNumber: `SO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    customer: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    orderDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    paymentTerms: '30 days',
    notes: '',
    items: [] as OrderItem[]
  });

  const [availableProducts] = useState([
    { id: '1', name: 'Premium Coffee Beans', sku: 'PCB-001', price: 29.99, stock: 150 },
    { id: '2', name: 'Wireless Headphones', sku: 'WH-001', price: 150.00, stock: 45 },
    { id: '3', name: 'Smart Watch', sku: 'SW-001', price: 299.99, stock: 23 },
    { id: '4', name: 'Bluetooth Speaker', sku: 'BS-001', price: 89.99, stock: 67 },
    { id: '5', name: 'Phone Case', sku: 'PC-001', price: 24.99, stock: 200 }
  ]);

  const [customers] = useState([
    { 
      name: 'Kilimanjaro Trading Co.',
      email: 'orders@kilimanjaro-trading.co.tz',
      phone: '+255 123 456 789',
      address: '123 Business District, Dar es Salaam, Tanzania'
    },
    { 
      name: 'Lagos Tech Solutions',
      email: 'procurement@lagostech.ng',
      phone: '+234 801 234 5678',
      address: '45 Victoria Island, Lagos, Nigeria'
    },
    { 
      name: 'Sahara Logistics Ltd',
      email: 'orders@sahara-logistics.ma',
      phone: '+212 522 123 456',
      address: '78 Hassan II Blvd, Casablanca, Morocco'
    }
  ]);

  const addItem = (product: any) => {
    const newItem: OrderItem = {
      id: `item-${Date.now()}`,
      productName: product.name,
      sku: product.sku,
      quantity: 1,
      unitPrice: product.price,
      total: product.price
    };
    setOrderData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setOrderData(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId 
          ? { ...item, quantity, total: quantity * item.unitPrice }
          : item
      )
    }));
  };

  const removeItem = (itemId: string) => {
    setOrderData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleCustomerSelect = (customerName: string) => {
    const customer = customers.find(c => c.name === customerName);
    if (customer) {
      setOrderData(prev => ({
        ...prev,
        customer: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        deliveryAddress: customer.address
      }));
    }
  };

  const calculateTotals = () => {
    const subtotal = orderData.items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  const steps = [
    { number: 1, title: 'Customer Info', icon: Users },
    { number: 2, title: 'Add Products', icon: Package },
    { number: 3, title: 'Review & Create', icon: CheckCircle2 }
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;
        
        return (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center space-x-3 ${isActive ? 'text-primary' : isCompleted ? 'text-secondary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isActive ? 'bg-primary text-primary-foreground' : 
                isCompleted ? 'bg-secondary text-white' : 'bg-muted'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className="font-medium hidden sm:block">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 mx-4 text-muted-foreground" />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderStep1 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold mb-2">Select Customer</h2>
          <p className="text-muted-foreground">Choose who this order is for</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Customer</label>
            <Select value={orderData.customer} onValueChange={handleCustomerSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a customer..." />
              </SelectTrigger>
              <SelectContent>
                {customers.map(customer => (
                  <SelectItem key={customer.name} value={customer.name}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-xs text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {orderData.customer && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input value={orderData.customerEmail} readOnly className="bg-muted/50" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input value={orderData.customerPhone} readOnly className="bg-muted/50" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Delivery Address</span>
                </label>
                <Input 
                  value={orderData.deliveryAddress}
                  onChange={(e) => setOrderData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Order Date</span>
                  </label>
                  <Input 
                    type="date"
                    value={orderData.orderDate}
                    onChange={(e) => setOrderData(prev => ({ ...prev, orderDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Payment Terms</span>
                  </label>
                  <Select value={orderData.paymentTerms} onValueChange={(value) => setOrderData(prev => ({ ...prev, paymentTerms: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 days">Net 30 days</SelectItem>
                      <SelectItem value="15 days">Net 15 days</SelectItem>
                      <SelectItem value="due on receipt">Due on receipt</SelectItem>
                      <SelectItem value="cod">Cash on delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="lg:border-l lg:pl-8">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">Order Preview</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">{orderData.orderNumber}</span>
                <Badge variant="outline">Draft</Badge>
              </div>
              
              {orderData.customer ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer:</span>
                    <span className="font-medium">{orderData.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{new Date(orderData.orderDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment:</span>
                    <span>{orderData.paymentTerms}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select a customer to see preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold mb-2">Add Products</h2>
          <p className="text-muted-foreground">Select products for this order</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Available Products</span>
          </h3>
          
          <div className="grid gap-3">
            {availableProducts.map(product => (
              <Card key={product.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.price}</p>
                    <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => addItem(product)}
                    disabled={orderData.items.some(item => item.sku === product.sku)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:border-l lg:pl-8">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Order Items</h3>
            </div>
            <Badge variant="secondary">{orderData.items.length} items</Badge>
          </div>

          {orderData.items.length > 0 ? (
            <div className="space-y-4">
              {orderData.items.map(item => (
                <Card key={item.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{item.productName}</h4>
                        <p className="text-xs text-muted-foreground">{item.sku}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">${item.unitPrice} each</p>
                        <p className="font-medium">${item.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No items added yet</p>
              <p className="text-sm">Add products from the left panel</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Review Your Order</h2>
        <p className="text-muted-foreground">Confirm all details before creating the order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Customer Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{orderData.customer}</p>
                <p className="text-sm text-muted-foreground">{orderData.customerEmail}</p>
                <p className="text-sm text-muted-foreground">{orderData.customerPhone}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-1">Delivery Address</p>
                <p className="text-sm text-muted-foreground">{orderData.deliveryAddress}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Order Date</p>
                  <p className="text-muted-foreground">{new Date(orderData.orderDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium">Payment Terms</p>
                  <p className="text-muted-foreground">{orderData.paymentTerms}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">{item.quantity} × ${item.unitPrice}</p>
                    </div>
                    <p className="font-medium">${item.total.toFixed(2)}</p>
                  </div>
                ))}
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total:</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:border-l lg:pl-8">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Order Preview</h3>
            </div>

            <Card className="border-2 border-dashed border-primary/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>{orderData.orderNumber}</CardTitle>
                <CardDescription>Sales Order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    ${total.toFixed(2)}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer:</span>
                    <span className="font-medium">{orderData.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items:</span>
                    <span className="font-medium">{orderData.items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>What happens next?</span>
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Order will be saved to your system</li>
                <li>• Customer will receive confirmation email</li>
                <li>• Order will appear in your orders dashboard</li>
                <li>• You can track fulfillment progress</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return orderData.customer && orderData.deliveryAddress;
      case 2:
        return orderData.items.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Create Sales Order</h1>
          </div>
          <Progress value={(currentStep / 3) * 100} className="max-w-md mx-auto" />
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Content */}
        <div className="mb-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep === 1) {
                onCancel();
              } else {
                setCurrentStep(prev => prev - 1);
              }
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>

          <Button
            onClick={() => {
              if (currentStep === 3) {
                onComplete({
                  ...orderData,
                  total,
                  subtotal,
                  tax
                });
              } else {
                setCurrentStep(prev => prev + 1);
              }
            }}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-primary to-primary/80"
          >
            {currentStep === 3 ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Create Order
              </>
            ) : (
              <>
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};