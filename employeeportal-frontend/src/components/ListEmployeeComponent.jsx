import React, { useEffect, useState } from "react";
import axios from "../axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AddEmployeeComponent from "./AddEmployeeComponent";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const response = await axios.get("/api/v1/employees");
    if (response.status === 200) {
      setEmployees(response.data);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [employees]);

  const handleUpdate = (employeeId) => {
    navigate(`/updateEmployee/${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    const response = await axios.delete(`/api/v1/employees/${employeeId}`);
    if (response.status === 200) {
      toast.success("Deleted user");
    }
  };

  return (
    <div>
      <h2 className="text-center mt-4">Employees List</h2>
      <Table striped bordered hover className="mt-4" variant="dark">
        <thead>
          <tr>
            <th>Employee FirstName</th>
            <th>Employee LastName</th>
            <th>Employee EmailId</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.emailId}</td>
              <td>
                <ButtonGroup aria-label="Basic example" className="gap-2">
                  <Button
                    variant="success"
                    onClick={() => handleUpdate(emp.id)}
                  >
                    Update
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(emp.id)}>
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Toaster
        className="toaster-box"
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default ListEmployeeComponent;
