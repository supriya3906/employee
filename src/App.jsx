
import { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [editId, setEditId] = useState(null);

  function clearForm() {
    setId("");
    setName("");
    setDepartment("");
    setSalary("");
    setEditId(null);
  }

  function saveEmployee(e) {
    e.preventDefault();

    if (!id.trim() || !name.trim() ||
        !department.trim() || salary === "") {
      alert("Please fill in all fields");
      return;
    }

    if (Number(salary) < 0) {
      alert("Salary cannot be negative");
      return;
    }

    if (editId === null) {
      const exists = employees.some(
        (emp) => emp.id === id.trim()
      );

      if (exists) {
        alert("Employee ID already exists");
        return;
      }

      setEmployees([
        ...employees,
        {
          id: id.trim(),
          name: name.trim(),
          department: department.trim(),
          salary: Number(salary),
        },
      ]);
    } else {
      setEmployees(
        employees.map((emp) =>
          emp.id === editId
            ? {
                id: id.trim(),
                name: name.trim(),
                department: department.trim(),
                salary: Number(salary),
              }
            : emp
        )
      );
    }

    clearForm();
  }

  function editEmployee(employee) {
    setId(employee.id);
    setName(employee.name);
    setDepartment(employee.department);
    setSalary(String(employee.salary));
    setEditId(employee.id);
  }

  function deleteEmployee(employeeId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees(
        employees.filter((emp) => emp.id !== employeeId)
      );

      if (editId === employeeId) {
        clearForm();
      }
    }
  }

  const totalSalary = employees.reduce(
    (total, emp) => total + emp.salary,
    0
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Employee Management System</h1>
        <p>Manage your employee records easily</p>
      </header>

      <main className="container">
        <section className="summary">
          <div className="summary-card">
            <h3>Total Employees</h3>
            <p>{employees.length}</p>
          </div>

          <div className="summary-card">
            <h3>Total Salary</h3>
            <p>
              ₹{totalSalary.toLocaleString("en-IN")}
            </p>
          </div>
        </section>

        <section className="form-card">
          <h2>
            {editId === null
              ? "Add Employee"
              : "Edit Employee"}
          </h2>

          <form onSubmit={saveEmployee}>
            <label>Employee ID</label>
            <input
              type="text"
              placeholder="Enter employee ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={editId !== null}
              required
            />

            <label>Employee Name</label>
            <input
              type="text"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>

            <label>Monthly Salary (₹)</label>
            <input
              type="number"
              placeholder="Enter salary"
              min="0"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />

            <div className="form-buttons">
              <button type="submit" className="save-btn">
                {editId === null
                  ? "Add Employee"
                  : "Update Employee"}
              </button>

              <button
                type="button"
                className="clear-btn"
                onClick={clearForm}
              >
                Clear
              </button>
            </div>
          </form>
        </section>

        <section className="table-card">
          <h2>Employee Details</h2>

          {employees.length === 0 ? (
            <p className="empty">
              No employees added yet.
            </p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.department}</td>
                      <td>
                        ₹{employee.salary.toLocaleString("en-IN")}
                      </td>
                      <td className="actions">
                        <button
                          className="edit-btn"
                          onClick={() => editEmployee(employee)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => deleteEmployee(employee.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <footer>
        Employee Management System | React Application
      </footer>
    </div>
  );
}

export default App;
