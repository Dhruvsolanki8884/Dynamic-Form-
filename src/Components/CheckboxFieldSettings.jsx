import React from "react";
import { X } from 'lucide-react';

const CheckboxFieldSettings = ({ field, onUpdate }) => {
  const handleUpdate = (updates) => {
    onUpdate({ ...field, ...updates });
  };

  const handleAddOption = () => {
    const newOptions = [...field.options, `Option ${field.options.length + 1}`];
    handleUpdate({ options: newOptions });
  };

  const handleRemoveOption = (index) => {
    const newOptions = field.options.filter((_, i) => i !== index);
    handleUpdate({ options: newOptions });
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...field.options];
    newOptions[index] = e.target.value;
    handleUpdate({ options: newOptions });
  };

  return (
    <div>
      {/* Label Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Field Label
        </label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => handleUpdate({ label: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Data Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Data Name</label>
        <input
          type="text"
          value={field.dataName}
          onChange={(e) => handleUpdate({ dataName: e.target.value })}
          placeholder="Used for data storage"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">Used for data storage and API integration</p>
      </div>

      {/* Required Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Required Field</label>
          <p className="text-xs text-gray-500 mt-0.5">Make this question required</p>
        </div>
        <button
          onClick={() => handleUpdate({ isRequired: !field.isRequired })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${field.isRequired ? "bg-blue-600" : "bg-gray-200"}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${field.isRequired ? "translate-x-6" : "translate-x-1"}`}
          />
        </button>
      </div>

      {/* Options Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Options</h3>
        {field.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input type="checkbox" className="form-checkbox text-blue-600" disabled />
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e, index)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleRemoveOption(index)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          onClick={handleAddOption}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 mt-2"
        >
          <span className="text-lg">+</span>
          <span>Add Option</span>
        </button>
      </div>
    </div>
  );
};

export default CheckboxFieldSettings;