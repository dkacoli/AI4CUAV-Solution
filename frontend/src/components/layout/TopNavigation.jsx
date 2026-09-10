import { AppBar, Toolbar, Typography, Link, Box, Container } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { COLORS } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";

export default function TopNavigation() {
  const location = useLocation();

  const navLinks = [
    { label: "Dashboard", path: ROUTES.ADMIN_DASHBOARD },
    { label: "Upload Dataset", path: ROUTES.DATASET_UPLOAD },
    { label: "Order", path: ROUTES.ORDER_CREATE },
    { label: "Login", path: ROUTES.LOGIN },

  ];

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
        color: COLORS.WHITE,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 72 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, md: 0 },
          }}
        >
          {/* Brand */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 2,
                background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.55))",
                opacity: 0.95,
              }}
            />
            <Typography
              variant="h6"
              component={RouterLink}
              to={ROUTES.ADMIN_DASHBOARD}
              sx={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: 700,
                letterSpacing: "0.02em",
                fontSize: "1rem",
              }}
            >
              AI4CUAV
            </Typography>
          </Box>

          {/* Links */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, md: 3 } }}>
            {navLinks.map((link) => {
              const active = isActive(link.path);

              return (
                <Link
                  key={link.label}
                  component={RouterLink}
                  to={link.path}
                  underline="none"
                  sx={{
                    position: "relative",
                    color: active ? "#fff" : "rgba(255,255,255,0.78)",
                    fontSize: "0.95rem",
                    fontWeight: active ? 650 : 500,
                    py: 1,
                    transition: "color 180ms ease",
                    "&:hover": {
                      color: "#fff",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 4,
                      height: 2,
                      borderRadius: 2,
                      backgroundColor: "#fff",
                      opacity: active ? 1 : 0,
                      transform: active ? "scaleX(1)" : "scaleX(0.6)",
                      transition: "opacity 180ms ease, transform 180ms ease",
                    },
                    "&:hover::after": {
                      opacity: 1,
                      transform: "scaleX(1)",
                    },
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
