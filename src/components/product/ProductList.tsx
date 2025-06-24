
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Product, Category } from '@/pages/ProductManagement';

interface ProductListProps {
  products: Product[];
  categories: Category[];
  onProductSelect: (product: Product) => void;
  onBatchSelect: (productIds: string[]) => void;
}

const ProductList = ({ products, categories, onProductSelect, onBatchSelect }: ProductListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    const aValue = a[sortField as keyof Product];
    const bValue = b[sortField as keyof Product];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = filteredProducts.map(p => p.id);
      setSelectedProducts(allIds);
      onBatchSelect(allIds);
    } else {
      setSelectedProducts([]);
      onBatchSelect([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    let newSelected;
    if (checked) {
      newSelected = [...selectedProducts, productId];
    } else {
      newSelected = selectedProducts.filter(id => id !== productId);
    }
    setSelectedProducts(newSelected);
    onBatchSelect(newSelected);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 h-5 w-5 text-blue-500" />
          <Input
            placeholder="Search products by name, SKU, or supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48 h-12 border-blue-200">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-48 h-12 border-blue-200">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="h-12 border-blue-300 text-blue-700 hover:bg-blue-50">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* Batch Actions */}
      {selectedProducts.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 font-medium">
                {selectedProducts.length} product(s) selected
              </span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                  Bulk Edit Price
                </Button>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                  Update Stock
                </Button>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                  Change Category
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Table */}
      <Card className="border-blue-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-blue-200 bg-blue-50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead 
                    className="font-semibold text-blue-700 cursor-pointer hover:text-blue-800"
                    onClick={() => handleSort('sku')}
                  >
                    SKU {sortField === 'sku' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="font-semibold text-blue-700 cursor-pointer hover:text-blue-800"
                    onClick={() => handleSort('name')}
                  >
                    Product Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="font-semibold text-blue-700">Category</TableHead>
                  <TableHead 
                    className="font-semibold text-blue-700 cursor-pointer hover:text-blue-800"
                    onClick={() => handleSort('stock')}
                  >
                    Stock {sortField === 'stock' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="font-semibold text-blue-700 cursor-pointer hover:text-blue-800"
                    onClick={() => handleSort('price')}
                  >
                    Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead className="font-semibold text-blue-700">Status</TableHead>
                  <TableHead className="font-semibold text-blue-700">Supplier</TableHead>
                  <TableHead className="text-right font-semibold text-blue-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => {
                  const isLowStock = product.stock <= product.safetyStock;
                  const isArchived = product.status === 'archived';
                  
                  return (
                    <TableRow 
                      key={product.id} 
                      className={`
                        border-blue-100 hover:bg-blue-25 cursor-pointer
                        ${index % 2 === 0 ? 'bg-white' : 'bg-blue-25'}
                        ${isLowStock ? 'bg-amber-50 hover:bg-amber-100' : ''}
                        ${isArchived ? 'bg-gray-100 text-gray-500 hover:bg-gray-150' : ''}
                      `}
                      onClick={() => onProductSelect(product)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium text-blue-700">
                        <div className="flex items-center">
                          {product.sku}
                          {isLowStock && (
                            <AlertTriangle className="h-4 w-4 text-amber-500 ml-2" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-gray-700">{product.category}</TableCell>
                      <TableCell className={`font-medium ${isLowStock ? 'text-amber-600' : 'text-gray-900'}`}>
                        {product.stock}
                        {isLowStock && (
                          <span className="text-xs text-amber-600 ml-1">(Low)</span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-green-600">
                        {formatCurrency(product.price)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(product.status)}
                      </TableCell>
                      <TableCell className="text-gray-600">{product.supplier}</TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            onClick={() => onProductSelect(product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800 hover:bg-green-50">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="text-sm text-gray-600 text-center">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  );
};

export default ProductList;
