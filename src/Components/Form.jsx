import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import Modal from "./Modal.jsx";
import FieldDisplay from "./FieldDisplay.jsx";
import FieldSettings from "./FieldSettings.jsx";
import FormPreview from "./FormPreview.jsx";
import { v4 as uuidv4 } from "uuid";

function Form() {
  const [showModal, setShowModal] = useState(false);
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState({});

  const handleAddField = (type) => {
    const newField = {
      id: uuidv4(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      dataName: `${type}_field_${Date.now()}`,
      isRequired: false,
      options:
        type === "radio" || type === "checkbox" || type === "dropdown"
          ? ["Option 1", "Option 2"]
          : null,
      placeholder: "Your answer",
      inputType: "text",
    };
    setFields((prev) => [...prev, newField]);
    setSelectedField(newField);
    setShowModal(false);
  };

  const handleSelectField = (field) => {
    setSelectedField(field);
  };

  const handleUpdateField = (updatedField) => {
    setFields(
      fields.map((field) =>
        field.id === updatedField.id ? updatedField : field
      )
    );
    setSelectedField(updatedField);
  };

  const handleFormSubmission = (data) => {
    const newErrors = {};
    let isValid = true;

    // Validation logic
    fields.forEach((field) => {
      const value = data[field.dataName];

      if (
        field.isRequired &&
        (!value || (Array.isArray(value) && value.length === 0))
      ) {
        newErrors[field.dataName] = `${field.label} is required.`;
        isValid = false;
      }

      if (field.inputType === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[field.dataName] = "Please enter a valid email address.";
        isValid = false;
      }

      if (field.inputType === "number" && value && isNaN(Number(value))) {
        newErrors[field.dataName] = "Please enter a valid number.";
        isValid = false;
      }

      if (field.inputType === "password" && value && value.length < 8) {
        newErrors[field.dataName] =
          "Password must be at least 8 characters long.";
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      const submission = {
        timestamp: new Date().toLocaleString(),
        formTitle,
        data,
      };
      setSubmittedData((prev) => [...prev, submission]);
      alert("Form submitted successfully!");
    }
  };

  return (
    <>
      <div className="border-2 border-gray-300 w-full max-w-6xl mx-auto my-4 md:my-10 p-2 md:p-5 flex flex-col rounded-lg">
        {/* Top bar for toggling views */}
        <div className="flex flex-wrap justify-center items-center space-x-2 md:space-x-4 mb-4">
          <button
            onClick={() => setIsEditMode(true)}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base ${
              isEditMode ? "bg-black text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Edit Form
          </button>
          <button
            onClick={() => setIsEditMode(false)}
            className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base ${
              !isEditMode ? "bg-black text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Preview
          </button>
        </div>

        {isEditMode ? (
          <div className="flex flex-col lg:flex-row">
            {/* Left side – form editor */}
            <div className="w-full lg:w-2/3 flex flex-col p-2 lg:p-4">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6">
                <input
                  type="text"
                  className="w-full text-xl md:text-3xl font-bold text-gray-800 mb-2 border-0 outline-none focus:border-b-2 focus:border-blue-500"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Form description (optional)"
                  className="w-full text-sm md:text-base text-gray-500 bg-transparent border-0 border-b border-gray-300 outline-none focus:border-b-2 focus:border-blue-500 pb-1"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                {fields.map((field) => (
                  <FieldDisplay
                    key={field.id}
                    field={field}
                    onSelect={handleSelectField}
                    isSelected={selectedField && selectedField.id === field.id}
                  />
                ))}
              </div>

              {/* Add Field button */}
              <div
                className="flex flex-col items-center justify-center p-10 md:p-20 m-4 md:m-10 bg-gray-50 rounded-lg shadow-inner cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-gray-100 rounded-full mb-2 md:mb-4 hover:bg-gray-300 transition-colors duration-200">
                  <PlusCircle size={40} className="text-gray-400" />
                </div>
                <h2 className="text-base md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                  Click to add your first field
                </h2>
              </div>
            </div>

            {/* Right side – settings */}
            <div className="w-full lg:w-1/3 p-2 lg:p-4 bg-gray-100 rounded-lg">
              <FieldSettings
                field={selectedField}
                onUpdateField={handleUpdateField}
              />
            </div>
          </div>
        ) : (
          /* Form Preview Mode */
          <FormPreview
            formTitle={formTitle}
            formDescription={formDescription}
            fields={fields}
            onSubmit={handleFormSubmission}
            submittedData={submittedData}
            errors={errors} // Pass errors here
          />
        )}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleAddField}
      />
    </>
  );
}

export default Form;
