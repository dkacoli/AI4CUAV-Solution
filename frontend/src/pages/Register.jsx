import { useState } from "react";
import { Box, TextField, Button, Typography, Card, CardContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { register } from "../services/authService";
import { validateEmail } from "../helpers/formatters";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await register({ email, password });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7fafc" }}>
      <Card sx={{ width: 420, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" mb={2} fontWeight="bold">Create account</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              fullWidth
              margin="normal"
                  required
            />

            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
              {loading ? "Creating…" : "Register"}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
