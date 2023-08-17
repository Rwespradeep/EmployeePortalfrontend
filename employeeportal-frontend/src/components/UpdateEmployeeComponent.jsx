import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateEmployeeComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (formData.firstName.trim() === "") {
      errors.firstName = "First name is required";
    }

    if (formData.lastName.trim() === "") {
      errors.lastName = "Last name is required";
    }

    if (formData.emailId.trim() === "") {
      errors.emailId = "Email is required";
    }

    return errors;
  };
  const { id } = useParams();
  const handleUpdate = async (event) => {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const response = await axios.put(`/api/v1/employees/${id}`, formData);
    if (response.status === 200) {
      toast.success("Employee updated!");
      navigate("/");
    } else {
      toast.error("Look out for errors, employee not updated");
    }
  };

  const fetchEmployeeId = async () => {
    const response = await axios.get(`/api/v1/employees/${id}`);
    if (response.status === 200) {
      setFormData(response.data);
    }
  };

  useEffect(() => {
    fetchEmployeeId();
  }, []);

  return (
    <div className="add-container">
      <div className="add-header-bg">
        <h3 className="text-center p-2">Update Employee</h3>
      </div>

      <Form>
        <Form.Group className="mb-3 mx-5" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {formErrors.firstName && (
            <p className="error">{formErrors.firstName}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3 mx-5" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {formErrors.lastName && (
            <p className="error">{formErrors.lastName}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3 mx-5" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
          />
          {formErrors.emailId && <p className="error">{formErrors.emailId}</p>}
        </Form.Group>

        <div className="button-section">
          <Button
            variant="success"
            type="submit"
            className="mx-2 my-3"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </Form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default UpdateEmployeeComponent;
