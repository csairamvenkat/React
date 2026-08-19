import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  TablePagination,
  TableSortLabel,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function EmployeeTable({
  employees,
  editEmployee,
  deleteEmployee,
  role,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleSort = (column) => {
    const isAsc =
      orderBy === column &&
      order === "asc";

    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortedEmployees =
    [...employees].sort((a, b) => {
      let valA = a[orderBy];
      let valB = b[orderBy];

      if (orderBy === "salary") {
        valA = Number(valA);
        valB = Number(valB);
      } else {
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();
      }

      if (order === "asc") {
        return valA > valB ? 1 : -1;
      }

      return valA < valB ? 1 : -1;
    });

  const paginatedEmployees =
    sortedEmployees.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

  useEffect(() => {
    setPage(0);
  }, [employees]);

  return (
    <Paper elevation={3} sx={{ overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            {/* Name */}
            <TableCell sx={{ color: "white" }}>
              <TableSortLabel
                sx={{
                  color: "white",
                  "&.Mui-active": {
                    color: "white",
                  },
                }}
                active={orderBy === "name"}
                direction={order}
                onClick={() =>
                  handleSort("name")
                }
              >
                Name
              </TableSortLabel>
            </TableCell>

            {/* Email */}
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Email
            </TableCell>

            {/* Department */}
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Department
            </TableCell>

            {/* Salary */}
            <TableCell sx={{ color: "white" }}>
              <TableSortLabel
                sx={{
                  color: "white",
                  "&.Mui-active": {
                    color: "white",
                  },
                }}
                active={orderBy === "salary"}
                direction={order}
                onClick={() =>
                  handleSort("salary")
                }
              >
                Salary
              </TableSortLabel>
            </TableCell>

            {/* Joining Date */}
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Joining Date
            </TableCell>

            {/* Designation */}
            <TableCell
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Designation
            </TableCell>

            {/* Actions */}
            {role !== "user" && (
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={
                  role !== "user"
                    ? 7
                    : 6
                }
                align="center"
              >
                <Typography color="text.secondary">
                  No Employees Found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            paginatedEmployees.map(
              (emp) => (
                <TableRow
                  key={emp.id}
                  hover
                >
                  <TableCell>
                    {emp.name}
                  </TableCell>

                  <TableCell>
                    {emp.email}
                  </TableCell>

                  <TableCell>
                    {emp.department}
                  </TableCell>

                  <TableCell>
                    ₹{emp.salary}
                  </TableCell>

                  <TableCell>
                    {emp.joiningDate ||
                      "-"}
                  </TableCell>

                  <TableCell>
                    {emp.designation ||
                      "-"}
                  </TableCell>

                  {role !== "user" && (
                    <TableCell>
                      <Button
                        size="small"
                        color="warning"
                        startIcon={
                          <EditIcon />
                        }
                        onClick={() =>
                          editEmployee(
                            emp
                          )
                        }
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>

                      {role ===
                        "admin" && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={
                            <DeleteIcon />
                          }
                          onClick={() =>
                            deleteEmployee(
                              emp.id
                            )
                          }
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={employees.length}
        page={page}
        onPageChange={(
          e,
          newPage
        ) =>
          setPage(newPage)
        }
        rowsPerPage={
          rowsPerPage
        }
        onRowsPerPageChange={(
          e
        ) => {
          setRowsPerPage(
            parseInt(
              e.target.value,
              10
            )
          );
          setPage(0);
        }}
      />
    </Paper>
  );
}

export default EmployeeTable;