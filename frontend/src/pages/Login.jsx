import { useState } from "react";
import { Box, TextField, Button, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { login } from "../services/authService";
import { validateEmail } from "../helpers/formatters";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    setLoading(true);
    try {
      const data = await login({ email, password });
      const token = data?.token || data?.access || data?.access_token;
      if (token) localStorage.setItem("authToken", token);

      if (data?.user) localStorage.setItem("authUser", JSON.stringify(data.user));

      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7fafc" }}>
      <Card sx={{ width: 420, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" mb={2} fontWeight="bold">Sign in</Typography>
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

            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Don&apos;t have an account? <a href={ROUTES.REGISTER}>Register</a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
