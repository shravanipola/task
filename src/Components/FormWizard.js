import React, { useState } from "react";
import "../FormWizard.css";

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm();
  };

  const validateForm = () => {
    const errors = {};
    if (currentStep === 1) {
      if (!formData.firstName.trim()) {
        errors.firstName = "First name is required";
      } else if (formData.firstName.trim().length < 5) {
        errors.firstName = "First name should be at least 5 characters long";
      }
      if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required";
      } else if (formData.lastName.trim().length < 5) {
        errors.lastName = "Last name should be at least 5 characters long";
      }
    } else if (currentStep === 2) {
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Invalid email format";
      }
      if (!formData.age.trim()) {
        errors.age = "Age is required";
      } else if (isNaN(formData.age)) {
        errors.age = "Age must be a number";
      } else if (parseInt(formData.age) === 0) {
        errors.age = "Age must be a valid number";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 ~ handleSubmit ~ formData:", formData);
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    }
    console.log("🚀 ~ nextStep ~ currentStep:", currentStep);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="form-wizard-container">
      <div className="form-header">
        <h2 className="form-title">Form Wizard</h2>
        <div className="wrapper-progressBar">
          <ul className="progressBar">
            <li className={currentStep >= 1 ? "active" : ""} data-step="1"></li>
            <li className={currentStep >= 2 ? "active" : ""} data-step="2"></li>
            <li className={currentStep >= 3 ? "active" : ""} data-step="3"></li>
          </ul>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form-body">
        {currentStep === 1 && (
          <div>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                className="input-field"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <span className="error">{errors.firstName}</span>
              )}
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                className="input-field"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="input-field"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="age">Age:</label>
              <input
                className="input-field"
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
              {errors.age && <span className="error">{errors.age}</span>}
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="summary-section">
            <h2>Summary</h2>
            <div className="summary-item">
              <label htmlFor="summaryFirstName">First Name:</label>
              <p id="summaryFirstName">{formData.firstName}</p>
            </div>
            <div className="summary-item">
              <label htmlFor="summaryLastName">Last Name:</label>
              <p id="summaryLastName">{formData.lastName}</p>
            </div>
            <div className="summary-item">
              <label htmlFor="summaryEmail">Email:</label>
              <p id="summaryEmail">{formData.email}</p>
            </div>
            <div className="summary-item">
              <label htmlFor="summaryAge">Age:</label>
              <p id="summaryAge">{formData.age}</p>
            </div>
          </div>
        )}

        <div className="navigation-buttons">
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className="prev-button">
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button type="button" onClick={nextStep} className="next-button">
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="submit-button"
              onClick={() => alert("Form submitted successfully!")}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormWizard;
