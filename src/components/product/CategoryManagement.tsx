import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ChevronRight, ChevronDown, Folder, FolderOpen, Plus, Edit, Trash2, MoreVertical, Move } from 'lucide-react';
import { Category } from '@/types/product';

interface CategoryManagementProps {
  categories: Category[];
}

const CategoryManagement = ({ categories }: CategoryManagementProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['cat-1', 'cat-2', 'cat-3']);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryParent, setNewCategoryParent] = useState<string>('');

  const toggleExpanded = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddCategory = () => {
    // Here you would typically add to your backend
    console.log('Adding category:', { name: newCategoryName, parentId: newCategoryParent || undefined });
    setShowAddDialog(false);
    setNewCategoryName('');
    setNewCategoryParent('');
  };

  const handleEditCategory = () => {
    if (editingCategory) {
      // Here you would typically update your backend
      console.log('Editing category:', { ...editingCategory, name: newCategoryName });
      setShowEditDialog(false);
      setEditingCategory(null);
      setNewCategoryName('');
    }
  };

  const handleDeleteCategory = (category: Category) => {
    if (confirm(`Are you sure you want to delete "${category.name}"? This will affect ${category.productCount} products.`)) {
      // Here you would typically delete from your backend
      console.log('Deleting category:', category);
    }
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setShowEditDialog(true);
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories.includes(category.id);
    const hasChildren = category.children && category.children.length > 0;
    const isSelected = selectedCategory === category.id;

    return (
      <div key={category.id}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={`
                flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all
                ${isSelected ? 'bg-blue-100 border border-blue-300' : 'hover:bg-blue-50'}
              `}
              style={{ marginLeft: `${level * 24}px` }}
              onClick={() => setSelectedCategory(category.id)}
            >
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpanded(category.id);
                  }}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
              
              {!hasChildren && <div className="w-6" />}
              
              <div className="flex items-center space-x-2">
                {hasChildren ? (
                  isExpanded ? (
                    <FolderOpen className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Folder className="h-4 w-4 text-blue-600" />
                  )
                ) : (
                  <Folder className="h-4 w-4 text-gray-400" />
                )}
                
                <span className="font-medium text-blue-800">{category.name}</span>
                
                <Badge variant="outline" className="border-blue-300 text-blue-700">
                  {category.productCount}
                </Badge>
              </div>

              <div className="ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Additional actions
                  }}
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </ContextMenuTrigger>
          
          <ContextMenuContent>
            <ContextMenuItem onClick={() => {
              setNewCategoryParent(category.id);
              setShowAddDialog(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Subcategory
            </ContextMenuItem>
            <ContextMenuItem onClick={() => openEditDialog(category)}>
              <Edit className="h-4 w-4 mr-2" />
              Rename
            </ContextMenuItem>
            <ContextMenuItem>
              <Move className="h-4 w-4 mr-2" />
              Move
            </ContextMenuItem>
            <ContextMenuItem
              className="text-red-600"
              onClick={() => handleDeleteCategory(category)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        {hasChildren && isExpanded && (
          <div>
            {category.children!.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-blue-800">Category Management</h3>
          <p className="text-blue-600">Organize your products with drag & drop categories</p>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Category Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-blue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-blue-800">Category Hierarchy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map(category => renderCategory(category))}
              </div>
              
              <div className="mt-6 p-4 border-2 border-dashed border-blue-300 rounded-lg text-center text-blue-600">
                <Folder className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Drag categories here to reorder</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Details */}
        <div>
          <Card className="border-blue-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-blue-800">Category Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCategory ? (
                <div className="space-y-4">
                  {(() => {
                    const category = categories.find(c => c.id === selectedCategory) ||
                                   categories.flatMap(c => c.children || []).find(c => c.id === selectedCategory);
                    
                    if (!category) return <p className="text-gray-500">Category not found</p>;
                    
                    return (
                      <>
                        <div>
                          <Label className="text-blue-800 font-medium">Name</Label>
                          <p className="mt-1 p-2 bg-gray-50 rounded">{category.name}</p>
                        </div>
                        
                        <div>
                          <Label className="text-blue-800 font-medium">Product Count</Label>
                          <p className="mt-1 text-2xl font-bold text-blue-600">{category.productCount}</p>
                        </div>
                        
                        <div>
                          <Label className="text-blue-800 font-medium">Type</Label>
                          <p className="mt-1 p-2 bg-gray-50 rounded">
                            {category.parentId ? 'Subcategory' : 'Main Category'}
                          </p>
                        </div>
                        
                        <div className="space-y-2 pt-4">
                          <Button
                            variant="outline"
                            className="w-full border-blue-300 text-blue-700"
                            onClick={() => openEditDialog(category)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Category
                          </Button>
                          
                          <Button
                            variant="outline"
                            className="w-full border-red-300 text-red-700"
                            onClick={() => handleDeleteCategory(category)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Category
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Select a category to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Quick Stats */}
          <Card className="border-blue-200 shadow-sm mt-6">
            <CardHeader>
              <CardTitle className="text-blue-800">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Categories</span>
                  <span className="font-medium">{categories.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subcategories</span>
                  <span className="font-medium">
                    {categories.reduce((sum, cat) => sum + (cat.children?.length || 0), 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Products</span>
                  <span className="font-medium">
                    {categories.reduce((sum, cat) => sum + cat.productCount + 
                      (cat.children?.reduce((childSum, child) => childSum + child.productCount, 0) || 0), 0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-blue-800">Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="categoryName" className="text-blue-800 font-medium">Category Name</Label>
              <Input
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="mt-2 border-blue-200 focus:border-blue-400"
              />
            </div>
            
            {newCategoryParent && (
              <div>
                <Label className="text-blue-800 font-medium">Parent Category</Label>
                <p className="mt-2 p-2 bg-gray-50 rounded">
                  {categories.find(c => c.id === newCategoryParent)?.name}
                </p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddDialog(false);
                  setNewCategoryName('');
                  setNewCategoryParent('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Category
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-blue-800">Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editCategoryName" className="text-blue-800 font-medium">Category Name</Label>
              <Input
                id="editCategoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="mt-2 border-blue-200 focus:border-blue-400"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditDialog(false);
                  setEditingCategory(null);
                  setNewCategoryName('');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditCategory}
                disabled={!newCategoryName.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManagement;
