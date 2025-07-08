
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Eye, Edit, Trash2, Download, Upload, Calendar, AlertTriangle, CheckCircle, XCircle, Printer } from 'lucide-react';
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

  const exportToCSV = () => {
    const headers = ['Quotation Number', 'Customer', 'Amount', 'Sales Rep', 'Status', 'Valid Until', 'Date'];
    const csvContent = [
      headers.join(','),
      ...quotations.map(quotation => [
        quotation.quotationNumber,
        quotation.customer,
        quotation.amount,
        quotation.salesperson,
        quotation.status,
        quotation.validUntil,
        quotation.quotationDate
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotations.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      const importedQuotations = lines.slice(1).filter(line => line.trim()).map((line, index) => {
        const values = line.split(',');
        return {
          id: `imported-${Date.now()}-${index}`,
          quotationNumber: values[0] || `QUO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          customer: values[1] || 'Unknown Customer',
          amount: parseFloat(values[2]) || 0,
          salesperson: values[3] || 'Unknown Rep',
          status: (values[4] as 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired') || 'draft',
          validUntil: values[5] || '',
          quotationDate: values[6] || new Date().toISOString().split('T')[0],
          items: [],
          notes: '',
          attachments: []
        };
      });

      setQuotations(prev => [...prev, ...importedQuotations]);
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quotations</h2>
          <p className="text-gray-600">Manage and track quotations</p>
        </div>
        <div className="flex space-x-2">
          <input
            type="file"
            accept=".csv"
            onChange={handleImportCSV}
            className="hidden"
            id="csv-import"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('csv-import')?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={handleCreateQuotation}>
            <Plus className="mr-2 h-4 w-4" />
            New Quotation
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground font-medium">Total Quotations</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.sent}</div>
              <div className="text-sm text-muted-foreground font-medium">Sent Quotations</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.accepted}</div>
              <div className="text-sm text-muted-foreground font-medium">Accepted</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {formatCurrency(stats.totalValue)}
              </div>
              <div className="text-sm text-muted-foreground font-medium">Total Value</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter / Batch Operations */}
      {selectedQuotations.length > 0 ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedQuotations.length === filteredQuotations.length && filteredQuotations.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">
                  {selectedQuotations.length} quotation(s) selected
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkStatusUpdate('sent')}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Sent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkStatusUpdate('accepted')}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Accepted
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.print()}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Selected
                </Button>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search quotations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
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
      )}

      {/* Quotations Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
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
                  <TableHead>Amount</TableHead>
                  <TableHead>Sales Rep</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotations.map((quotation) => (
                  <TableRow key={quotation.id} className="hover:bg-muted/50">
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
                    <TableCell className="font-medium">{quotation.customer}</TableCell>
                    <TableCell className="font-bold">
                      {formatCurrency(quotation.amount)}
                    </TableCell>
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
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotationList;
