import React from "react";
import InputFieldSettings from "./InputFieldSettings.jsx";
import CheckboxFieldSettings from "./CheckboxFieldSettings.jsx";
import RadioFieldSettings from "./RadioFieldSettings.jsx";
import DropdownFieldSettings from "./DropdownFieldSettings.jsx";

const FieldSettings = ({ field, onUpdateField }) => {
  if (!field) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center text-gray-500">
        <h2 className="text-lg font-semibold mb-2">Select a field</h2>
        <p>Click on a field in the form preview to edit its settings.</p>
      </div>
    );
  }

  const renderSettings = (type) => {
    switch (type) {
      case "input":
        return <InputFieldSettings field={field} onUpdate={onUpdateField} />;
      case "checkbox":
        return <CheckboxFieldSettings field={field} onUpdate={onUpdateField} />;
      case "radio":
        return <RadioFieldSettings field={field} onUpdate={onUpdateField} />;
      case "dropdown":
        return <DropdownFieldSettings field={field} onUpdate={onUpdateField} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Field Settings</h2>
      {renderSettings(field.type)}
    </div>
  );
};

export default FieldSettings;