import React from "react";

function InputFieldSettings({ field, onUpdate }) {
  const handleUpdate = (updates) => {
    onUpdate({ ...field, ...updates });
  };

  return (
    <div>
      {/* Field Label */}
      <div className="mb-4">
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Data Name
        </label>
        <input
          type="text"
          value={field.dataName}
          onChange={(e) => handleUpdate({ dataName: e.target.value })}
          placeholder="Used for data storage"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Used for data storage and API integration
        </p>
      </div>

      {/* Input Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Input Type
        </label>
        <select
          value={field.inputType}
          onChange={(e) => handleUpdate({ inputType: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="password">Password</option>
        </select>
      </div>

      {/* Placeholder Text */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Placeholder Text
        </label>
        <input
          type="text"
          value={field.placeholder}
          onChange={(e) => handleUpdate({ placeholder: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Required Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Required Field
          </label>
          <p className="text-xs text-gray-500 mt-0.5">
            Make this question required
          </p>
        </div>
        <button
          onClick={() => handleUpdate({ isRequired: !field.isRequired })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            field.isRequired ? "bg-blue-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              field.isRequired ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default InputFieldSettings;
