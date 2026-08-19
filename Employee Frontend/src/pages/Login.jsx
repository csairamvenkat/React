import React, {
  useState,
  useContext
} from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";

import { useNavigate }
from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const { login } =
    useContext(AuthContext);

  const navigate =
    useNavigate();
    const [error, setError] =
useState("");
const [loading, setLoading] =
  useState(false);

 const handleLogin = async () => {

  try {

    setLoading(true);

    const res = await axios.post(
      "http://localhost:3000/auth/login",
      { username, password }
    );

    login(res.data.access_token);

    navigate("/dashboard");

  } catch (error) {

    setError(
      error.response?.data?.message ||
      "Login Failed"
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <Container maxWidth="sm">

     <Paper
 elevation={4}
 sx={{
   p: 4,
   mt: 10,
   borderRadius: 3
 }}
>
       <Typography
 variant="h4"
 textAlign="center"
 mb={3}
 fontWeight="bold"
>
 Login
</Typography>

        <TextField
          fullWidth
          label="Username"
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) => {
 setUsername(e.target.value);
 setError("");
}}
        />
<TextField
  fullWidth
  label="Password"
  type="password"
  value={password}
  onChange={(e) => {
 setPassword(e.target.value);
 setError("");
}}
  onKeyDown={(e) => {
 if (e.key === "Enter") {
   handleLogin();
 }
}}
  sx={{ mb: 2 }}
/>
        <Typography
 color="error"
 mb={2}
>
 {error}
</Typography>

  <Button
 fullWidth
 variant="contained"
 onClick={handleLogin}
 disabled={loading}
 sx={{
   mt: 1.5,
   py: 1.2
 }}
>
 {loading
   ? "Logging in..."
   : "Login"}
</Button>

      </Paper>

    </Container>
  );
}

export default Login;