
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Download, Upload, Eye, AlertTriangle } from 'lucide-react';
import { Product, UOM, Category, ProductUOM } from '@/types/product';
import ColumnCustomizer, { ColumnConfig } from './ColumnCustomizer';

interface ProductListProps {
  products: Product[];
  categories: Category[];
  systemUOMs: UOM[];
  onProductSelect: (product: Product) => void;
  onBatchSelect: (productIds: string[]) => void;
}

const ProductList = ({ products, categories, systemUOMs, onProductSelect, onBatchSelect }: ProductListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Column configuration
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { key: 'checkbox', label: 'Select', visible: true, order: 0 },
    { key: 'sku', label: 'SKU', visible: true, order: 1 },
    { key: 'name', label: 'Product Name', visible: true, order: 2 },
    { key: 'category', label: 'Category', visible: true, order: 3 },
    { key: 'stock', label: 'Stock', visible: true, order: 4 },
    { key: 'status', label: 'Status', visible: true, order: 5 },
    { key: 'price', label: 'Price', visible: true, order: 6 },
    { key: 'primaryUOM', label: 'Primary UOM', visible: true, order: 7 },
    { key: 'cost', label: 'Cost', visible: false, order: 8 },
    { key: 'supplier', label: 'Supplier', visible: false, order: 9 },
    { key: 'safetyStock', label: 'Safety Stock', visible: false, order: 10 },
    { key: 'createdAt', label: 'Created Date', visible: false, order: 11 },
    { key: 'actions', label: 'Actions', visible: true, order: 12 }
  ]);

  const handleProductSelect = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSupplier = !selectedSupplier || product.supplier === selectedSupplier;
    
    return matchesSearch && matchesCategory && matchesSupplier;
  });

  React.useEffect(() => {
    onBatchSelect(selectedProducts);
  }, [selectedProducts, onBatchSelect]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      active: 'default',
      inactive: 'secondary',
      archived: 'outline'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const isLowStock = (product: Product) => product.stock <= product.safetyStock;

  const handleColumnsChange = (newColumns: ColumnConfig[]) => {
    setColumns(newColumns);
  };

  const visibleColumns = columns.filter(col => col.visible).sort((a, b) => a.order - b.order);

  const renderTableCell = (column: ColumnConfig, product: Product) => {
    switch (column.key) {
      case 'checkbox':
        return (
          <TableCell onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={selectedProducts.includes(product.id)}
              onCheckedChange={() => handleProductSelect(product.id)}
            />
          </TableCell>
        );
      case 'sku':
        return <TableCell className="font-mono text-sm">{product.sku}</TableCell>;
      case 'name':
        return (
          <TableCell>
            <div className="flex items-center gap-2">
              {product.name}
              {isLowStock(product) && (
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              )}
            </div>
          </TableCell>
        );
      case 'category':
        return <TableCell>{product.category}</TableCell>;
      case 'stock':
        return (
          <TableCell>
            <span className={isLowStock(product) ? 'text-yellow-600 font-medium' : ''}>
              {product.stock}
            </span>
          </TableCell>
        );
      case 'status':
        return <TableCell>{getStatusBadge(product.status)}</TableCell>;
      case 'price':
        return <TableCell>¥{product.price.toFixed(2)}</TableCell>;
      case 'primaryUOM':
        return <TableCell>{product.primaryUOM.name}</TableCell>;
      case 'cost':
        return <TableCell>¥{product.cost.toFixed(2)}</TableCell>;
      case 'supplier':
        return <TableCell>{product.supplier || '-'}</TableCell>;
      case 'safetyStock':
        return <TableCell>{product.safetyStock}</TableCell>;
      case 'createdAt':
        return <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>;
      case 'actions':
        return (
          <TableCell onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </TableCell>
        );
      default:
        return <TableCell>-</TableCell>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Product List</CardTitle>
            <CardDescription>Manage your product inventory and information</CardDescription>
          </div>
          <div className="flex gap-2">
            <ColumnCustomizer
              columns={columns}
              onColumnsChange={handleColumnsChange}
            />
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Batch Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {selectedProducts.length > 0 ? (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm font-medium">
                      {selectedProducts.length} product(s) selected
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export Selected
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Batch Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search product name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Supplier</label>
                    <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Suppliers</SelectItem>
                        {Array.from(new Set(products.map(p => p.supplier))).map(supplier => (
                          <SelectItem key={supplier} value={supplier}>
                            {supplier}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableHead 
                    key={column.key} 
                    className={column.key === 'checkbox' ? 'w-12' : ''}
                  >
                    {column.key === 'checkbox' ? (
                      <Checkbox
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    ) : (
                      column.label
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow 
                  key={product.id}
                  className={`cursor-pointer hover:bg-gray-50 ${isLowStock(product) ? 'bg-yellow-50' : ''}`}
                  onClick={() => onProductSelect(product)}
                >
                  {visibleColumns.map((column) => 
                    renderTableCell(column, product)
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductList;
