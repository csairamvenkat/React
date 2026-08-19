import React, { useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Box,
  Button
} from "@mui/material";

import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import useEmployees from "../hooks/useEmployees";
import useDebounce from "../hooks/useDebounce";

function Dashboard() {
  const navigate = useNavigate();


  const {
    darkMode,
    toggleTheme
  } = useContext(
    ThemeContext
  );
  const { logout, role } = useContext(AuthContext);
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    logout();

    navigate("/login");
  };

  const [searchText, setSearchText] = useState("");


  const debouncedSearch =
    useDebounce(
      searchText,
      500
    );

  const {
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
  } = useEmployees();

  const filteredEmployees =
    employees.filter((emp) => {

      const name =
        (emp.name || "")
          .toLowerCase();

      const email =
        (emp.email || "")
          .toLowerCase();

      const search =
        debouncedSearch
          .toLowerCase();

      return (
        name.includes(search) ||
        email.includes(search)
      );
    });

  return (

    <Box
      sx={{
        minHeight: "100vh",
        bgcolor:
          "background.default",
        color:
          "text.primary",
        py: 4
      }}
    >

      <Container maxWidth="lg">

        <Box
          display="flex"
          justifyContent="flex-end"
          mb={2}
        >

          <FormControlLabel
            control={
              <Switch
                checked={
                  darkMode
                }
                onChange={
                  toggleTheme
                }
              />
            }

            label={
              darkMode
                ? "Dark Mode"
                : "Light Mode"
            }
          />
          {role === "admin" && (
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={() =>
                navigate("/users")
              }
            >
              Users
            </Button>
          )}

          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ mr: 2 }}
          >
            Logout
          </Button>

        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Employee Management
        </Typography>
        <Typography
          textAlign="center"
          mb={2}
          color="primary"
        >
          Logged in as: {role}
        </Typography>

        <TextField
          fullWidth
          label="Search by Name or Email"
          value={searchText}
          onChange={(e) =>
            setSearchText(
              e.target.value
            )
          }
          sx={{ mb: 3 }}
        />
        {role !== "user" && (
          <EmployeeForm
            form={form}
            setForm={setForm}
            editId={editId}
            saveEmployee={saveEmployee}
            updateEmployee={updateEmployee}
            clearForm={clearForm}
          />
        )}

        {loading ? (

          <CircularProgress />

        ) : (

          <EmployeeTable
            employees={
              filteredEmployees
            }
            editEmployee={
              editEmployee
            }
            deleteEmployee={
              deleteEmployee
            }
            role={role}
          />

        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false
            })
          }
        >

          <Alert
            severity={
              snackbar.severity
            }
            variant="filled"
          >
            {snackbar.message}
          </Alert>

        </Snackbar>

      </Container>

    </Box>
  );
}

export default Dashboard;