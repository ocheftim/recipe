// src/hooks/useInventoryData.js - COMPLETE FIXED VERSION
import { useState, useMemo, useEffect } from 'react';

// Sample inventory data
const SAMPLE_INVENTORY = [
  {
    id: 'inv-1',
    name: 'Beef Chuck Roast',
    code: 'BC001',
    category: 'Meat',
    supplier: 'Sysco Foods',
    currentStock: 45,
    unit: 'lbs',
    minStock: 20,
    maxStock: 100,
    costPerUnit: 4.55,
    lastReceived: '2025-08-14',
    lastOrdered: '2025-08-12',
    location: 'Walk-in Cooler A',
    status: 'In Stock',
    expirationDate: '2025-08-20',
    lotNumber: 'BC001-081425',
    receivedBy: 'John Smith'
  },
  {
    id: 'inv-2', 
    name: 'Fresh Carrots',
    code: 'CR002',
    category: 'Vegetables',
    supplier: 'Local Farm Co-op',
    currentStock: 8,
    unit: 'lbs',
    minStock: 15,
    maxStock: 50,
    costPerUnit: 2.30,
    lastReceived: '2025-08-13',
    lastOrdered: '2025-08-10',
    location: 'Walk-in Cooler B',
    status: 'Low Stock',
    expirationDate: '2025-08-18',
    lotNumber: 'CR002-081325',
    receivedBy: 'Maria Garcia'
  },
  {
    id: 'inv-3',
    name: 'Premium Olive Oil',
    code: 'OO005',
    category: 'Oils & Vinegars',
    supplier: 'Mediterranean Imports',
    currentStock: 0,
    unit: 'bottles',
    minStock: 5,
    maxStock: 24,
    costPerUnit: 12.80,
    lastReceived: '2025-08-05',
    lastOrdered: '2025-08-14',
    location: 'Dry Storage',
    status: 'Out of Stock',
    expirationDate: '2026-08-05',
    lotNumber: 'OO005-080525',
    receivedBy: 'David Chen'
  },
  {
    id: 'inv-4',
    name: 'Salmon Fillets',
    code: 'SF004', 
    category: 'Seafood',
    supplier: 'Pacific Fresh Fish',
    currentStock: 12,
    unit: 'lbs',
    minStock: 8,
    maxStock: 30,
    costPerUnit: 24.50,
    lastReceived: '2025-08-16',
    lastOrdered: '2025-08-15',
    location: 'Walk-in Freezer',
    status: 'In Stock',
    expirationDate: '2025-08-19',
    lotNumber: 'SF004-081625',
    receivedBy: 'John Smith'
  },
  {
    id: 'inv-5',
    name: 'Romaine Lettuce',
    code: 'RL006',
    category: 'Vegetables',
    supplier: 'Local Farm Co-op',
    currentStock: 25,
    unit: 'heads',
    minStock: 12,
    maxStock: 48,
    costPerUnit: 3.50,
    lastReceived: '2025-08-16',
    lastOrdered: '2025-08-14',
    location: 'Walk-in Cooler B',
    status: 'In Stock',
    expirationDate: '2025-08-20',
    lotNumber: 'RL006-081625',
    receivedBy: 'Maria Garcia'
  },
  {
    id: 'inv-6',
    name: 'Aged Parmesan',
    code: 'PC007',
    category: 'Dairy',
    supplier: 'Artisan Cheese Co',
    currentStock: 3,
    unit: 'lbs',
    minStock: 5,
    maxStock: 15,
    costPerUnit: 8.25,
    lastReceived: '2025-08-10',
    lastOrdered: '2025-08-15',
    location: 'Walk-in Cooler A',
    status: 'Low Stock',
    expirationDate: '2025-09-10',
    lotNumber: 'PC007-081025',
    receivedBy: 'David Chen'
  },
  {
    id: 'inv-7',
    name: 'Button Mushrooms',
    code: 'BM008',
    category: 'Vegetables',
    supplier: 'Local Farm Co-op',
    currentStock: 18,
    unit: 'lbs',
    minStock: 10,
    maxStock: 30,
    costPerUnit: 4.75,
    lastReceived: '2025-08-15',
    lastOrdered: '2025-08-13',
    location: 'Walk-in Cooler B',
    status: 'In Stock',
    expirationDate: '2025-08-22',
    lotNumber: 'BM008-081525',
    receivedBy: 'Maria Garcia'
  },
  {
    id: 'inv-8',
    name: 'Sea Salt',
    code: 'SS009',
    category: 'Seasonings',
    supplier: 'Gourmet Spice House',
    currentStock: 2,
    unit: 'containers',
    minStock: 3,
    maxStock: 12,
    costPerUnit: 6.50,
    lastReceived: '2025-08-01',
    lastOrdered: '2025-08-16',
    location: 'Dry Storage',
    status: 'Low Stock',
    expirationDate: '2027-08-01',
    lotNumber: 'SS009-080125',
    receivedBy: 'John Smith'
  }
];

// Sample suppliers for dropdown
const SUPPLIERS = [
  { id: 1, name: 'Sysco Foods', contact: 'sysco@email.com', phone: '555-0101' },
  { id: 2, name: 'Local Farm Co-op', contact: 'farms@email.com', phone: '555-0102' },
  { id: 3, name: 'Pacific Fresh Fish', contact: 'fish@email.com', phone: '555-0103' },
  { id: 4, name: 'Mediterranean Imports', contact: 'imports@email.com', phone: '555-0104' },
  { id: 5, name: 'Artisan Cheese Co', contact: 'cheese@email.com', phone: '555-0105' },
  { id: 6, name: 'Gourmet Spice House', contact: 'spices@email.com', phone: '555-0106' }
];

const useInventoryData = () => {
  // Core data state
  const [inventory, setInventory] = useState(SAMPLE_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  // View preferences with localStorage persistence
  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem('inventoryViewMode');
    return saved || 'list';
  });

  // Filter state
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [supplierFilter, setSupplierFilter] = useState('All');

  // Column management with localStorage
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const saved = localStorage.getItem('inventoryVisibleColumns');
    return saved ? JSON.parse(saved) : {
      name: true,
      code: true,
      category: true,
      supplier: true,
      currentStock: true,
      unit: true,
      status: true,
      costPerUnit: true,
      lastReceived: true,
      expirationDate: true,
      location: true
    };
  });

  const [columnOrder, setColumnOrder] = useState(() => {
    const saved = localStorage.getItem('inventoryColumnOrder');
    return saved ? JSON.parse(saved) : [
      'name',
      'code',
      'category',
      'supplier',
      'currentStock',
      'unit',
      'status',
      'costPerUnit',
      'lastReceived',
      'expirationDate',
      'location'
    ];
  });

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Modal state
  const [editingItem, setEditingItem] = useState(null);
  const [showReceivingModal, setShowReceivingModal] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('inventoryViewMode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem('inventoryVisibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  useEffect(() => {
    localStorage.setItem('inventoryColumnOrder', JSON.stringify(columnOrder));
  }, [columnOrder]);

  // Filtered and sorted inventory
  const filteredAndSortedInventory = useMemo(() => {
    let filtered = inventory.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      const matchesSupplier = supplierFilter === 'All' || item.supplier === supplierFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesSupplier;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle different data types
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [inventory, searchTerm, sortConfig, statusFilter, categoryFilter, supplierFilter]);

  // Statistics derived from data
  const stats = useMemo(() => {
    const totalItems = inventory.length;
    const inStock = inventory.filter(item => item.status === 'In Stock').length;
    const lowStock = inventory.filter(item => item.status === 'Low Stock').length;
    const outOfStock = inventory.filter(item => item.status === 'Out of Stock').length;
    
    const totalValue = inventory.reduce((sum, item) => 
      sum + (item.currentStock * item.costPerUnit), 0
    );

    // Items expiring soon (within 3 days)
    const today = new Date();
    const threeDaysFromNow = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));
    const expiringSoon = inventory.filter(item => {
      const expDate = new Date(item.expirationDate);
      return expDate <= threeDaysFromNow && expDate >= today;
    }).length;

    return {
      totalItems,
      inStock,
      lowStock,
      outOfStock,
      totalValue,
      expiringSoon
    };
  }, [inventory]);

  // Event handlers
  const handleSort = (key) => {
    setSortConfig(prevConfig => {
      if (prevConfig.key === key) {
        if (prevConfig.direction === 'asc') {
          return { key, direction: 'desc' };
        } else if (prevConfig.direction === 'desc') {
          return { key: null, direction: null };
        }
      }
      return { key, direction: 'asc' };
    });
  };

  const openItemModal = (item = null) => {
    const itemToEdit = item || {
      name: '',
      code: '',
      category: '',
      supplier: '',
      currentStock: 0,
      unit: '',
      minStock: 0,
      maxStock: 0,
      costPerUnit: 0,
      location: '',
      status: 'In Stock'
    };
    
    setEditingItem(itemToEdit);
  };

  const closeItemModal = () => {
    setEditingItem(null);
  };

  const handleItemAction = (action, item) => {
    switch (action) {
      case 'edit':
        openItemModal(item);
        break;
      case 'receive':
        setEditingItem(item);
        setShowReceivingModal(true);
        break;
      case 'adjust':
        setEditingItem(item);
        setShowAdjustmentModal(true);
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
          setInventory(prev => prev.filter(i => i.id !== item.id));
        }
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleItemSave = (savedItem) => {
    if (savedItem.id && inventory.find(i => i.id === savedItem.id)) {
      // Update existing item
      setInventory(prev => 
        prev.map(i => 
          i.id === savedItem.id ? savedItem : i
        )
      );
    } else {
      // Add new item
      const newItem = {
        ...savedItem,
        id: `inv-${Date.now()}`,
        lastReceived: new Date().toISOString().split('T')[0],
        receivedBy: 'Current User' // Replace with actual user
      };
      setInventory(prev => [...prev, newItem]);
    }
    closeItemModal();
  };

  const handleReceiveStock = (item, receivedQuantity, newCostPerUnit, expirationDate, lotNumber) => {
    setInventory(prev => 
      prev.map(i => 
        i.id === item.id 
          ? { 
              ...i, 
              currentStock: i.currentStock + receivedQuantity,
              costPerUnit: newCostPerUnit || i.costPerUnit,
              lastReceived: new Date().toISOString().split('T')[0],
              expirationDate: expirationDate || i.expirationDate,
              lotNumber: lotNumber || i.lotNumber,
              status: 'In Stock'
            }
          : i
      )
    );
    setShowReceivingModal(false);
    setEditingItem(null);
  };

  const handleStockAdjustment = (item, newQuantity, reason) => {
    setInventory(prev => 
      prev.map(i => 
        i.id === item.id 
          ? { 
              ...i, 
              currentStock: newQuantity,
              status: newQuantity === 0 ? 'Out of Stock' : 
                     newQuantity <= i.minStock ? 'Low Stock' : 'In Stock'
            }
          : i
      )
    );
    setShowAdjustmentModal(false);
    setEditingItem(null);
  };

  // ✅ FIXED: Get unique values for filters (supplier names, not objects)
  const categories = [...new Set(inventory.map(item => item.category))];
  const supplierNames = [...new Set(inventory.map(item => item.supplier))];
  const statuses = ['In Stock', 'Low Stock', 'Out of Stock'];

  return {
    // Data
    inventory: filteredAndSortedInventory,
    allInventory: inventory,
    suppliers: supplierNames, // ✅ FIXED: Return supplier names array
    supplierObjects: SUPPLIERS, // Keep original supplier objects if needed elsewhere
    categories,
    statuses,
    stats,
    
    // UI State
    searchTerm,
    setSearchTerm,
    viewMode,
    setViewMode,
    loading,
    setLoading,
    editingItem,
    sortConfig,
    
    // Filters
    statusFilter,
    setStatusFilter,
    categoryFilter, 
    setCategoryFilter,
    supplierFilter,
    setSupplierFilter,
    
    // Column management
    visibleColumns,
    setVisibleColumns,
    columnOrder,
    setColumnOrder,
    
    // Modal state
    showReceivingModal,
    setShowReceivingModal,
    showAdjustmentModal,
    setShowAdjustmentModal,
    
    // Actions
    handleSort,
    openItemModal,
    closeItemModal,
    handleItemAction,
    handleItemSave,
    handleReceiveStock,
    handleStockAdjustment
  };
};

export default useInventoryData;