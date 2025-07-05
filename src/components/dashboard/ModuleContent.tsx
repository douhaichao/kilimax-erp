import React from 'react';
import SalesOrderList from '@/pages/SalesOrderList';
import TransferOrderList from '@/pages/TransferOrderList';

interface ModuleContentProps {
  currentModule: string;
}

export const ModuleContent = ({ currentModule }: ModuleContentProps) => {
  switch (currentModule) {
    case 'sales-orders':
      return <SalesOrderList />;
    case 'transfer-orders':
      return <TransferOrderList />;
    case 'inventory-overview':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Stock Overview</h2>
          <p className="text-gray-600">Stock overview feature is under development...</p>
        </div>
      );
    case 'stock-adjustments':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Stock Adjustments</h2>
          <p className="text-gray-600">Stock adjustment feature is under development...</p>
        </div>
      );
    case 'purchase-orders':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Purchase Orders</h2>
          <p className="text-gray-600">Purchase order management feature is under development...</p>
        </div>
      );
    case 'inventory':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
          <p className="text-gray-600">Inventory management feature is under development...</p>
        </div>
      );
    case 'customers':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Customer Management</h2>
          <p className="text-gray-600">Customer management feature is under development...</p>
        </div>
      );
    case 'suppliers':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Supplier Management</h2>
          <p className="text-gray-600">Supplier management feature is under development...</p>
        </div>
      );
    case 'finance':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Financial Management</h2>
          <p className="text-gray-600">Financial management feature is under development...</p>
        </div>
      );
    case 'reports':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Report Analysis</h2>
          <p className="text-gray-600">Report analysis feature is under development...</p>
        </div>
      );
    default:
      return null;
  }
};