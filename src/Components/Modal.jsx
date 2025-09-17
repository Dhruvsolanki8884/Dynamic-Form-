import React from "react";

const Modal = ({ show, onClose, onSelect }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Select a field to add
        </h3>
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => onSelect("input")}
            className="w-full text-left py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <span className="font-semibold">Input Field</span>
            <br />
            <span className="text-sm text-gray-500">Text, number, email, or password input</span>
          </button>
          <button
            onClick={() => onSelect("dropdown")}
            className="w-full text-left py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <span className="font-semibold">Dropdown</span>
            <br />
            <span className="text-sm text-gray-500">Select one option from a list</span>
          </button>
          <button
            onClick={() => onSelect("radio")}
            className="w-full text-left py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <span className="font-semibold">Radio Buttons</span>
            <br />
            <span className="text-sm text-gray-500">Select one option from multiple choices</span>
          </button>
          <button
            onClick={() => onSelect("checkbox")}
            className="w-full text-left py-2 px-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <span className="font-semibold">Checkbox</span>
            <br />
            <span className="text-sm text-gray-500">Select multiple options</span>
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;