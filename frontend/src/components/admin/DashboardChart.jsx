import { Box, Card, CardContent, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { COLORS } from "../../constants/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardChart({ title = "Sales Trend", data }) {
  const defaultData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Orders",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: COLORS.PRIMARY,
        backgroundColor: `${COLORS.PRIMARY}20`,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          {title}
        </Typography>
        <Box sx={{ height: 300 }}>
          <Line data={data || defaultData} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}
