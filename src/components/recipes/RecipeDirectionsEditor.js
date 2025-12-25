// RecipeDirectionsEditor.js - Professional Recipe Directions Management
import React, { useState, useEffect } from 'react';

const THEME = {
  primary: '#1F2D38',
  secondary: '#6B7280',
  background: '#FFFFFF',
  lightBackground: '#FAFAFA',
  accent: '#8AC732',
  border: '#E5E7EB',
  subtleBorder: '#F6F8F8',
  statusActive: '#8AC732',
  statusPending: '#F59E0B',
  statusInactive: '#E5E7EB',
  statusError: '#EF4444',
  statusInfo: '#3B82F6'
};

// Common cooking equipment
const EQUIPMENT = [
  'Oven', 'Stovetop', 'Grill', 'Fryer', 'Steamer', 'Sous Vide',
  'Stand Mixer', 'Food Processor', 'Blender', 'Immersion Blender',
  'Sheet Pan', 'Sauté Pan', 'Stock Pot', 'Dutch Oven', 'Cast Iron Skillet',
  'Cutting Board', 'Chef Knife', 'Thermometer', 'Scale', 'Timer'
];

// Common cooking techniques
const TECHNIQUES = [
  'Sauté', 'Roast', 'Bake', 'Broil', 'Grill', 'Steam', 'Poach', 'Braise',
  'Blanch', 'Caramelize', 'Deglaze', 'Emulsify', 'Fold', 'Julienne', 'Mince',
  'Proof', 'Reduce', 'Sear', 'Simmer', 'Temper', 'Whisk', 'Zest'
];

// Step types
const STEP_TYPES = {
  PREP: { label: 'Prep', color: THEME.statusInfo },
  COOK: { label: 'Cook', color: THEME.statusPending },
  ASSEMBLY: { label: 'Assembly', color: THEME.statusActive },
  FINISHING: { label: 'Finishing', color: THEME.primary },
  HOLD: { label: 'Hold', color: THEME.secondary }
};

const RecipeDirectionsEditor = ({ 
  directions = [], 
  onChange,
  ingredients = [], // To reference ingredients in steps
  readOnly = false,
  showTimeline = true 
}) => {
  const [localDirections, setLocalDirections] = useState([]);
  const [expandedSteps, setExpandedSteps] = useState({});
  const [viewMode, setViewMode] = useState('detailed'); // 'detailed' or 'simple'
  const [showEquipmentList, setShowEquipmentList] = useState(false);

  // Initialize with passed directions or empty step
  useEffect(() => {
    if (directions.length > 0) {
      setLocalDirections(directions.map((dir, index) => ({
        ...dir,
        id: dir.id || Math.random().toString(36).substr(2, 9),
        stepNumber: index + 1
      })));
    } else {
      setLocalDirections([createEmptyStep(1)]);
    }
  }, [directions]);

  // Create empty step
  const createEmptyStep = (stepNumber) => ({
    id: Math.random().toString(36).substr(2, 9),
    stepNumber,
    instruction: '',
    timeMinutes: 0,
    temperature: '',
    equipment: [],
    techniques: [],
    type: 'PREP',
    criticalControl: false,
    criticalNote: '',
    canParallel: false,
    parallelWith: [],
    ingredients: [],
    imageUrl: '',
    videoUrl: '',
    tips: ''
  });

  // Update step
  const updateStep = (id, field, value) => {
    const updated = localDirections.map(step => {
      if (step.id === id) {
        return { ...step, [field]: value };
      }
      return step;
    });
    
    setLocalDirections(updated);
    onChange?.(updated);
  };

  // Add new step
  const addStep = (afterId = null) => {
    const newStepNumber = localDirections.length + 1;
    const newStep = createEmptyStep(newStepNumber);
    let updated;
    
    if (afterId) {
      const index = localDirections.findIndex(step => step.id === afterId);
      updated = [...localDirections];
      updated.splice(index + 1, 0, newStep);
      // Renumber steps
      updated = updated.map((step, idx) => ({ ...step, stepNumber: idx + 1 }));
    } else {
      updated = [...localDirections, newStep];
    }
    
    setLocalDirections(updated);
    onChange?.(updated);
  };

  // Remove step
  const removeStep = (id) => {
    if (localDirections.length <= 1) return; // Keep at least one step
    
    let updated = localDirections.filter(step => step.id !== id);
    // Renumber steps
    updated = updated.map((step, idx) => ({ ...step, stepNumber: idx + 1 }));
    
    setLocalDirections(updated);
    onChange?.(updated);
  };

  // Duplicate step
  const duplicateStep = (id) => {
    const toDuplicate = localDirections.find(step => step.id === id);
    if (!toDuplicate) return;
    
    const index = localDirections.findIndex(step => step.id === id);
    const duplicate = {
      ...toDuplicate,
      id: Math.random().toString(36).substr(2, 9),
      instruction: `${toDuplicate.instruction} (copy)`
    };
    
    let updated = [...localDirections];
    updated.splice(index + 1, 0, duplicate);
    // Renumber steps
    updated = updated.map((step, idx) => ({ ...step, stepNumber: idx + 1 }));
    
    setLocalDirections(updated);
    onChange?.(updated);
  };

  // Move step
  const moveStep = (id, direction) => {
    const index = localDirections.findIndex(step => step.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= localDirections.length) return;
    
    let updated = [...localDirections];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    // Renumber steps
    updated = updated.map((step, idx) => ({ ...step, stepNumber: idx + 1 }));
    
    setLocalDirections(updated);
    onChange?.(updated);
  };

  // Calculate total time
  const calculateTotalTime = () => {
    // For sequential steps
    const sequentialTime = localDirections
      .filter(step => !step.canParallel)
      .reduce((sum, step) => sum + (parseInt(step.timeMinutes) || 0), 0);
    
    // For parallel steps, take the longest
    const parallelGroups = {};
    localDirections
      .filter(step => step.canParallel)
      .forEach(step => {
        const groupKey = step.parallelWith.join(',') || step.id;
        if (!parallelGroups[groupKey]) parallelGroups[groupKey] = [];
        parallelGroups[groupKey].push(parseInt(step.timeMinutes) || 0);
      });
    
    const parallelTime = Object.values(parallelGroups)
      .map(group => Math.max(...group))
      .reduce((sum, time) => sum + time, 0);
    
    return sequentialTime + parallelTime;
  };

  // Get all equipment needed
  const getAllEquipment = () => {
    const equipment = new Set();
    localDirections.forEach(step => {
      (step.equipment || []).forEach(item => equipment.add(item));
    });
    return Array.from(equipment);
  };

  // Format time display
  const formatTime = (minutes) => {
    if (!minutes) return '—';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
  };

  // Render detailed step
  const renderDetailedStep = (step, index) => {
    const isExpanded = expandedSteps[step.id];
    
    return (
      <div
        key={step.id}
        style={{
          marginBottom: '16px',
          border: `1px solid ${step.criticalControl ? THEME.statusError : THEME.border}`,
          borderRadius: '4px',
          backgroundColor: THEME.background,
          overflow: 'hidden'
        }}
      >
        {/* Step Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: readOnly ? '50px 1fr 100px 100px' : '40px 50px 1fr 100px 100px 120px',
          gap: '12px',
          padding: '12px',
          backgroundColor: step.criticalControl ? '#FEF2F2' : THEME.lightBackground,
          borderBottom: `1px solid ${THEME.border}`,
          alignItems: 'center'
        }}>
          {!readOnly && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <button
                onClick={() => moveStep(step.id, 'up')}
                disabled={index === 0}
                style={{
                  padding: '2px',
                  fontSize: '10px',
                  border: 'none',
                  background: 'transparent',
                  cursor: index === 0 ? 'not-allowed' : 'pointer',
                  opacity: index === 0 ? 0.3 : 1
                }}
              >
                ▲
              </button>
              <button
                onClick={() => moveStep(step.id, 'down')}
                disabled={index === localDirections.length - 1}
                style={{
                  padding: '2px',
                  fontSize: '10px',
                  border: 'none',
                  background: 'transparent',
                  cursor: index === localDirections.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: index === localDirections.length - 1 ? 0.3 : 1
                }}
              >
                ▼
              </button>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: STEP_TYPES[step.type]?.color || THEME.primary,
            color: THEME.background,
            fontWeight: '600',
            fontSize: '14px'
          }}>
            {step.stepNumber}
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', color: THEME.secondary, marginBottom: '2px' }}>
              {STEP_TYPES[step.type]?.label || 'Step'}
              {step.canParallel && ' • Can be done in parallel'}
              {step.criticalControl && ' • ⚠️ CRITICAL CONTROL POINT'}
            </div>
            <div style={{ fontSize: '13px', fontWeight: '500' }}>
              {step.instruction.substring(0, 100) || 'Enter instruction...'}
              {step.instruction.length > 100 && '...'}
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: THEME.secondary }}>Time</div>
            <div style={{ fontSize: '13px', fontWeight: '500' }}>
              {formatTime(step.timeMinutes)}
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: THEME.secondary }}>Temp</div>
            <div style={{ fontSize: '13px', fontWeight: '500' }}>
              {step.temperature || '—'}
            </div>
          </div>
          
          {!readOnly && (
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setExpandedSteps(prev => ({ ...prev, [step.id]: !prev[step.id] }))}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: `1px solid ${THEME.border}`,
                  borderRadius: '4px',
                  background: THEME.background,
                  cursor: 'pointer'
                }}
              >
                {isExpanded ? '▼' : '▶'}
              </button>
              <button
                onClick={() => duplicateStep(step.id)}
                title="Duplicate"
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: `1px solid ${THEME.border}`,
                  borderRadius: '4px',
                  background: THEME.background,
                  cursor: 'pointer'
                }}
              >
                ⊕
              </button>
              <button
                onClick={() => removeStep(step.id)}
                disabled={localDirections.length <= 1}
                title="Remove"
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: `1px solid ${THEME.border}`,
                  borderRadius: '4px',
                  background: THEME.background,
                  cursor: localDirections.length <= 1 ? 'not-allowed' : 'pointer',
                  opacity: localDirections.length <= 1 ? 0.3 : 1,
                  color: THEME.statusError
                }}
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Expanded Content */}
        {(isExpanded || readOnly) && (
          <div style={{ padding: '16px' }}>
            {/* Main Instruction */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                color: THEME.secondary,
                display: 'block',
                marginBottom: '4px'
              }}>
                Full Instruction
              </label>
              <textarea
                value={step.instruction}
                onChange={(e) => updateStep(step.id, 'instruction', e.target.value)}
                disabled={readOnly}
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '8px',
                  border: `1px solid ${THEME.border}`,
                  borderRadius: '4px',
                  fontSize: '13px',
                  resize: 'vertical'
                }}
                placeholder="Describe this step in detail..."
              />
            </div>

            {/* Time, Temperature, Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  color: THEME.secondary,
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Time (minutes)
                </label>
                <input
                  type="number"
                  value={step.timeMinutes}
                  onChange={(e) => updateStep(step.id, 'timeMinutes', e.target.value)}
                  disabled={readOnly}
                  style={{
                    width: '100%',
                    padding: '6px',
                    border: `1px solid ${THEME.border}`,
                    borderRadius: '4px',
                    fontSize: '13px'
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  color: THEME.secondary,
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Temperature
                </label>
                <input
                  type="text"
                  value={step.temperature}
                  onChange={(e) => updateStep(step.id, 'temperature', e.target.value)}
                  disabled={readOnly}
                  placeholder="350°F"
                  style={{
                    width: '100%',
                    padding: '6px',
                    border: `1px solid ${THEME.border}`,
                    borderRadius: '4px',
                    fontSize: '13px'
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  color: THEME.secondary,
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Step Type
                </label>
                <select
                  value={step.type}
                  onChange={(e) => updateStep(step.id, 'type', e.target.value)}
                  disabled={readOnly}
                  style={{
                    width: '100%',
                    padding: '6px',
                    border: `1px solid ${THEME.border}`,
                    borderRadius: '4px',
                    fontSize: '13px'
                  }}
                >
                  {Object.entries(STEP_TYPES).map(([key, type]) => (
                    <option key={key} value={key}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  color: THEME.secondary,
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Parallel Execution
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <input
                    type="checkbox"
                    checked={step.canParallel}
                    onChange={(e) => updateStep(step.id, 'canParallel', e.target.checked)}
                    disabled={readOnly}
                  />
                  <span style={{ fontSize: '12px' }}>Can run parallel</span>
                </div>
              </div>
            </div>

            {/* Equipment */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                color: THEME.secondary,
                display: 'block',
                marginBottom: '4px'
              }}>
                Equipment Required
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {EQUIPMENT.map(item => (
                  <label
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      backgroundColor: (step.equipment || []).includes(item) ? THEME.accent : THEME.lightBackground,
                      color: (step.equipment || []).includes(item) ? THEME.background : THEME.primary,
                      border: `1px solid ${THEME.border}`,
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: readOnly ? 'default' : 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={(step.equipment || []).includes(item)}
                      onChange={(e) => {
                        const equipment = e.target.checked
                          ? [...(step.equipment || []), item]
                          : (step.equipment || []).filter(eq => eq !== item);
                        updateStep(step.id, 'equipment', equipment);
                      }}
                      disabled={readOnly}
                      style={{ display: 'none' }}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* Techniques */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                color: THEME.secondary,
                display: 'block',
                marginBottom: '4px'
              }}>
                Techniques Used
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {TECHNIQUES.map(technique => (
                  <label
                    key={technique}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      backgroundColor: (step.techniques || []).includes(technique) ? THEME.statusInfo : THEME.lightBackground,
                      color: (step.techniques || []).includes(technique) ? THEME.background : THEME.primary,
                      border: `1px solid ${THEME.border}`,
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: readOnly ? 'default' : 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={(step.techniques || []).includes(technique)}
                      onChange={(e) => {
                        const techniques = e.target.checked
                          ? [...(step.techniques || []), technique]
                          : (step.techniques || []).filter(t => t !== technique);
                        updateStep(step.id, 'techniques', techniques);
                      }}
                      disabled={readOnly}
                      style={{ display: 'none' }}
                    />
                    {technique}
                  </label>
                ))}
              </div>
            </div>

            {/* Critical Control Point */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <input
                  type="checkbox"
                  checked={step.criticalControl}
                  onChange={(e) => updateStep(step.id, 'criticalControl', e.target.checked)}
                  disabled={readOnly}
                />
                <span style={{ fontSize: '12px', fontWeight: '600', color: THEME.statusError }}>
                  Critical Control Point (Food Safety)
                </span>
              </label>
              {step.criticalControl && (
                <textarea
                  value={step.criticalNote}
                  onChange={(e) => updateStep(step.id, 'criticalNote', e.target.value)}
                  disabled={readOnly}
                  placeholder="Describe the critical control requirement (e.g., Internal temp must reach 165°F)"
                  style={{
                    width: '100%',
                    minHeight: '60px',
                    padding: '8px',
                    border: `1px solid ${THEME.statusError}`,
                    borderRadius: '4px',
                    fontSize: '13px',
                    backgroundColor: '#FEF2F2'
                  }}
                />
              )}
            </div>

            {/* Tips & Notes */}
            <div>
              <label style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                color: THEME.secondary,
                display: 'block',
                marginBottom: '4px'
              }}>
                Tips & Notes
              </label>
              <textarea
                value={step.tips}
                onChange={(e) => updateStep(step.id, 'tips', e.target.value)}
                disabled={readOnly}
                placeholder="Any helpful tips, variations, or troubleshooting notes..."
                style={{
                  width: '100%',
                  minHeight: '60px',
                  padding: '8px',
                  border: `1px solid ${THEME.border}`,
                  borderRadius: '4px',
                  fontSize: '13px'
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render simple step (for simple view mode)
  const renderSimpleStep = (step, index) => (
    <div
      key={step.id}
      style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '12px',
        alignItems: 'flex-start'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '28px',
        height: '28px',
        borderRadius: '50%',
        backgroundColor: THEME.accent,
        color: THEME.background,
        fontWeight: '600',
        fontSize: '13px'
      }}>
        {step.stepNumber}
      </div>
      
      <div style={{ flex: 1 }}>
        <textarea
          value={step.instruction}
          onChange={(e) => updateStep(step.id, 'instruction', e.target.value)}
          disabled={readOnly}
          style={{
            width: '100%',
            minHeight: '60px',
            padding: '8px',
            border: `1px solid ${THEME.border}`,
            borderRadius: '4px',
            fontSize: '13px',
            resize: 'vertical'
          }}
          placeholder={`Step ${step.stepNumber}...`}
        />
      </div>
      
      {!readOnly && (
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => addStep(step.id)}
            title="Add step after"
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              border: `1px solid ${THEME.border}`,
              borderRadius: '4px',
              background: THEME.background,
              cursor: 'pointer'
            }}
          >
            +
          </button>
          <button
            onClick={() => removeStep(step.id)}
            disabled={localDirections.length <= 1}
            title="Remove"
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              border: `1px solid ${THEME.border}`,
              borderRadius: '4px',
              background: THEME.background,
              cursor: localDirections.length <= 1 ? 'not-allowed' : 'pointer',
              opacity: localDirections.length <= 1 ? 0.3 : 1,
              color: THEME.statusError
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{ 
          fontSize: '13px', 
          fontWeight: '600', 
          color: THEME.primary,
          margin: 0
        }}>
          Directions
        </h3>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: THEME.secondary }}>
            Total Time: {formatTime(calculateTotalTime())}
          </span>
          
          {!readOnly && (
            <>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: `1px solid ${THEME.border}`,
                  borderRadius: '4px'
                }}
              >
                <option value="simple">Simple View</option>
                <option value="detailed">Detailed View</option>
              </select>
              
              <button
                onClick={() => setShowEquipmentList(!showEquipmentList)}
                style={{
                  padding: '4px 12px',
                  fontSize: '12px',
                  border: `1px solid ${THEME.border}`,
                  borderRadius: '4px',
                  background: THEME.background,
                  cursor: 'pointer'
                }}
              >
                Equipment List
              </button>
              
              <button
                onClick={() => addStep()}
                style={{
                  padding: '4px 12px',
                  fontSize: '12px',
                  backgroundColor: THEME.accent,
                  color: THEME.background,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add Step
              </button>
            </>
          )}
        </div>
      </div>

      {/* Equipment List Modal */}
      {showEquipmentList && (
        <div style={{
          marginBottom: '16px',
          padding: '16px',
          backgroundColor: THEME.lightBackground,
          border: `1px solid ${THEME.border}`,
          borderRadius: '4px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <h4 style={{ fontSize: '12px', fontWeight: '600', margin: 0 }}>
              Equipment Required for Recipe
            </h4>
            <button
              onClick={() => setShowEquipmentList(false)}
              style={{
                padding: '2px 6px',
                fontSize: '14px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {getAllEquipment().length > 0 ? (
              getAllEquipment().map(item => (
                <span
                  key={item}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: THEME.background,
                    border: `1px solid ${THEME.border}`,
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                >
                  {item}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '12px', color: THEME.secondary }}>
                No equipment specified yet
              </span>
            )}
          </div>
        </div>
      )}

      {/* Timeline View (if enabled) */}
      {showTimeline && viewMode === 'detailed' && localDirections.length > 0 && (
        <div style={{
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: THEME.lightBackground,
          border: `1px solid ${THEME.border}`,
          borderRadius: '4px'
        }}>
          <h4 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '12px' }}>
            Process Timeline
          </h4>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {localDirections.map((step, index) => (
              <div
                key={step.id}
                style={{
                  minWidth: '120px',
                  padding: '8px',
                  backgroundColor: THEME.background,
                  border: `1px solid ${THEME.border}`,
                  borderRadius: '4px',
                  fontSize: '11px'
                }}
              >
                <div style={{
                  fontWeight: '600',
                  color: STEP_TYPES[step.type]?.color || THEME.primary,
                  marginBottom: '4px'
                }}>
                  Step {step.stepNumber}
                </div>
                <div style={{ color: THEME.secondary }}>
                  {formatTime(step.timeMinutes)}
                </div>
                {step.canParallel && (
                  <div style={{ color: THEME.statusInfo, marginTop: '4px' }}>
                    ⇄ Parallel
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Steps List */}
      <div>
        {viewMode === 'detailed' 
          ? localDirections.map((step, index) => renderDetailedStep(step, index))
          : localDirections.map((step, index) => renderSimpleStep(step, index))
        }
      </div>

      {/* Summary Footer */}
      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: THEME.lightBackground,
        borderRadius: '4px',
        border: `1px solid ${THEME.border}`
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: THEME.secondary, marginBottom: '4px' }}>
              TOTAL STEPS
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: THEME.primary }}>
              {localDirections.length}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '11px', color: THEME.secondary, marginBottom: '4px' }}>
              TOTAL TIME
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: THEME.primary }}>
              {formatTime(calculateTotalTime())}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '11px', color: THEME.secondary, marginBottom: '4px' }}>
              CRITICAL POINTS
            </div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: localDirections.filter(s => s.criticalControl).length > 0 ? THEME.statusError : THEME.primary 
            }}>
              {localDirections.filter(s => s.criticalControl).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDirectionsEditor;