import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
} from "@mui/material";
import { COLORS } from "../../constants/colors";

const stats = [
  { label: "Total Orders", value: 24, color: COLORS.PRIMARY, percent: 85 },
  { label: "Datasets", value: 18, color: COLORS.SECONDARY, percent: 72 },
  { label: "Active Users", value: 12, color: "#10b981", percent: 65 },
  { label: "Pending", value: 5, color: "#f59e0b", percent: 40 },
];

export default function DashboardStats() {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, idx) => (
        <Grid item xs={12} sm={6} md={3} key={idx}>
          <Card
            sx={{
              background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}10 100%)`,
              border: `2px solid ${stat.color}30`,
              transition: "transform 0.3s, boxShadow 0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 8px 16px ${stat.color}30`,
              },
            }}
          >
            <CardContent>
              <Typography
                color="textSecondary"
                gutterBottom
                sx={{ fontSize: "0.9rem" }}
              >
                {stat.label}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: stat.color, mb: 2 }}
              >
                {stat.value}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={stat.percent}
                  sx={{ flex: 1, height: 6, borderRadius: 2 }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: stat.color, fontWeight: "bold" }}
                >
                  {stat.percent}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
