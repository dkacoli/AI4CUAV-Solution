import { Box } from "@mui/material";
import { Sidebar } from "../components";
import { COLORS } from "../constants";

export default function AdminLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", backgroundColor: COLORS.LIGHT_BG }}>
      <Sidebar variant="permanent" />
      <Box sx={{ flex: 1, overflow: "auto" }}>
        {children}
      </Box>
    </Box>
  );
}
