import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ShoppingCart,
  Storage,
  Support,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { DRAWER_WIDTH, COLORS } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";

export default function Sidebar({ variant = "permanent" }) {
  const menuItems = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: ROUTES.ADMIN_DASHBOARD,
    },
    {
      label: "Orders",
      icon: <ShoppingCart />,
      path: ROUTES.ORDERS,
    },
    {
      label: "Datasets",
      icon: <Storage />,
      path: ROUTES.DATASETS,
    },
    {
      label: "Support",
      icon: <Support />,
      path: "#",
    },
  ];

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: COLORS.PRIMARY,
          color: COLORS.WHITE,
          boxShadow: "2px 0px 10px rgba(0,0,0,0.1)",
        },
      }}
      variant={variant}
      anchor="left"
    >
      <Box sx={{ padding: 2 }}>
        <Typography
          component={RouterLink}
          to={ROUTES.HOME}
          variant="h6"
          fontWeight="bold"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          AI4CUAV
        </Typography>
        <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.1)" }} />
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={RouterLink}
            to={item.path}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <ListItemIcon sx={{ color: COLORS.WHITE, minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{ color: COLORS.WHITE }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
