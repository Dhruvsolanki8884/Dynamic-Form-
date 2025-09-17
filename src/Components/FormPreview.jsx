// import React, { useState } from "react";

// const FormPreview = ({
//   formTitle,
//   formDescription,
//   fields,
//   onSubmit,
//   submittedData,
// }) => {
//   const [formData, setFormData] = useState({});

//   const handleFormChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setFormData({});
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-2 text-gray-800">{formTitle}</h1>
//       <p className="text-gray-500 mb-6">{formDescription}</p>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {fields.map((field) => (
//           <div key={field.id} className="bg-white p-6 rounded-lg shadow-md">
//             <label className="block text-md font-medium text-gray-700 mb-2">
//               {field.label}{" "}
//               {field.isRequired && <span className="text-red-500">*</span>}
//             </label>

//             {field.type === "input" && (
//               <input
//                 type={field.inputType}
//                 name={field.dataName}
//                 placeholder={field.placeholder}
//                 value={formData[field.dataName] || ""}
//                 onChange={handleFormChange}
//                 required={field.isRequired}
//                 className="w-full p-2 border rounded"
//               />
//             )}

//             {field.type === "radio" && (
//               <div className="space-y-2">
//                 {field.options.map((option, index) => (
//                   <label key={index} className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name={field.dataName}
//                       value={option}
//                       checked={formData[field.dataName] === option}
//                       onChange={handleFormChange}
//                       required={field.isRequired}
//                       className="form-radio text-blue-600"
//                     />
//                     <span className="text-gray-700">{option}</span>
//                   </label>
//                 ))}
//               </div>
//             )}

//             {field.type === "checkbox" && (
//               <div className="space-y-2">
//                 {field.options.map((option, index) => (
//                   <label key={index} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       name={`${field.dataName}_${index}`}
//                       value={option}
//                       onChange={handleFormChange}
//                       className="form-checkbox text-blue-600"
//                     />
//                     <span className="text-gray-700">{option}</span>
//                   </label>
//                 ))}
//               </div>
//             )}

//             {field.type === "dropdown" && (
//               <select
//                 name={field.dataName}
//                 value={formData[field.dataName] || ""}
//                 onChange={handleFormChange}
//                 required={field.isRequired}
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="" disabled>
//                   Select an option
//                 </option>
//                 {field.options.map((option, index) => (
//                   <option key={index} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>
//         ))}

//         {fields.length > 0 && (
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-black text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-800 transition-colors"
//             >
//               Submit Form
//             </button>
//           </div>
//         )}
//       </form>

//       {submittedData.length > 0 && (
//         <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
//           <h2 className="text-2xl font-bold mb-4">Submitted Data</h2>
//           <div className="space-y-4">
//             {submittedData.map((submission, subIndex) => (
//               <div key={subIndex} className="p-4 border rounded-md bg-gray-50">
//                 <p className="text-sm text-gray-500 mb-2">
//                   Submitted on: {submission.timestamp}
//                 </p>
//                 <div className="space-y-1">
//                   {Object.entries(submission.data).map(([key, value]) => (
//                     <p key={key} className="text-sm">
//                       <span className="font-semibold">{key}:</span> {value}
//                     </p>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormPreview;

import React, { useState } from "react";

const FormPreview = ({
  formTitle,
  formDescription,
  fields,
  onSubmit,
  submittedData,
}) => {
  const [formData, setFormData] = useState({});

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox") {
        const currentChecks = prev[name] || [];
        if (checked) {
          return {
            ...prev,
            [name]: [...currentChecks, value],
          };
        } else {
          return {
            ...prev,
            [name]: currentChecks.filter((item) => item !== value),
          };
        }
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
  };

  return (
    <div className="p-2 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
        {formTitle}
      </h1>
      <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6">
        {formDescription}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {fields.map((field) => (
          <div
            key={field.id}
            className="bg-white p-4 md:p-6 rounded-lg shadow-md"
          >
            <label className="block text-sm md:text-md font-medium text-gray-700 mb-1 md:mb-2">
              {field.label}{" "}
              {field.isRequired && <span className="text-red-500">*</span>}
            </label>

            {field.type === "input" && (
              <input
                type={field.inputType}
                name={field.dataName}
                placeholder={field.placeholder}
                value={formData[field.dataName] || ""}
                onChange={handleFormChange}
                required={field.isRequired}
                className="w-full p-2 border rounded text-sm md:text-base"
              />
            )}

            {field.type === "radio" && (
              <div className="space-y-2">
                {field.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 text-sm md:text-base"
                  >
                    <input
                      type="radio"
                      name={field.dataName}
                      value={option}
                      checked={formData[field.dataName] === option}
                      onChange={handleFormChange}
                      required={field.isRequired}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {field.type === "checkbox" && (
              <div className="space-y-2">
                {field.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 text-sm md:text-base"
                  >
                    <input
                      type="checkbox"
                      name={field.dataName}
                      value={option}
                      checked={
                        formData[field.dataName]?.includes(option) || false
                      }
                      onChange={handleFormChange}
                      className="form-checkbox text-blue-600"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {field.type === "dropdown" && (
              <select
                name={field.dataName}
                value={formData[field.dataName] || ""}
                onChange={handleFormChange}
                required={field.isRequired}
                className="w-full p-2 border rounded text-sm md:text-base"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {field.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        {fields.length > 0 && (
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 md:px-8 md:py-3 rounded-md font-semibold text-sm md:text-lg hover:bg-gray-800 transition-colors"
            >
              Submit Form
            </button>
          </div>
        )}
      </form>

      {/* Submitted Data Display */}
      {submittedData.length > 0 && (
        <div className="mt-6 md:mt-10 p-4 md:p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            Submitted Data
          </h2>
          <div className="space-y-3 md:space-y-4">
            {submittedData.map((submission, subIndex) => (
              <div
                key={subIndex}
                className="p-3 md:p-4 border rounded-md bg-gray-50"
              >
                <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">
                  Submitted on: {submission.timestamp}
                </p>
                <div className="space-y-1">
                  {/* Correctly display dataName and value */}
                  {Object.entries(submission.data).map(([dataName, value]) => {
                    // Find the field to check for inputType
                    const field = fields.find((f) => f.dataName === dataName);

                    // Mask password value
                    let displayValue = value;
                    if (field && field.inputType === "password") {
                      displayValue = "•".repeat(String(value).length);
                    } else if (Array.isArray(value)) {
                      displayValue = value.join(", ");
                    }

                    return (
                      <p key={dataName} className="text-sm">
                        <span className="font-semibold">{dataName}:</span>{" "}
                        {displayValue}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPreview;
