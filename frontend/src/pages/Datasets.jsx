import { Box, Card, CardContent, Typography, Link, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DataTable from "../components/common/DataTable";
import AdminLayout from "../layouts/AdminLayout";
import { useFetchDatasets } from "../hooks/useDataFetch";
import { ROUTES } from "../constants/routes";

export default function DatasetList() {
  const { datasets, loading, error } = useFetchDatasets();

  const columns = [
    { key: "modelType", label: "Model Type" },
    { key: "sensorType", label: "Sensor" },
    { key: "dataFormat", label: "Format" },
    { key: "numberOfSamples", label: "Samples" },
    {
      key: "datasetSizeMB",
      label: "Size (MB)",
      render: (mb) => mb ?? "-",
    },
    {
      key: "fileURL",
      label: "File URL",
      render: (url) =>
        url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            Download
          </a>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="black">
            Datasets
          </Typography>
          <Link
            component={RouterLink}
            to={ROUTES.DATASET_UPLOAD}
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            +
          </Link>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <DataTable
              columns={columns}
              rows={datasets}
              loading={loading}
              emptyMessage="No datasets yet."
            />
          </CardContent>
        </Card>
      </Box>
    </AdminLayout>
  );
}
