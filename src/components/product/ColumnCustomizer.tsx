import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings2, GripVertical } from 'lucide-react';

export interface ColumnConfig {
  key: string;
  label: string;
  visible: boolean;
  order: number;
}

interface ColumnCustomizerProps {
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
}

const ColumnCustomizer = ({ columns, onColumnsChange }: ColumnCustomizerProps) => {
  const [localColumns, setLocalColumns] = useState<ColumnConfig[]>(columns);

  const handleColumnToggle = (columnKey: string) => {
    const updatedColumns = localColumns.map(col => 
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    );
    setLocalColumns(updatedColumns);
  };

  const handleApply = () => {
    onColumnsChange(localColumns);
  };

  const handleReset = () => {
    const resetColumns = columns.map(col => ({ ...col, visible: true }));
    setLocalColumns(resetColumns);
    onColumnsChange(resetColumns);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 className="h-4 w-4 mr-2" />
          Customize Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Customize Table Columns</h4>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset
            </Button>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {localColumns.map((column) => (
              <div key={column.key} className="flex items-center space-x-3">
                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                <Checkbox
                  id={column.key}
                  checked={column.visible}
                  onCheckedChange={() => handleColumnToggle(column.key)}
                />
                <Label 
                  htmlFor={column.key} 
                  className="flex-1 cursor-pointer text-sm"
                >
                  {column.label}
                </Label>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnCustomizer;