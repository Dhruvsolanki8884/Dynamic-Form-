import React from "react";
import { Circle } from 'lucide-react';

const FieldDisplay = ({ field, onSelect, isSelected, onFormChange }) => {
  const renderFieldInput = () => {
    switch (field.type) {
      case "input":
        return (
          <input
            type={field.inputType || 'text'}
            className="w-full p-2 border rounded"
            placeholder={field.placeholder}
            onChange={(e) => onFormChange(e, field.dataName)}
          />
        );
      case "checkbox":
        return (
          <div className="flex flex-col space-y-2">
            {field.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600"
                  onChange={(e) => onFormChange(e, `${field.dataName}_${index}`)}
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      case "radio":
        return (
          <div className="flex flex-col space-y-2">
            {field.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.dataName}
                  className="form-radio text-blue-600"
                  value={option}
                  onChange={(e) => onFormChange(e, field.dataName)}
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      case "dropdown":
        return (
          <select 
            className="w-full p-2 border rounded"
            onChange={(e) => onFormChange(e, field.dataName)}
          >
            {field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-sm border ${isSelected ? "border-blue-500" : "border-gray-200"} cursor-pointer`}
      onClick={() => onSelect(field)}
    >
      <div className="flex items-center justify-between mb-2">
        <label className="block text-md font-medium text-gray-700">
          {field.label} {field.isRequired && <span className="text-red-500">*</span>}
        </label>
      </div>
      {renderFieldInput()}
    </div>
  );
};

export default FieldDisplay;