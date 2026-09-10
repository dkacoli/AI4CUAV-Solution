import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

export default function DataTable({
  columns,
  rows,
  loading = false,
  emptyMessage = "No data available",
  onRowClick,
  maxWidth = "100%",
}) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ maxWidth }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : rows?.length ? (
        <Table aria-label="data table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{ fontWeight: "bold", minWidth: col.width || "auto" }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow
                key={row.id || idx}
                hover
                onClick={() => onRowClick?.(row)}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: onRowClick ? "pointer" : "default",
                }}
              >
                {columns.map((col) => (
                  <TableCell key={`${row.id || idx}-${col.key}`}>
                    {col.render ? col.render(row[col.key], row) : row[col.key] ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary">{emptyMessage}</Typography>
        </Box>
      )}
    </TableContainer>
  );
}
