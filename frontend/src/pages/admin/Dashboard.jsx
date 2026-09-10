import { Box, Grid, Typography, Button, Paper, Alert } from "@mui/material";
import AdminLayout from "../../layouts/AdminLayout";
import DashboardStats from "../../components/admin/DashboardStats";
import DashboardChart from "../../components/admin/DashboardChart";
import DataTable from "../../components/common/DataTable";
import { useFetchOrders } from "../../hooks/useDataFetch";
import { COLORS } from "../../constants/colors";

const columns = [
  { key: "id", label: "Order ID" },
  { key: "orderStatus", label: "Status" },
  { key: "urgencyLevel", label: "Urgency" },
];

export default function Dashboard() {
  const { orders, loading, error } = useFetchOrders();

  return (
    <AdminLayout>
      <Box sx={{ backgroundColor: COLORS.LIGHT_BG, color: "#1f2937", p: 4, minHeight: "100vh" }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">
            Dashboard
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Welcome back! Here&apos;s your performance summary.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Charts and Tables Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <DashboardChart title="Orders Trend" />
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Recent Orders
              </Typography>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <DataTable
                columns={columns}
                rows={orders.slice(0, 5)}
                loading={loading}
                emptyMessage="No orders yet."
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: COLORS.PRIMARY,
              "&:hover": { backgroundColor: "#051a32" },
            }}
          >
            View Details
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: COLORS.PRIMARY,
              color: COLORS.PRIMARY,
              "&:hover": { borderColor: "#051a32", color: "#051a32" },
            }}
          >
            Export Data
          </Button>
        </Box>
      </Box>
    </AdminLayout>
  );
}
