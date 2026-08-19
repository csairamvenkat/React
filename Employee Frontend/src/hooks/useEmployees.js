import { useState, useEffect } from "react";
import axios from "axios";

function useEmployees() {

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
    joiningDate: "",
    designation: ""
  });

  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);



  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });


  const forceLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const showSnackbar = (
    message,
    severity = "success"
  ) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const getAuthConfig = () => ({
    headers: {
      Authorization:
        `Bearer ${localStorage.getItem("token")}`
    }
  });
  const handleUnauthorized = (
    error
  ) => {
    if (
      error.response?.status === 401
    ) {
      localStorage.removeItem(
        "token"
      );
      forceLogout()
      window.location.href =
        "/login";

      return true;
    }

    return false;
  };

  // Load Data
  const loadData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:3000/employee",
        getAuthConfig()
      );

      setEmployees(res.data);

    } catch (error) {
      if (handleUnauthorized(error)
      ) return

      showSnackbar(
        "Cannot load Employees as session expired",
        "error"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save
  const saveEmployee = async () => {
    try {
      await axios.post(
        "http://localhost:3000/employee",
        form, getAuthConfig()

      );

      clearForm();
      loadData();

      showSnackbar(
        "Employee Saved Successfully"
      );

    } catch (error) {

      if (handleUnauthorized(error)) return
      showSnackbar(
        "Save Failed as session expired",
        "error"
      );
    }
  };

  // Update
  const updateEmployee = async () => {
    try {
      await axios.put(
        `http://localhost:3000/employee/${editId}`,
        form, getAuthConfig()
      );

      clearForm();
      loadData();

      showSnackbar(
        "Employee Updated Successfully"
      );

    } catch (error) {

      if (handleUnauthorized(error)) return
      showSnackbar(
        "Update Failed as session expired",
        "error"
      );
    }
  };

  // Delete
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/employee/${id}`, getAuthConfig()
      );

      loadData();

      showSnackbar(
        "Employee Deleted Successfully"
      );

    } catch (error) {
      if (handleUnauthorized(error)) return
      showSnackbar(
        "Delete Failed as session expired",
        "error"
      );
    }
  };

  // Edit
  const editEmployee = (emp) => {
    setForm({
      name: emp.name,
      email: emp.email,
      department: emp.department,
      salary: emp.salary
    });

    setEditId(emp.id);
  };

  // Clear
  const clearForm = () => {
    setForm({
      name: "",
      email: "",
      department: "",
      salary: "",
      joiningDate: "",
      designation: ""
    });

    setEditId(null);
  };

  return {
    employees,
    form,
    setForm,
    editId,
    saveEmployee,
    updateEmployee,
    deleteEmployee,
    editEmployee,
    clearForm,
    loading,
    snackbar,
    setSnackbar
  };
}

export default useEmployees;