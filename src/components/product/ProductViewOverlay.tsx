import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from '@/types/product';
import { Package, DollarSign, Users, Calendar, AlertTriangle } from 'lucide-react';
interface ProductViewOverlayProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const ProductViewOverlay = ({
  product,
  open,
  onOpenChange
}: ProductViewOverlayProps) => {
  if (!product) return null;
  const isLowStock = product.stock <= product.safetyStock;
  const margin = product.price - product.cost;
  const marginPercent = (margin / product.price * 100).toFixed(1);
  return <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[800px] sm:w-[900px] max-w-[90vw] rounded-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {product.name}
          </SheetTitle>
          <SheetDescription>
            Product details and inventory information
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Product Image */}
          <Card>
            <CardContent className="p-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <img src={`https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=300&fit=crop`} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">SKU</label>
                  <p className="font-mono text-sm">{product.sku}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <p>{product.category}</p>
              </div>
              {product.description && <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="text-sm">{product.description}</p>
                </div>}
              {product.supplier && <div>
                  <label className="text-sm font-medium text-muted-foreground">Supplier</label>
                  <p>{product.supplier}</p>
                </div>}
            </CardContent>
          </Card>

          {/* Inventory Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-4 w-4" />
                Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Stock</label>
                  <p className={`text-lg font-semibold ${isLowStock ? 'text-destructive' : 'text-foreground'}`}>
                    {product.stock} {product.primaryUOM.symbol}
                    {isLowStock && <AlertTriangle className="inline h-4 w-4 ml-1 text-destructive" />}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Safety Stock</label>
                  <p className="text-lg font-semibold">{product.safetyStock} {product.primaryUOM.symbol}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Primary UOM</label>
                <p>{product.primaryUOM.name} ({product.primaryUOM.symbol})</p>
              </div>
              {isLowStock && <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">Low Stock Warning</span>
                  </div>
                  <p className="text-sm text-destructive/80 mt-1">
                    Current stock is at or below safety stock level
                  </p>
                </div>}
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Selling Price</label>
                  <p className="text-lg font-semibold">¥{product.price.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cost</label>
                  <p className="text-lg font-semibold">¥{product.cost.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Margin</label>
                  <p className="text-lg font-semibold text-primary">¥{margin.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Margin %</label>
                  <p className="text-lg font-semibold text-primary">{marginPercent}%</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Total Stock Value</label>
                <p className="text-lg font-semibold">¥{(product.price * product.stock).toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                  <p className="text-sm">{new Date(product.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                  <p className="text-sm">{new Date(product.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              {product.uoms && product.uoms.length > 0 && <div>
                  <label className="text-sm font-medium text-muted-foreground">Available UOMs</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.uoms.map(uom => <Badge key={uom.id} variant="outline" className="text-xs">
                        {uom.name} {uom.isDefault && '(Default)'}
                      </Badge>)}
                  </div>
                </div>}
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>;
};
export default ProductViewOverlay;