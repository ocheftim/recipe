import React, { useState, useMemo } from 'react';

const SupplierManager = ({ isOpen, onClose, suppliers = [], onSave, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentTerms: 'Net 30',
    deliverySchedule: '',
    isActive: true,
    notes: ''
  });
  const [showForm, setShowForm] = useState(false);

  // Filter suppliers based on search
  const filteredSuppliers = useMemo(() => {
    if (!searchTerm) return suppliers;
    return suppliers.filter(supplier => {
      const name = supplier.companyName || supplier.name || '';
      const contact = supplier.contactName || '';
      const email = supplier.email || '';
      return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
             email.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [suppliers, searchTerm]);

  const resetForm = () => {
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      paymentTerms: 'Net 30',
      deliverySchedule: '',
      isActive: true,
      notes: ''
    });
    setEditingSupplier(null);
    setShowForm(false);
  };

  const handleEdit = (supplier) => {
    setFormData({
      companyName: supplier.companyName || supplier.name || '',
      contactName: supplier.contactName || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      address: supplier.address || '',
      city: supplier.city || '',
      state: supplier.state || '',
      zipCode: supplier.zipCode || '',
      paymentTerms: supplier.paymentTerms || 'Net 30',
      deliverySchedule: supplier.deliverySchedule || '',
      isActive: supplier.isActive !== false,
      notes: supplier.notes || ''
    });
    setEditingSupplier(supplier);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.companyName.trim()) {
      alert('Company name is required');
      return;
    }

    const supplierData = {
      ...formData,
      id: editingSupplier?.id || Date.now().toString(),
      name: formData.companyName, // For compatibility
    };

    onSave(supplierData);
    resetForm();
  };

  const handleDelete = (supplier) => {
    if (window.confirm(`Are you sure you want to delete ${supplier.companyName || supplier.name}?`)) {
      onDelete(supplier.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflow: 'hidden',
        border: '1px solid #BBBFC2',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid #E6E9EB'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#1F2D38',
            margin: 0
          }}>
            Supplier Manager
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#BBBFC2',
              padding: '4px'
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {!showForm ? (
            // Supplier List View
            <>
              {/* Toolbar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                gap: '16px'
              }}>
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #BBBFC2',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                <button
                  onClick={() => setShowForm(true)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#8AC732',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Add Supplier
                </button>
              </div>

              {/* Suppliers List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredSuppliers.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: '#BBBFC2'
                  }}>
                    {suppliers.length === 0 ? 'No suppliers added yet' : 'No suppliers match your search'}
                  </div>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <div key={supplier.id} style={{
                      border: '1px solid #E6E9EB',
                      borderRadius: '8px',
                      padding: '16px',
                      backgroundColor: '#FAFBFB'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <h3 style={{
                              fontSize: '18px',
                              fontWeight: '600',
                              color: '#1F2D38',
                              margin: 0
                            }}>
                              {supplier.companyName || supplier.name}
                            </h3>
                            {supplier.isActive === false && (
                              <span style={{
                                padding: '2px 8px',
                                backgroundColor: '#FFE5E5',
                                color: '#CC0000',
                                borderRadius: '4px',
                                fontSize: '12px'
                              }}>
                                Inactive
                              </span>
                            )}
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: '#556B7A' }}>
                            {supplier.contactName && (
                              <div><strong>Contact:</strong> {supplier.contactName}</div>
                            )}
                            {supplier.phone && (
                              <div><strong>Phone:</strong> {supplier.phone}</div>
                            )}
                            {supplier.email && (
                              <div><strong>Email:</strong> {supplier.email}</div>
                            )}
                            {supplier.paymentTerms && (
                              <div><strong>Terms:</strong> {supplier.paymentTerms}</div>
                            )}
                          </div>
                          
                          {supplier.address && (
                            <div style={{ marginTop: '8px', fontSize: '14px', color: '#556B7A' }}>
                              <strong>Address:</strong> {supplier.address}
                              {supplier.city && `, ${supplier.city}`}
                              {supplier.state && `, ${supplier.state}`}
                              {supplier.zipCode && ` ${supplier.zipCode}`}
                            </div>
                          )}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                          <button
                            onClick={() => handleEdit(supplier)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: '#FFFFFF',
                              color: '#8AC732',
                              border: '1px solid #8AC732',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(supplier)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: '#FFFFFF',
                              color: '#CC4125',
                              border: '1px solid #CC4125',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            // Add/Edit Form
            <>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1F2D38',
                  margin: 0
                }}>
                  {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
                </h3>
                <button
                  onClick={resetForm}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#BBBFC2',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1F2D38' }}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #BBBFC2',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1F2D38' }}>
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #BBBFC2',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1F2D38' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #BBBFC2',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1F2D38' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #BBBFC2',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1F2D38' }}>
                      Payment Terms
                    </label>
                    <select
                      value={formData.paymentTerms}
                      onChange={(e) => setFormData(prev => ({ ...prev, paymentTerms: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #BBBFC2',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="Net 30">Net 30</option>
                      <option value="Net 15">Net 15</option>
                      <option value="Net 60">Net 60</option>
                      <option value="COD">COD</option>
                      <option value="Prepaid">Prepaid</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1F2D38' }}>
                      Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #BBBFC2',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1F2D38' }}>
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #BBBFC2',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1F2D38' }}>
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #BBBFC2',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1F2D38' }}>
                        Zip Code
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #BBBFC2',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1F2D38' }}>
                      Delivery Schedule
                    </label>
                    <input
                      type="text"
                      value={formData.deliverySchedule}
                      onChange={(e) => setFormData(prev => ({ ...prev, deliverySchedule: e.target.value }))}
                      placeholder="e.g., Tuesdays & Fridays"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #BBBFC2',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1F2D38',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      />
                      Active Supplier
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#1F2D38' }}>
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #BBBFC2',
                        borderRadius: '8px',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                marginTop: '24px',
                paddingTop: '20px',
                borderTop: '1px solid #E6E9EB'
              }}>
                <button
                  onClick={resetForm}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#FFFFFF',
                    color: '#556B7A',
                    border: '1px solid #BBBFC2',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#8AC732',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierManager;