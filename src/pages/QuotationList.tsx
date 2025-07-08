import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Eye, Edit, Trash2, Download, Send, Calendar, AlertTriangle } from 'lucide-react';
import { Quotation } from '@/types/quotation';
import { mockQuotations } from '@/data/mockQuotations';
import QuotationForm from '@/components/quotation/QuotationForm';
import QuotationDetail from '@/components/quotation/QuotationDetail';
import QuotationStatusBadge from '@/components/quotation/QuotationStatusBadge';

const QuotationList = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create' | 'edit'>('list');
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedQuotations, setSelectedQuotations] = useState<string[]>([]);

  useEffect(() => {
    setQuotations(mockQuotations);
  }, []);

  const filteredQuotations = quotations.filter(quotation => {
    const matchesSearch = quotation.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.salesperson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || quotation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateQuotation = () => {
    setSelectedQuotation(null);
    setCurrentView('create');
  };

  const handleViewQuotation = (quotation: Quotation) => {
    setSelectedQuotation(quotation);
    setCurrentView('detail');
  };

  const handleEditQuotation = (quotation: Quotation) => {
    setSelectedQuotation(quotation);
    setCurrentView('edit');
  };

  const handleDeleteQuotation = (quotationId: string) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      setQuotations(prev => prev.filter(q => q.id !== quotationId));
      if (currentView === 'detail' && selectedQuotation?.id === quotationId) {
        setCurrentView('list');
      }
    }
  };

  const handleSaveQuotation = (quotation: Quotation) => {
    if (currentView === 'create') {
      setQuotations(prev => [...prev, quotation]);
    } else if (currentView === 'edit') {
      setQuotations(prev => prev.map(q => q.id === quotation.id ? quotation : q));
    }
    setCurrentView('list');
  };

  const handleUpdateQuotation = (updatedQuotation: Quotation) => {
    setQuotations(prev => prev.map(q => q.id === updatedQuotation.id ? updatedQuotation : q));
    setSelectedQuotation(updatedQuotation);
  };

  const handleSelectQuotation = (quotationId: string, checked: boolean) => {
    setSelectedQuotations(prev => 
      checked 
        ? [...prev, quotationId]
        : prev.filter(id => id !== quotationId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedQuotations(checked ? filteredQuotations.map(q => q.id) : []);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedQuotations.length} quotation(s)?`)) {
      setQuotations(prev => prev.filter(q => !selectedQuotations.includes(q.id)));
      setSelectedQuotations([]);
    }
  };

  const handleBulkStatusUpdate = (newStatus: string) => {
    setQuotations(prev => prev.map(q => 
      selectedQuotations.includes(q.id) 
        ? { ...q, status: newStatus as any }
        : q
    ));
    setSelectedQuotations([]);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const isExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
  };

  const getStats = () => {
    const total = quotations.length;
    const draft = quotations.filter(q => q.status === 'draft').length;
    const sent = quotations.filter(q => q.status === 'sent').length;
    const accepted = quotations.filter(q => q.status === 'accepted').length;
    const expired = quotations.filter(q => isExpired(q.validUntil) && q.status !== 'accepted' && q.status !== 'rejected').length;
    const totalValue = quotations.reduce((sum, q) => sum + q.amount, 0);

    return { total, draft, sent, accepted, expired, totalValue };
  };

  const stats = getStats();

  if (currentView === 'create' || currentView === 'edit') {
    return (
      <QuotationForm
        quotation={currentView === 'edit' ? selectedQuotation! : undefined}
        onSave={handleSaveQuotation}
        onCancel={() => setCurrentView('list')}
      />
    );
  }

  if (currentView === 'detail' && selectedQuotation) {
    return (
      <QuotationDetail
        quotation={selectedQuotation}
        onUpdate={handleUpdateQuotation}
        onDelete={handleDeleteQuotation}
        onBack={() => setCurrentView('list')}
        onEdit={() => setCurrentView('edit')}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Quotation Management</h2>
          <p className="text-muted-foreground">Manage your sales quotations and track their status</p>
        </div>
        <Button onClick={handleCreateQuotation}>
          <Plus className="mr-2 h-4 w-4" />
          Create Quotation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draft}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accepted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.expired}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardContent className={`pt-6 ${selectedQuotations.length > 0 ? 'hidden' : ''}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quotations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        {/* Batch Operations Overlay */}
        {selectedQuotations.length > 0 && (
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">
                  {selectedQuotations.length} quotation(s) selected
                </span>
                <Select onValueChange={handleBulkStatusUpdate}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Mark as Draft</SelectItem>
                    <SelectItem value="sent">Mark as Sent</SelectItem>
                    <SelectItem value="accepted">Mark as Accepted</SelectItem>
                    <SelectItem value="rejected">Mark as Rejected</SelectItem>
                    <SelectItem value="expired">Mark as Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="destructive" onClick={handleBulkDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSelectedQuotations([])}
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Quotations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quotations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedQuotations.length === filteredQuotations.length && filteredQuotations.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Quotation #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Salesperson</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotations.map((quotation) => (
                <TableRow key={quotation.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedQuotations.includes(quotation.id)}
                      onCheckedChange={(checked) => handleSelectQuotation(quotation.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <span>{quotation.quotationNumber}</span>
                      {isExpired(quotation.validUntil) && quotation.status !== 'accepted' && quotation.status !== 'rejected' && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{quotation.customer}</TableCell>
                  <TableCell>{quotation.salesperson}</TableCell>
                  <TableCell>
                    <QuotationStatusBadge status={quotation.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className={isExpired(quotation.validUntil) && quotation.status !== 'accepted' && quotation.status !== 'rejected' ? 'text-orange-600' : ''}>
                        {quotation.validUntil}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(quotation.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewQuotation(quotation)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditQuotation(quotation)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuotation(quotation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotationList;