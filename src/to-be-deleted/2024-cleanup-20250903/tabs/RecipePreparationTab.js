// src/components/recipes/tabs/RecipePreparationTab.js
import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

const RecipePreparationTab = ({ 
  formData,
  onChange,
  theme 
}) => {
  const addPreparationStep = () => {
    const newStep = {
      id: Date.now(),
      step: (formData.preparationSteps?.length || 0) + 1,
      instruction: '',
      duration: '',
      critical: false
    };
    onChange('preparationSteps', [...(formData.preparationSteps || []), newStep]);
  };

  const updatePreparationStep = (index, field, value) => {
    const updated = [...(formData.preparationSteps || [])];
    updated[index][field] = value;
    onChange('preparationSteps', updated);
  };

  const removePreparationStep = (index) => {
    const updated = (formData.preparationSteps || []).filter((_, i) => i !== index);
    // Renumber steps
    updated.forEach((step, i) => {
      step.step = i + 1;
    });
    onChange('preparationSteps', updated);
  };

  const moveStep = (index, direction) => {
    const steps = [...(formData.preparationSteps || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < steps.length) {
      [steps[index], steps[newIndex]] = [steps[newIndex], steps[index]];
      // Renumber steps
      steps.forEach((step, i) => {
        step.step = i + 1;
      });
      onChange('preparationSteps', steps);
    }
  };

  const addCookingStep = () => {
    const newStep = {
      id: Date.now(),
      step: (formData.cookingSteps?.length || 0) + 1,
      instruction: '',
      temperature: '',
      duration: '',
      equipment: ''
    };
    onChange('cookingSteps', [...(formData.cookingSteps || []), newStep]);
  };

  const updateCookingStep = (index, field, value) => {
    const updated = [...(formData.cookingSteps || [])];
    updated[index][field] = value;
    onChange('cookingSteps', updated);
  };

  const removeCookingStep = (index) => {
    const updated = (formData.cookingSteps || []).filter((_, i) => i !== index);
    // Renumber steps
    updated.forEach((step, i) => {
      step.step = i + 1;
    });
    onChange('cookingSteps', updated);
  };

  const moveCookingStep = (index, direction) => {
    const steps = [...(formData.cookingSteps || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < steps.length) {
      [steps[index], steps[newIndex]] = [steps[newIndex], steps[index]];
      // Renumber steps
      steps.forEach((step, i) => {
        step.step = i + 1;
      });
      onChange('cookingSteps', steps);
    }
  };

  return (
    <div className="space-y-8">
      {/* Preparation Steps */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium" style={{ color: theme.charcoal }}>
            Preparation Steps
          </h3>
          <button
            type="button"
            onClick={addPreparationStep}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90"
            style={{ backgroundColor: theme.yellowGreen }}
          >
            <Plus size={16} />
            Add Step
          </button>
        </div>

        {(!formData.preparationSteps || formData.preparationSteps.length === 0) ? (
          <div className="text-center py-8 rounded-lg" style={{ backgroundColor: theme.seasalt }}>
            <p style={{ color: theme.silver }}>No preparation steps added yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.preparationSteps.map((step, index) => (
              <div key={step.id} className="flex gap-3 p-4 rounded-lg border" 
                   style={{ borderColor: theme.silver, backgroundColor: theme.white }}>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                       style={{ backgroundColor: theme.yellowGreen }}>
                    {step.step}
                  </div>
                  <div className="flex flex-col mt-2 gap-1">
                    <button
                      type="button"
                      onClick={() => moveStep(index, 'up')}
                      disabled={index === 0}
                      className={`p-1 rounded ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveStep(index, 'down')}
                      disabled={index === formData.preparationSteps.length - 1}
                      className={`p-1 rounded ${index === formData.preparationSteps.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex-grow space-y-2">
                  <textarea
                    value={step.instruction || ''}
                    onChange={(e) => updatePreparationStep(index, 'instruction', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: theme.silver,
                      backgroundColor: theme.white,
                      color: theme.gunmetal
                    }}
                    rows="2"
                    placeholder="Describe this preparation step..."
                  />
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={step.duration || ''}
                      onChange={(e) => updatePreparationStep(index, 'duration', e.target.value)}
                      className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: theme.silver,
                        backgroundColor: theme.white,
                        color: theme.gunmetal
                      }}
                      placeholder="Duration (e.g., 10 mins)"
                    />
                    
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={step.critical || false}
                        onChange={(e) => updatePreparationStep(index, 'critical', e.target.checked)}
                        style={{ accentColor: theme.yellowGreen }}
                      />
                      <span className="text-sm" style={{ color: theme.gunmetal }}>Critical Step</span>
                    </label>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => removePreparationStep(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cooking Steps */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium" style={{ color: theme.charcoal }}>
            Cooking Steps
          </h3>
          <button
            type="button"
            onClick={addCookingStep}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90"
            style={{ backgroundColor: theme.yellowGreen }}
          >
            <Plus size={16} />
            Add Step
          </button>
        </div>

        {(!formData.cookingSteps || formData.cookingSteps.length === 0) ? (
          <div className="text-center py-8 rounded-lg" style={{ backgroundColor: theme.seasalt }}>
            <p style={{ color: theme.silver }}>No cooking steps added yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {formData.cookingSteps.map((step, index) => (
              <div key={step.id} className="flex gap-3 p-4 rounded-lg border" 
                   style={{ borderColor: theme.silver, backgroundColor: theme.white }}>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                       style={{ backgroundColor: theme.charcoal }}>
                    {step.step}
                  </div>
                  <div className="flex flex-col mt-2 gap-1">
                    <button
                      type="button"
                      onClick={() => moveCookingStep(index, 'up')}
                      disabled={index === 0}
                      className={`p-1 rounded ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveCookingStep(index, 'down')}
                      disabled={index === formData.cookingSteps.length - 1}
                      className={`p-1 rounded ${index === formData.cookingSteps.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex-grow space-y-2">
                  <textarea
                    value={step.instruction || ''}
                    onChange={(e) => updateCookingStep(index, 'instruction', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: theme.silver,
                      backgroundColor: theme.white,
                      color: theme.gunmetal
                    }}
                    rows="2"
                    placeholder="Describe this cooking step..."
                  />
                  
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={step.temperature || ''}
                      onChange={(e) => updateCookingStep(index, 'temperature', e.target.value)}
                      className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: theme.silver,
                        backgroundColor: theme.white,
                        color: theme.gunmetal
                      }}
                      placeholder="Temperature"
                    />
                    
                    <input
                      type="text"
                      value={step.duration || ''}
                      onChange={(e) => updateCookingStep(index, 'duration', e.target.value)}
                      className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: theme.silver,
                        backgroundColor: theme.white,
                        color: theme.gunmetal
                      }}
                      placeholder="Duration"
                    />
                    
                    <input
                      type="text"
                      value={step.equipment || ''}
                      onChange={(e) => updateCookingStep(index, 'equipment', e.target.value)}
                      className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2"
                      style={{ 
                        borderColor: theme.silver,
                        backgroundColor: theme.white,
                        color: theme.gunmetal
                      }}
                      placeholder="Equipment"
                    />
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => removeCookingStep(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Plating Instructions */}
      <div>
        <label className="block text-lg font-medium mb-2" style={{ color: theme.charcoal }}>
          Plating Instructions
        </label>
        <textarea
          value={formData.platingInstructions || ''}
          onChange={(e) => onChange('platingInstructions', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{ 
            borderColor: theme.silver,
            backgroundColor: theme.white,
            color: theme.gunmetal
          }}
          rows="4"
          placeholder="Describe how to plate and present this dish..."
        />
      </div>

      {/* Chef's Notes */}
      <div>
        <label className="block text-lg font-medium mb-2" style={{ color: theme.charcoal }}>
          Chef's Notes
        </label>
        <textarea
          value={formData.chefNotes || ''}
          onChange={(e) => onChange('chefNotes', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{ 
            borderColor: theme.silver,
            backgroundColor: theme.white,
            color: theme.gunmetal
          }}
          rows="4"
          placeholder="Special tips, variations, or important notes..."
        />
      </div>

      {/* Equipment Required */}
      <div>
        <label className="block text-lg font-medium mb-2" style={{ color: theme.charcoal }}>
          Equipment Required
        </label>
        <input
          type="text"
          value={formData.equipment?.join(', ') || ''}
          onChange={(e) => onChange('equipment', e.target.value.split(',').map(item => item.trim()).filter(item => item))}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{ 
            borderColor: theme.silver,
            backgroundColor: theme.white,
            color: theme.gunmetal
          }}
          placeholder="List equipment separated by commas (e.g., Oven, Mixer, Grill)"
        />
      </div>

      {/* Storage Instructions */}
      <div>
        <label className="block text-lg font-medium mb-2" style={{ color: theme.charcoal }}>
          Storage Instructions
        </label>
        <textarea
          value={formData.storageInstructions || ''}
          onChange={(e) => onChange('storageInstructions', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{ 
            borderColor: theme.silver,
            backgroundColor: theme.white,
            color: theme.gunmetal
          }}
          rows="3"
          placeholder="How to store this recipe and for how long..."
        />
      </div>
    </div>
  );
};

export default RecipePreparationTab;