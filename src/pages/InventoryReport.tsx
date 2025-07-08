import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Download, 
  Package, 
  AlertTriangle,
  TrendingUp,
  Warehouse
} from 'lucide-react';

interface InventoryItem {
  id: string;
  productSku: string;
  productName: string;
  category: string;
  warehouseId: string;
  warehouseName: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  unitCost: number;
  totalValue: number;
  uom: string;
  lastUpdated: string;
}

interface Warehouse {
  id: string;
  name: string;
  code: string;
  location: string;
}

const mockWarehouses: Warehouse[] = [
  { id: 'wh-001', name: 'Main Warehouse', code: 'MAIN', location: 'Central District' },
  { id: 'wh-002', name: 'North Warehouse', code: 'NORTH', location: 'North District' },
  { id: 'wh-003', name: 'South Warehouse', code: 'SOUTH', location: 'South District' },
  { id: 'wh-004', name: 'East Warehouse', code: 'EAST', location: 'East District' }
];

const mockInventoryData: InventoryItem[] = [
  {
    id: 'inv-001',
    productSku: 'LED-DISP-001',
    productName: 'LED Display Module',
    category: 'Electronics',
    warehouseId: 'wh-001',
    warehouseName: 'Main Warehouse',
    currentStock: 150,
    reservedStock: 30,
    availableStock: 120,
    minStockLevel: 50,
    maxStockLevel: 300,
    unitCost: 245.00,
    totalValue: 36750.00,
    uom: 'pcs',
    lastUpdated: '2024-01-20T14:30:00Z'
  },
  {
    id: 'inv-002',
    productSku: 'LED-DISP-001',
    productName: 'LED Display Module',
    category: 'Electronics',
    warehouseId: 'wh-002',
    warehouseName: 'North Warehouse',
    currentStock: 45,
    reservedStock: 15,
    availableStock: 30,
    minStockLevel: 50,
    maxStockLevel: 200,
    unitCost: 245.00,
    totalValue: 11025.00,
    uom: 'pcs',
    lastUpdated: '2024-01-20T10:15:00Z'
  },
  {
    id: 'inv-003',
    productSku: 'CCB-001',
    productName: 'Control Circuit Board',
    category: 'Electronics',
    warehouseId: 'wh-001',
    warehouseName: 'Main Warehouse',
    currentStock: 200,
    reservedStock: 50,
    availableStock: 150,
    minStockLevel: 100,
    maxStockLevel: 500,
    unitCost: 189.50,
    totalValue: 37900.00,
    uom: 'pcs',
    lastUpdated: '2024-01-20T16:45:00Z'
  },
  {
    id: 'inv-004',
    productSku: 'SENS-IND-001',
    productName: 'Industrial Sensors',
    category: 'Sensors',
    warehouseId: 'wh-003',
    warehouseName: 'South Warehouse',
    currentStock: 25,
    reservedStock: 10,
    availableStock: 15,
    minStockLevel: 30,
    maxStockLevel: 150,
    unitCost: 78.25,
    totalValue: 1956.25,
    uom: 'pcs',
    lastUpdated: '2024-01-19T12:00:00Z'
  },
  {
    id: 'inv-005',
    productSku: 'HYD-PUMP-001',
    productName: 'Hydraulic Pumps',
    category: 'Machinery',
    warehouseId: 'wh-004',
    warehouseName: 'East Warehouse',
    currentStock: 8,
    reservedStock: 2,
    availableStock: 6,
    minStockLevel: 5,
    maxStockLevel: 25,
    unitCost: 1250.00,
    totalValue: 10000.00,
    uom: 'pcs',
    lastUpdated: '2024-01-18T08:30:00Z'
  }
];

const InventoryReport = () => {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');

  useEffect(() => {
    setInventoryData(mockInventoryData);
  }, []);

  const getStockStatus = (item: InventoryItem) => {
    if (item.availableStock <= 0) return 'out_of_stock';
    if (item.availableStock < item.minStockLevel) return 'low_stock';
    if (item.availableStock > item.maxStockLevel) return 'overstock';
    return 'normal';
  };

  const getStockStatusBadge = (status: string) => {
    const statusConfig = {
      out_of_stock: { label: 'Out of Stock', variant: 'destructive' as const, className: 'bg-red-600 text-white' },
      low_stock: { label: 'Low Stock', variant: 'outline' as const, className: 'text-amber-700 border-amber-400 bg-amber-50' },
      overstock: { label: 'Overstock', variant: 'outline' as const, className: 'text-blue-700 border-blue-400 bg-blue-50' },
      normal: { label: 'Normal', variant: 'default' as const, className: 'bg-green-600 text-white' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className={`text-xs font-medium ${config.className}`}>
        {config.label}
      </Badge>
    );
  };

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = 
      item.productSku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.warehouseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWarehouse = selectedWarehouse === 'all' || item.warehouseId === selectedWarehouse;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    let matchesStockFilter = true;
    if (stockFilter !== 'all') {
      const status = getStockStatus(item);
      matchesStockFilter = status === stockFilter;
    }
    
    return matchesSearch && matchesWarehouse && matchesCategory && matchesStockFilter;
  });

  const exportToCSV = () => {
    const headers = [
      'SKU', 'Product Name', 'Category', 'Warehouse', 'Current Stock', 
      'Reserved', 'Available', 'Min Level', 'Max Level', 'Unit Cost', 'Total Value', 'Status'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredData.map(item => [
        item.productSku,
        item.productName,
        item.category,
        item.warehouseName,
        item.currentStock,
        item.reservedStock,
        item.availableStock,
        item.minStockLevel,
        item.maxStockLevel,
        item.unitCost,
        item.totalValue,
        getStockStatus(item)
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getUniqueCategories = () => {
    return [...new Set(inventoryData.map(item => item.category))];
  };

  const getTotalValue = () => {
    return filteredData.reduce((sum, item) => sum + item.totalValue, 0);
  };

  const getLowStockCount = () => {
    return filteredData.filter(item => getStockStatus(item) === 'low_stock').length;
  };

  const getOutOfStockCount = () => {
    return filteredData.filter(item => getStockStatus(item) === 'out_of_stock').length;
  };

  return (
    <div className="space-y-6">
      {/* Main Actions */}
      <div className="flex justify-end">
        <Button variant="outline" onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="flex items-center p-6">
            <Package className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">Total Items</CardTitle>
              <span className="text-2xl font-bold">{filteredData.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
              <span className="text-2xl font-bold">{formatCurrency(getTotalValue())}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="flex items-center p-6">
            <AlertTriangle className="h-8 w-8 text-amber-600 mr-3" />
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">Low Stock</CardTitle>
              <span className="text-2xl font-bold">{getLowStockCount()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="flex items-center p-6">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">Out of Stock</CardTitle>
              <span className="text-2xl font-bold">{getOutOfStockCount()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products or warehouses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Warehouses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Warehouses</SelectItem>
            {mockWarehouses.map((warehouse) => (
              <SelectItem key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {getUniqueCategories().map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Stock Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock Levels</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            <SelectItem value="low_stock">Low Stock</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="overstock">Overstock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Warehouse className="mr-2 h-5 w-5" />
            Inventory Report
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Reserved</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Min/Max</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.productName}</div>
                        <div className="text-sm text-muted-foreground">{item.productSku}</div>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.warehouseName}</div>
                        <div className="text-sm text-muted-foreground">
                          {mockWarehouses.find(w => w.id === item.warehouseId)?.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.currentStock} {item.uom}</TableCell>
                    <TableCell className="text-amber-600">{item.reservedStock} {item.uom}</TableCell>
                    <TableCell className="font-bold">{item.availableStock} {item.uom}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Min: {item.minStockLevel}</div>
                        <div>Max: {item.maxStockLevel}</div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.unitCost)}</TableCell>
                    <TableCell className="font-bold">{formatCurrency(item.totalValue)}</TableCell>
                    <TableCell>
                      {getStockStatusBadge(getStockStatus(item))}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(item.lastUpdated).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No inventory items found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryReport;