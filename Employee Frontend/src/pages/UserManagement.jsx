import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
  Box
} from "@mui/material";

function UserManagement() {

  const [users, setUsers] =
    useState([]);

  const [form, setForm] =
    useState({
      username: "",
      password: "",
      role: "user"
    });

  const token =
    localStorage.getItem("token");

  const config = {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  };

  const loadUsers = async () => {
    const res =
      await axios.get(
        "http://localhost:3000/user",
        config
      );

    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = async () => {

    await axios.post(
      "http://localhost:3000/user",
      {
        ...form,
        isActive: true
      },
      config
    );

    setForm({
      username: "",
      password: "",
      role: "user"
    });

    loadUsers();
  };

  const deleteUser = async (id) => {

    await axios.delete(
      `http://localhost:3000/user/${id}`,
      config
    );

    loadUsers();
  };

  const toggleUser = async (id) => {

    await axios.patch(
      `http://localhost:3000/user/${id}/toggle`,
      {},
      config
    );

    loadUsers();
  };

  const updateRole = async (
    id,
    role
  ) => {

    await axios.put(
      `http://localhost:3000/user/${id}`,
      { role },
      config
    );

    loadUsers();
  };

  return (
    <Container maxWidth="lg">

      <Typography
        variant="h4"
        mb={3}
      >
        User Management
      </Typography>

      <Box
        display="flex"
        gap={2}
        mb={3}
      >

        <TextField
          label="Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username:
                e.target.value
            })
          }
        />

        <TextField
          label="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value
            })
          }
        />

        <TextField
          select
          label="Role"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role:
                e.target.value
            })
          }
        >
          <MenuItem value="admin">
            admin
          </MenuItem>

          <MenuItem value="manager">
            manager
          </MenuItem>

          <MenuItem value="user">
            user
          </MenuItem>
        </TextField>

        <Button
          variant="contained"
          onClick={addUser}
        >
          Add User
        </Button>

      </Box>

      <Paper>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>
                Username
              </TableCell>

              <TableCell>
                Role
              </TableCell>

              <TableCell>
                Active
              </TableCell>

              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {users.map((u) => (

              <TableRow
                key={u.id}
              >
                <TableCell>
                  {u.username}
                </TableCell>

                <TableCell>

                  <TextField
                    select
                    size="small"
                    value={u.role}
                    onChange={(e) =>
                      updateRole(
                        u.id,
                        e.target.value
                      )
                    }
                  >

                    <MenuItem value="admin">
                      admin
                    </MenuItem>

                    <MenuItem value="manager">
                      manager
                    </MenuItem>

                    <MenuItem value="user">
                      user
                    </MenuItem>

                  </TextField>

                </TableCell>

                <TableCell>
                  <Switch
                    checked={
                      u.isActive
                    }
                    onChange={() =>
                      toggleUser(u.id)
                    }
                  />
                </TableCell>

                <TableCell>
                  <Button
                    color="error"
                    onClick={() =>
                      deleteUser(
                        u.id
                      )
                    }
                  >
                    Delete
                  </Button>
                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </Paper>

    </Container>
  );
}

export default UserManagement;